const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//👇🏻 array representing the data
const database = [];
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  //👇🏻 checks if the user does not exist
  let result = database.filter(
    (user) => user.email === email || user.username === username
  );
  //👇🏻 creates the user's data structure on the server
  if (result.length === 0) {
    database.push({
      id: generateID(),
      username,
      password,
      email,
      timezone: {},
      schedule: [],
    });
    return res.json({ message: 'Account created successfully!' });
  }
  //👇🏻 returns an error
  res.json({ error_message: 'User already exists!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let result = database.filter(
    (user) => user.username === username && user.password === password
  );
  //👇🏻 user doesn't exist
  if (result.length !== 1) {
    return res.json({
      error_message: 'Incorrect credentials',
    });
  }
  //👇🏻 user exists
  res.json({
    message: 'Login successfully',
    data: {
      _id: result[0].id,
      _email: result[0].email,
    },
  });
});

app.post('/schedule/create', (req, res) => {
  const { userId, timezone, schedule } = req.body;
  //👇🏻 filters the database via the id
  let result = database.filter((db) => db.id === userId);
  //👇🏻 updates the user's schedule and timezone
  result[0].timezone = timezone;
  result[0].schedule = schedule;
  res.json({ message: 'OK' });
});

app.get('/schedules/:userId', (req, res) => {
  const { userId } = req.params;
  //👇🏻 filters the array via the ID
  let result = database.filter((db) => db.id === userId);
  //👇🏻 returns the schedule, time and username
  if (result.length === 1) {
    return res.json({
      message: 'Schedules successfully retrieved!',
      schedules: result[0].schedule,
      username: result[0].username,
      timezone: result[0].timezone,
    });
  }
  //👇🏻 if user not found
  return res.json({ error_message: 'Sign in again, an error occured...' });
});

app.post('/schedules/:username', (req, res) => {
  const { username } = req.body;
  //👇🏻 filter the databse via the username
  let result = database.filter((db) => db.username === username);
  if (result.length === 1) {
    const scheduleArray = result[0].schedule;
    //👇🏻 return only the selected schedules
    const filteredArray = scheduleArray.filter((sch) => sch.startTime !== '');
    //return the schedules and other information
    return res.json({
      message: 'Schedules successfully retrieved!',
      schedules: filteredArray,
      timezone: result[0].timezone,
      receiverEmail: result[0].email,
    });
  }
  return res.json({ error_message: "User doesn't exist" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
