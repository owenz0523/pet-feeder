#              .';:cc;.
#            .,',;lol::c.
#            ;';lddddlclo
#            lcloxxoddodxdool:,.
#            cxdddxdodxdkOkkkkkkkd:.
#          .ldxkkOOOOkkOO000Okkxkkkkx:.
#        .lddxkkOkOOO0OOO0000Okxxxxkkkk:
#       'ooddkkkxxkO0000KK00Okxdoodxkkkko
#      .ooodxkkxxxOO000kkkO0KOxolooxkkxxkl
#      lolodxkkxxkOx,.      .lkdolodkkxxxO.
#      doloodxkkkOk           ....   .,cxO;
#      ddoodddxkkkk:         ,oxxxkOdc'..o'
#      :kdddxxxxd,  ,lolccldxxxkkOOOkkkko,
#       lOkxkkk;  :xkkkkkkkkOOO000OOkkOOk.
#        ;00Ok' 'O000OO0000000000OOOO0Od.
#         .l0l.;OOO000000OOOOOO000000x,
#            .'OKKKK00000000000000kc.
#               .:ox0KKKKKKK0kdc,.
#                      ...
#
# Author: peppe8o
# Date: Feb 24th, 2020
# version: 1.2

# Import required libraries
import sys
import time
import RPi.GPIO as GPIO

# define variables
chan_list = [17,27,22,18] # GPIO ports to use
delay=.001 # delay between each sequence step

# Use BCM GPIO references
# instead of physical pin numbers
GPIO.setmode(GPIO.BCM)

# Set all pins as output
for pin in chan_list:
  print("Setup pins")
  GPIO.setup(pin,GPIO.OUT)

#initialize array for sequence shift
arr1 = [1,1,0,0]
arr2 = [0,1,0,0]

def move():
  global arr1 # enables the edit of arr1 var inside a function
  global arr2 # enables the edit of arr2 var inside a function
  arrOUT = arr1[1:]+arr1[:1] # rotates array values of 1 digit
  arr1 = arr2
  arr2 = arrOUT
  GPIO.output(chan_list, arrOUT)
  time.sleep(delay)

# Start main loop
while True:
  try:
   move()
  except KeyboardInterrupt:
    GPIO.output(chan_list, (0,0,0,0))
    GPIO.cleanup()
    sys.exit()
