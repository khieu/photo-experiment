// const express = require('express');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { writeData } from './persist-data';
 
const app = express();
app.use(cors()); // We need CORS so backend won't reject request from frontend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/saveResponse', function (req, res) {
  console.log('GOT REQUEST');
  console.log(req.body);
  writeData(req.body);
  res.send('POST request to the homepage');
})
 
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);