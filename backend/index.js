const express = require('express');
const bookings=require('./Expressjs/bookings');
const trains=require('./Expressjs/trains');
const users=require('./Expressjs/userauth');
const cors=require('cors');
const path=require('path');
const mongoose=require('mongoose');
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

const uris=process.env.uri;
mongoose.connect(uris);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/',users);
app.use('/',trains);
app.use('/',bookings);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000,()=>{
    console.log('Listening at port')
});