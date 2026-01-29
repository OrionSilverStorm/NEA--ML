from chandra.model import InferenceManager
from chandra.model.schema import BatchInputItem
from chandra.input import load_image

def Inference(filePath):
    #init inference manager and its model type
    manager = InferenceManager(method="hf")
    #init img
    img = load_image(filePath)
    #init batches of the input, with image src, and prompt equaling ocr 
    batch = [BatchInputItem(image=img, prompt_type="ocr_layout")]
    #generate result
    results = manager.generate(batch)
    #return markdown verison of it
    return results[0].markdown