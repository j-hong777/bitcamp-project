# led 제어모듈 
import RPi.GPIO as GPIO 


GPIO.setmode(GPIO.BCM)
GPIO.setup(27, GPIO.OUT)

def onMotor(state):
    GPIO.output(27, state)