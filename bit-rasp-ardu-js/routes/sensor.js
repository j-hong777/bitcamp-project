const express = require('express');
const router = express.Router();

const awsIot = require('aws-iot-device-sdk');

const devices = {};

const dev01 = awsIot.device({ 

    # AWS 서버에 Thing을 생성한 후 만든 인증서의 사물인증서 파일
    certPath = "dev01.cert.pem",

    # AWS 서버에 Thing을 생성한 후 만든 인증서의 개인키 파일 
    KeyPath = "dev01.private.key",

    # 사물에 대해 발행한 인증서를 검증해 줄 
    # "인증서를 발행한 회사(인증기관)"의 인증서 파일
    caPath = "root-CA.crt",

    clientId= "sensor",

    /* AWS에 등록한 Thing을 가리키는 URL.
       AWS IoT 사물 관리 페이지에서 "상호작용" 메뉴에서
       HTTPS의 RestAPI를 요청할 때 사용할 Thing의 URL이다. */
    host: "a1lqcwo4cmer5o.iot.ap-northeast-2.amazonaws.com" 
    // host: process.env.DEV01_HOST
 });

 // 이 프로그램이 AWS IoT에 등록한 Thing과 연결되었을 때 호출될 메서드 추가
dev01.on('connect', function() {
    // 이 함수를 호출되었다는 것은 AWS IoT의 Thing과 연결되었다는 의미다.
    console.log('AWS IoT의 dev01 장비와 연결 되었음!');
    // 연결에 성공하면 연결된 장비를 목록에 추가한다.
    devices['dev01'] = dev01;
   });

router.get('/set_dht', (req, res) => {
    console.log('/sensor/set_dht 요청:')
    console.log(req.query.devid)
    console.log(req.query.temp, "°C")
    console.log(req.query.humi, "%")
    res.send('ok')

    publish('dev01', 'topic_1', {
        "message": 'dhtsensor',
        "deviceId": req.query.devid,
        "humidity": req.query.humi,
        "temperature": req.query.temp });
});

router.get('/set_d ust', (req, res) => {
    console.log('/sensor/set_dust 요청:')
    console.log(req.query.devid)
    console.log(req.query.dust, "[ug/m3]")
    res.send('ok')

    publish('dev01', 'topic_1', {
        "message": 'dustDensityug',
        "deviceId": req.query.devid,
        "dustDensityug": req.query.dust });
    
});



dev01.on('connect', function() {
    // 이 함수를 호출되었다는 것은 AWS IoT의 Thing과 연결되었다는 의미다.
    console.log('connect');

    // 연결되면 'topic_1'이라는 사서함을 구독하겠다고 선언한다.
    // => 즉 지금부터 연결된 Thing의 'topic_1'이라는 사서함에
    //    메시지가 오면 받겠다는 의미다.
    dev01.subscribe('topic_ 1');
    console.log('topic_1의 사서함 구독 시작')
});

// 구독하기로 설정한 사서함에 메시지가 도착할 때 마다
// AWS IoT 서버에 이 프로그램에 알려준다.
// 그때 호출될 메서드를 추가한다.
dev01.on('message', function(topic, payload) {
    console.log('사서함 메시지 도착');
    console.log('사서함 이름:', topic);
    console.log('받은 메시지:', payload.toString());
    console.log('-------------------------');
});



function publish(deviceName, topic, dataObj) {
    devices[deviceName].publish(topic, JSON.stringify(dataObj));
};

module.exports = router;