from chandra.model import InferenceManager
from chandra.input import load_pdf_images
#from PIL import Image

#def inference(count, name):
 #   for i in range(0, count):
#PIL_IMAGE = Image.open('/uploads/yeet.png').convert("RGB")

manager = InferenceManager(method="hf")
images = load_pdf_images("document.pdf")
results = manager.generate(images)
print(results[0].markdown)