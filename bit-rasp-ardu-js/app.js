const http = require('http'); 
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();


app.set('view engine', 'pug');


app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function(req, res) {
  res.render('interface');
});


app.use('/sensor', require('./routes/sensor'));

http.createServer(app).listen(3000, function() {
  console.log('서버가 시작되었습니다!');

})



