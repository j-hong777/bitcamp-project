# led 제어모듈 
import RPi.GPIO as GPIO 


GPIO.setmod(GPIO.BCM)
GPIO.setUP(27, GPIO.OUT)

def onLed(state):
    GPIO.output(27, state)