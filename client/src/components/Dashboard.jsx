import { useState, useEffect } from 'react';
import TimezoneSelect from 'react-timezone-select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { time, handleCreateSchedule } from '../utils/resource';

const Dashboard = () => {
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [schedule, setSchedule] = useState([
    { day: 'Sun', startTime: '', endTime: '' },
    { day: 'Mon', startTime: '', endTime: '' },
    { day: 'Tue', startTime: '', endTime: '' },
    { day: 'Wed', startTime: '', endTime: '' },
    { day: 'Thu', startTime: '', endTime: '' },
    { day: 'Fri', startTime: '', endTime: '' },
    { day: 'Sat', startTime: '', endTime: '' },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('_id')) {
      navigate('/');
    }
  }, [navigate]);

  //👇🏻 Runs when a user sign out
  const handleLogout = () => {
    localStorage.removeItem('_id');
    localStorage.removeItem('_myEmail');
    navigate('/');
  };

  //👇🏻 This updates the schedule array with the start and end time.
  const handleTimeChange = (e, index) => {
    const { name, value } = e.target;
    if (value === 'Select') return;
    const list = [...schedule];
    list[index][name] = value;
    setSchedule(list);
  };

  //👇🏻 Logs the user's schedule to the console after setting the availability
  const handleSaveSchedules = () => {
    if (JSON.stringify(selectedTimezone) !== '{}') {
      handleCreateSchedule(selectedTimezone, schedule, navigate);
    } else {
      toast.error('Select your timezone');
    }
  };

  return (
    <div>
      <nav className="dashboard__nav">
        <h2>BookMe</h2>
        <button onClick={handleLogout} className="logout__btn">
          Log out
        </button>
      </nav>
      <main className="dashboard__main">
        <h2 className="dashboard__heading">Select your availability</h2>
        <div className="timezone__wrapper">
          <p>Pick your timezone</p>
          <TimezoneSelect
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />
          {schedule.map((sch, index) => (
            <div className="form" key={index}>
              <p>{sch.day}</p>
              <div className="select__wrapper">
                <label htmlFor="startTime">Start Time</label>
                <select
                  name="startTime"
                  id="startTime"
                  onChange={(e) => handleTimeChange(e, index)}
                >
                  {time.map((t) => (
                    <option key={t.id} value={t.t} id={t.id}>
                      {t.t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select__wrapper">
                <label htmlFor="endTime">End Time</label>
                <select
                  name="endTime"
                  id="endTime"
                  onChange={(e) => handleTimeChange(e, index)}
                >
                  {time.map((t) => (
                    <option key={t.id} value={t.t} id={t.id}>
                      {t.t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <div className="saveBtn__container">
          <button onClick={handleSaveSchedules}>SAVE SCHEDULES</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
