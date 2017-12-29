const awsIot = require('aws-iot-device-sdk');

const devices = {};

const dev01 = awsIot.device({

    keyPath: "D://key/dev01.private.key",
    certPath: "D://key/dev01.cert.pem",
    caPath: "D://key/root-CA.crt",

    clientId: "rasp_ardu_subscribe",

    /* AWS에 등록한 Thing을 가리키는 URL.
       AWS IoT 사물 관리 페이지에서 "상호작용" 메뉴에서
       HTTPS의 RestAPI를 요청할 때 사용할 Thing의 URL이다.*/
    host: "a1lqcwo4cmer5o.iot.ap-northeast-2.amazonaws.com"
    // host: process.env.DEV01_HOST
 });


dev01.on('connect', function() {
    console.log('AWS IoT의 dev01 장비와 연결 되었음!');
  

// 연결되면 'topic_1'이라는 사서함을 구독하겠다고 선언한다.
// => 즉 지금부터 연결된 Thing의 'topic_1'이라는 사서함에
//    메시지가 오면 받겠다는 의미다.
dev01.subscribe('topic_1');
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
