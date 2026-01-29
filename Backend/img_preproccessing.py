import cv2
from pathlib import Path


#init image
#Greyscale img
#Threshold it
#Normalise the image

def IMG_Preproccess(filePath):
    #load the image
    img = cv2.imread(filePath)

    #greyscale it
    greyImg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    #apply otsu thresholding algorithm 
    threshImg = cv2.threshold(greyImg, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]

    #use distance transform to focus on the words
    distImg = cv2.distanceTransform(threshImg, cv2.DIST_L2, 5)
    
    #Normalise image, so its either black or white
    distImg = cv2.normalize(distImg, distImg, 0, 1.0, cv2.NORM_MINMAX)
    distImg = (distImg * 255).astype("uint8")

    cv2.imwrite(filePath, img)

IMG_Preproccess(Path().cwd() / 'uploads' / 'yeet.png')