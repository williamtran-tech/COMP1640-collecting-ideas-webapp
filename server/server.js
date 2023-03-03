const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const ideasRoutes = require('./api/routes/ideas');
const usersRoutes = require('./api/routes/users');
const topicsRoutes = require('./api/routes/topics');
const commentsRoutes = require('./api/routes/comments');
const accountsRoutes = require('./api/routes/accounts');

const PORT = process.env.PORT || '5050';

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/uploaded_files", express.static("./uploaded_files"));

app.use('/ideas', ideasRoutes);
app.use('/topics', topicsRoutes);
app.use('/users', usersRoutes);
app.use('/comments', commentsRoutes);
app.use('/accounts', accountsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});