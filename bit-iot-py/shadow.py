# AWS IoT 파이썬 라이브러리 및 관련 라이브러리 로딩 
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTShadowClient
import logging
import time
import argparse
import json
import led_api as led

# AWS IoT 서버에서 메시지를 받았을 때 호출될 함수 정의 
def updateCallback(payload, responseStatus, token):
    print(payload)
    print(responseStatus)
    print(token)
    print("--------------")

# AWS IoT의 Thing에 접속할 때 사용할 정보 준비

# AWS에 등록한 Thing을 가리키는 URL. 
# AWS IoT 사물 관리 페이지에서 "상호작용" 메뉴에서 
# HTTPS의 RestAPI를 요청할 때 사용할 Thing의 URL이다.
host = "a1lqcwo4cmer5o.iot.ap-northeast-2.amazonaws.com"

# 사물에 대해 발행한 인증서를 검증해 줄 
# "인증서를 발행한 회사(인증기관)"의 인증서 파일
rootCAPath = "root-CA.crt"

# AWS 서버에 Thing을 생성한 후 만든 인증서의 사물인증서 파일
certificatePath = "dev01.cert.pem"

# AWS 서버에 Thing을 생성한 후 만든 인증서의 개인키 파일 
privateKeyPath = "dev01.private.key"

# web 소켓 사용 여부 
useWebsocket = False

# 다른 클라이언트와 구분하기 위한 임의의 ID
clientId = "client2"

# 실행하면서 로그를 남기기 위한 설정
logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.DEBUG)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)

# AWSIoTMQTTShadowClient 초기화
myShadowClient = AWSIoTMQTTShadowClient(clientId)
myShadowClient.configureEndpoint(host, 8883)
myShadowClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

# AWSIoTMQTTClient 연결에 대한 제어 정보 설정
myShadowClient.configureAutoReconnectBackoffTime(1, 32, 20)
myShadowClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
myShadowClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myShadowClient.configureConnectDisconnectTimeout(10)  # 10 sec
myShadowClient.configureMQTTOperationTimeout(5)  # 5 sec

# AWS IoT에 등록된 Thing과 연결
myShadowClient.connect()
print("shadowconnect\n")

myDeviceShadow = myShadowClient.createShadowHandlerWithName("dev01", True)

myJSONPayload = '{"state": {desired":{"led":"on"}}}'
myDeviceShadow.shadowUpdate(myJSONPayload, updateCallback, 5)