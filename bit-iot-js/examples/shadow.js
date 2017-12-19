// AWS IoT의 Gateway에 메세지를 보내는 예제
// => 메시지를 보내는 것을 "발행(publish)"이라고 표현한다.

// AWS에서 제공하는 nodeJS 모듈을 로딩한다.
var awsIot = require('aws-iot-device-sdk');

const thingName = 'dev01';

// AWS서버에 등록된 Things 정볼르 바탕으로 장비를 준비 시킨다.
var thingShadows = awsIot.thingShadow({
     /*ASW 서버에서 Things을 생성한 후 만든 인증서의 개인키 파일*/
    keyPath: "dev01.private.key",

    /*ASW 서버에 Thing을 생성한 후 만든 인증서의 사물인증서 파일*/
   certPath: "dev01.cert.pem", //pem은 공개키(public.key)를 인증하는 인증서임.

    /*사물에 대해 발행한 인증서를 검증해줄 "인증서를 발행한 회사" 의 인증서*/
     caPath: "root-CA.crt", 

      /*다른 클라이언트와 구분하기 위한 임의의 ID*/
   clientId: "client2",

   /*ASW에 등록한 Thing을 가리키는 URL 
    AWS IoT 사물관리 페이지에서 "상호작용" 메뉴에서 
    HTTP의 RestAPT를 요청할 때 사용할 Thing의 URL이다.*/
       host: "a1lqcwo4cmer5o.iot.ap-northeast-2.amazonaws.com" 
 });

 // 이 프로그램이 AWS IoT에 등록된 Thing과 연결되었을 때 호출될 메서드 추가
 thingShadows.on('connect', function() {
       console.log('섀도우 관리자를 준비되었다.');
     
       
       thingShadows.register( thingName, {}, function() {
           console.log('섀도우 연결하였음!');
           
           console.log('섀도우 설정된 값 조회를 요청한다.!');
           thingShadows.get('dev01');
        /*
           thingShadows.update('dev01', {
               state: {
                   desired:{
                    led: "on"
                   }
                  
               }
           });*/
       });
      
});

thingShadows.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       

         if ((stat === "rejected") && (stateObject.code === 404)){

            console.log('섀도우에 기본 값을 설정하였음!');
            thingShadows.update(thingName, {
                state: {
                    desired:{
                     led: "off"
                    }}});
         } else {
            console.log('received '+stat+' on '+thingName+': '+
            JSON.stringify(stateObject));
         }
 });

 thingShadows.on('delta', 
 function(thingName, stateObject) {
    console.log('received delta on '+thingName+': '+
                JSON.stringify(stateObject));
 });

 thingShadows.on('timeout',
 function(thingName, clientToken) {
    console.log('received timeout on '+thingName+
                ' with token: '+ clientToken);
});