import React, { useState, useEffect } from 'react';

function NEAPerformanceDashboard() {
  const [students, setStudents] = useState([]);
  const [markingMode, setMarkingMode] = useState(false);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (student) => {
    if (!student.name || !student.grade) {
      setInputError('Name and Grade are required.');
      return;
    }
    setStudents([...students, student]);
    setInputError('');
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey) {
      if (event.key === 'p') {
        event.preventDefault();
        window.print();
      } else if (event.key === 's') {
        event.preventDefault();
        saveStudentsToCSV();
      }
    }
  };

  const saveStudentsToCSV = () => {
    const csv = students.map(student => `${student.name},${student.grade}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0">
      <h1>NEA Performance Dashboard</h1>
      <div>
        <button onClick={() => setMarkingMode(!markingMode)}>
          {markingMode ? 'Exit Marking Mode' : 'Enter Marking Mode'}
        </button>
      </div>
      <div>
        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
        {/* Student input and submission logic goes here */}
        <ul>
          {students.map((student, index) => <li key={index}>{student.name}: {student.grade}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default NEAPerformanceDashboard;
