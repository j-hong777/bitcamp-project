const express = require('express');
const router = express.Router();


router.get('/dhtset', (req, res) => {
  console.log('/sensor/dhtset 요청:')  
  console.log(req.query.devid)
  console.log(req.query.temp, "°C")
  console.log(req.query.humi, "%")
  res.send('ok')
});

router.get('/dustset', (req, res) => {  
  console.log('/sensor/dustset 요청:')  
  console.log(req.query.devid)
  console.log(req.query.dust, "[ug/m3]")
  res.send('ok')
});

// 외부기기 연결 코드 시작

module.exports = router;


