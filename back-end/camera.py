from picamera2 import Picamera2
import time

picam2 = Picamera2()

# Set the file path to the desired folder
output_folder = "../frontend/assets/"
output_file = output_folder + "image.jpg"

camera_config = picam2.create_still_configuration(main={"size": (1920, 1080)}, lores={"size": (640, 480)}, display="lores")
picam2.configure(camera_config)
picam2.start()
time.sleep(20)

# Save the image in the specified folder
picam2.capture_file(output_file, overwrite=True)