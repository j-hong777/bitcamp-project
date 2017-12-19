var awsIot = require('aws-iot-device-sdk');

const thingName = 'dev01';

var thingShadows = awsIot.thingShadow({
    keyPath: "/home/ec2-user/vars/aws-iot/dev01/dev01.private.key",
    certPath: "/home/ec2-user/vars/aws-iot/dev01/dev01.cert.pem", 
    caPath: "/home/ec2-user/vars/aws-iot/root-CA.crt", 
    clientId: "fbchatbot",
    host: process.env.DEV01_HOST  
});


 thingShadows.on('connect', function() {
    console.log('섀도우 관리자를 준비되었다.');
  
    
    thingShadows.register( thingName, {}, function() {
        console.log('섀도우 연결하였음!');
        
        console.log('섀도우 설정된 값 조회를 요청한다.!');
        thingShadows.get('dev01');
    
    });
   
});

thingShadows.on('timeout',
function(thingName, clientToken) {
   console.log('received timeout on '+thingName+
               ' with token: '+ clientToken);
});

function update(desiredState){
    thingShadows.update(thingName, {state: {desired: desiredState}});
}

module.exports = {
    update
};
