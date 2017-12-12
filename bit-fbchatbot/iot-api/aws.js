var awsIot = require('aws-iot-device-sdk');

//장비목록
const devices = {};

const device = awsIot.device({
    keyPath: "/home/ec2-user/vars/aws-iot/dev01/dev01.private.key",
    certPath: "/home/ec2-user/vars/aws-iot/dev01/dev01.cert.pem", 
    caPath: "/home/ec2-user/vars/aws-iot/root-CA.crt", 
    clientId: "fbchatbot",
    host: "a1lqcwo4cmer5o.iot.ap-northeast-2.amazonaws.com" 
 });


 device.on('connect', function() {
   console.log('AWS IoT의 dev01  장비와 연결되었음');
   //연결에 성공하면 연결된 장비를 목록에 추가한다.
   devices['dev01'] = dev01;
});

function publish(deiceName, topic, dataObj) {
    devices[deviceName].publish(topic, JSON.stringify(dataObj));
}
module.exports = {
    publish
};
