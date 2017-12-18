# pyfirmata에서 Arduino와 util이라는 기능 호출
from pyfirmata import Arduino, util
import time

#Arduino 관련 클래스 초기화
#/dev/ttyACM0는 경로가 아닌 접속할 Arduino 보드의 디바이스 이름
board = Arduino('/dev/ttyACM0') 
seri = serial.Serial('/dev/ttyACM0', 115200)

# pyfirmata에서 아두이노 보드의 특정 핀을 할당하고 그 핀의 값에 대한 meta 정보를 설정
# 'd:8:o'= 디지털(d), 아날로그(a): 핀번호 : 입력(i), 출력(o), PWM(p)
pin_sensor = sensor.get_pin('a:0:i')

#pyfirmata를 이용해 디지털이나 아날로그의 입력값을 읽을 때 아래 코드 입력
it = util.lterator(board)
it.start()

# pin 값을 읽어 올때 enable 명령 사용 
# 더 이상 pin 값을 읽지 않게 할 때 disable 을 사용 
# -> pin_button.disable_reporting()
pin_button.enable_reporting()
pin_button.read()

while True:
    pin_sensor.read():
        board.analog[A0].read()
        print("pin_sensor:")
    time.sleep(0.01)
