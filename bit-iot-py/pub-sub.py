# AWS IoT서버에서 메시지를 받았을 때 호출 될 함수 정의
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import logging
import time
import argparse
import json

# AWS IoT서버에서 메시지를 받았을 때 호출 될 함수 정의 
def customCallback(client, userdata, message):
    print("메시지 수신를 수신하였습니다.")
    print("사서함 이름:")
    print(message.topic)
   
    print("메세지 내용:")
    print(message.payload)
  
    print("--------------")

# AWS IoT서버의 Thing에 접속할 때 사용할 
host =  "a1lqcwo4cmer5o.iot.ap-northeast-2.amazonaws.com"
rootCAPath = "root-CA.crt"
certificatePath = "dev01.cert.pem"
privateKeyPath = "dev01.private.key"
useWebsocket = False
clientId = "client2"
topic = "topic_1"

# 실행하면서 로그를 남기기 위한 설정
logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.DEBUG)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)

#AWSIoTMQTTClient 초기화
myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
myAWSIoTMQTTClient.configureEndpoint(host, 8883)
myAWSIoTMQTTClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

# AWSIoTMQTTClient 연결에 대한 제어정보 설정
myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

#AWS IoT 에 등록된 Thing과 연결
myAWSIoTMQTTClient.connect()
print("connect\n")

myAWSIoTMQTTClient.subscribe(topic, 1, customCallback)