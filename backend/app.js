const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

mongoose.set({strictQuery: true});

mongoose.connect(process.env.DB)  
.then(() => {
    app.listen(process.env.PORT)
})
.catch((error) => {
    console.log(error);
})

app.use('/user', userRoutes);
app.use('/project', projectRoutes);