const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ideasRoutes = require('./api/routes/ideas');
const usersRoutes = require('./api/routes/users');
const topicsRoutes = require('./api/routes/topics');

const PORT = process.env.PORT || '5000';

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Test fetching from Sequelize to Server
const db = require('./db/models');
const User = db.User;

app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
    //   const usersJson = JSON.stringify(users);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  // TEST END HERE

app.get('/api', (req, res) =>{
    res.json({
        "users": ["userOne", "userTwo", "userThree", "userFour", "What the hell"]
    })
});

app.use('/ideas', ideasRoutes);
app.use('/topics', topicsRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)})