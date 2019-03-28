const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const profile = require('./routes/api/profile');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB
mongoose.connect(db)
    .then(() => console.log('MONGODB connected'))
    .catch(err => console.log(err))

app.use('/api/profile', profile);

const PORT = 7000;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));