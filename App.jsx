import React, { useState } from 'react';
import './style/style.css';

const TimeTracker = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [hoursWorked, setHoursWorked] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [entries, setEntries] = useState([]);
  const [weeklyReport, setWeeklyReport] = useState({});

  const [mondayHours, setMondayHours] = useState(0);
  const [tuesdayHours, setTuesdayHours] = useState(0);
  const [wednesdayHours, setWednesdayHours] = useState(0);
  const [thursdayHours, setThursdayHours] = useState(0);
  const [fridayHours, setFridayHours] = useState(0);

  const handleAddEntry = () => {
    if (employeeName && (mondayHours || tuesdayHours || wednesdayHours || thursdayHours || fridayHours)) {
      const totalHoursForWeek = mondayHours + tuesdayHours + wednesdayHours + thursdayHours + fridayHours;

      const newEntry = {
        employeeName: employeeName,
        hoursWorked: totalHoursForWeek,
      };

      setEntries([...entries, newEntry]);

      const updatedReport = { ...weeklyReport };
      if (!updatedReport[employeeName]) {
        updatedReport[employeeName] = {};
      }
      updatedReport[employeeName] = {
        Monday: mondayHours,
        Tuesday: tuesdayHours,
        Wednesday: wednesdayHours,
        Thursday: thursdayHours,
        Friday: fridayHours
      };
      setWeeklyReport(updatedReport);

      setTotalHours(totalHours + totalHoursForWeek);
      setEmployeeName('');
      setMondayHours(0);
      setTuesdayHours(0);
      setWednesdayHours(0);
      setThursdayHours(0);
      setFridayHours(0);
    } else {
      alert('Please enter valid data');
    }
  };

  const handleViewReport = (employeeName) => {
    if (weeklyReport[employeeName]) {
      const report = weeklyReport[employeeName];
      alert(`${employeeName}'s weekly report:\n
        Monday: ${report.Monday} hours\n
        Tuesday: ${report.Tuesday} hours\n
        Wednesday: ${report.Wednesday} hours\n
        Thursday: ${report.Thursday} hours\n
        Friday: ${report.Friday} hours\n
        Total: ${report.Monday + report.Tuesday + report.Wednesday + report.Thursday + report.Friday} hours`);
    } else {
      alert('No report found for this user.');
    }
  };
  


  return (
    <div className='time-tracker-container'>
      <h2 className='time-tracker-header'>Time Tracker</h2>
      <div className='form-input'>
        <input
          type="text"
          placeholder="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <div className='form-input'>
          <label>Monday:</label>
          <input
            type="number"
            value={mondayHours}
            onChange={(e) => setMondayHours(parseFloat(e.target.value))}
          />
        </div>
        <div className='form-input'>
          <label>Tuesday:</label>
          <input
            type="number"
            value={tuesdayHours}
            onChange={(e) => setTuesdayHours(parseFloat(e.target.value))}
          />
        </div>
        <div className='form-input'>
          <label>Wednesday:</label>
          <input
            type="number"
            value={wednesdayHours}
            onChange={(e) => setWednesdayHours(parseFloat(e.target.value))}
          />
        </div>
        <div className='form-input'>
          <label>Thursday:</label>
          <input
            type="number"
            value={thursdayHours}
            onChange={(e) => setThursdayHours(parseFloat(e.target.value))}
          />
        </div>
        <div className='form-input'>
          <label>Friday:</label>
          <input
            type="number"
            value={fridayHours}
            onChange={(e) => setFridayHours(parseFloat(e.target.value))}
          />
        </div>
        <button className='button' onClick={handleAddEntry}>Add Entry</button>
      </div>
      <div>
        <h3>Entries</h3>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.employeeName} - {entry.hoursWorked} hours
            </li>
          ))}
        </ul>
        <p>Total Hours: {totalHours}</p>
      </div>
      <div>
        <h3>Weekly Report</h3>
        <ul>
          {Object.keys(weeklyReport).map((employeeName, index) => (
            <li key={index}>
              <button onClick={() => handleViewReport(employeeName)}>
                {employeeName}'s Report
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeTracker;