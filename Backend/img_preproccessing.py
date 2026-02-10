import cv2

#init image
#Greyscale img
#Threshold it
#Normalise the image

def IMG_Preproccess(filePath):
    '''
    Docstring for IMG_Preproccess:
    To preproccess uploaded images to refine them before the OCR model starts proccessing them
    :param filePath: Pass in the file path to the img to be proccessed
    '''
    
    #load the image
    img = cv2.imread(filePath)

    #greyscale it
    greyImg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    #apply gaussian blur to handle bad strokes to make everything look uniform
    blurImg = cv2.GaussianBlur(greyImg, (5, 5), 0)
    
    #Apply adaptive threshold
    threshImg = cv2.adaptiveThreshold(blurImg, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 31, 10)

    cv2.imwrite(filePath, threshImg)