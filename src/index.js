require('./modules/User');
require('./modules/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRouts = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

 const app = express(); 

 app.use(bodyParser.json());  
 app.use(authRoutes);
 app.use(trackRouts);

 const mongoUri = 'mongodb+srv://mongoDB:passwordpassword@cluster0-pefzx.mongodb.net/test?retryWrites=true&w=majority';
 mongoose.connect(mongoUri, {
     useNewUrlParser: true,
     useCreateIndex: true
 });

 mongoose.connection.on('connected', () => {
     console.log('Database Connnected');
 })

 mongoose.connection.on('err', (err) => {
     console.log('Error connecting to the database', err);
 })

 app.get('/', requireAuth,(req, res) => {
    res.send(`Your email: ${req.user.email}`);
 });

 app.listen(3000, () => {
     console.log('Listening on port 3000');
 });