from chandra.model import InferenceManager
from chandra.model.schema import BatchInputItem
from chandra.input import load_image

def Inference(filePath):
    '''
    Docstring for Inference:
    To proccess images (specfifically with handwritten notes) with writing in them using the Chandra OCR model to return a string containing the text content of the pass in img
    :param filePath: Pass in the file path for the img with text that needs to be proccessed
    '''
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

#if __name__ == '__main__':
 #   Inference('./uploads/y21.jpg')