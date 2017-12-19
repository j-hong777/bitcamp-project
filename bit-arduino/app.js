const http = require('http') // 로컬 테스트용
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const request = require('request')


const app = express()


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static('public'))

app.use('/arduino', require('./routes/arduino'));

http.createServer(app).listen(9999, function() {
  console.log('서버가 시작되었습니다!')
})


