#handle files:
'''
Use FASTAPI as the backend server

1. recieve file stack from frontend, sync progress with loading bar
2. call img preproccessing func and preproccess the images
3. call inference func, infer images
4. return the infered text back to the frontend
'''

#to import FastAPI backend and upload file functionality 
from fastapi import FastAPI, UploadFile, BackgroundTasks
#import response types
from fastapi.responses import RedirectResponse
#to store files in the server
from pathlib import Path
#middleware for different port communication
from fastapi.middleware.cors import CORSMiddleware
#img preproccess set up
from img_preproccessing import IMG_Preproccess
#Inference set up
#from inference import Inference
import uvicorn
#import geminai integration
from google import genai
from PIL import Image

#const has the directory that the uplaoded file will go
UPLOAD_DIR = Path().cwd() / 'uploads'

proccessedText = ''

app = FastAPI() #instantiate the fast api object

#allowed middle ware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],    #for simplicity allow any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

isReady = False

API_KEY = ''

client = genai.Client(api_key=API_KEY)

def Gemini_API_Call(img): #pass in pillow opened img
    global isReady, proccessedText

    #API call to gemini
    response = client.models.generate_content(
    model="gemma-3-27b-it",
    contents=[img, "Extract only the text from the image(s) provided. Output ONLY the transcribed text with no explanation, no markdown. Just section each image's content with a row of dashes equal to the number of characters in the largest sentence."]
    )

    #append response to proccessed text
    proccessedText = response.text 
    #signal that get request can be used
    isReady = True
    

#decorator to use the HTTP POST protocol into the defined path in the param
@app.post("/uploadfile/")
async def Create_Upload_File(file_uploads: list[UploadFile], background_tasks: BackgroundTasks):  #async funtion that will take in a list of files from the frontend
    '''
    Docstring for Create_Upload_File:
    Recieves a list of files from the frontend, and then for every file in the inputed list: it saves it to the uploads folder; preproccesses them in preperation for the OCR model; passes them into the OCR model and appends the returned value to the proccessedText; once every file has been processed it sets isReady to true; else if any error occurs it returns the exception
    :param file_uploads: a list of files uploaded from the frontend
    :type file_uploads: list[UploadFile]
    '''
    try:
        imgStack = []
        for file_upload in file_uploads:    #iterate over each file to save it to our directory
            data = await file_upload.read() #will read the file and store its contents in data, use await to make function wait for the file to be read
            save_to = Path().cwd() / 'uploads' / file_upload.filename #save a file in the predefined directory with the files name
            with open(save_to, 'wb') as f: #write to the files bytes
                f.write(data)   #write the read data, so we have completley stored this file in our backend

            imgStack.append(Image.open(save_to))
            #img preproccess
            #IMG_Preproccess(save_to)
        
        #open img - single img test  
        #img = Image.open(Path().cwd() / 'uploads' / file_uploads[0].filename)

        #schedule background processing
        background_tasks.add_task(Gemini_API_Call, imgStack)
        
        return RedirectResponse(url='http://127.0.0.1:5500/Frontend/OutputPage/outputPage.html', status_code=303)
        
    except Exception as e:
        return RedirectResponse(url='http://127.0.0.1:5500/Frontend/InputPage/inputPage.html', status_code=303) #CHOSE THIS RATHER THAN RETURNING AN ERROR MESSAGE
        #return {f"{e} + {file_upload}"}

@app.get("/returnfile/")
async def Send_back_file():
    '''
    Docstring for Send_back_file:
    After Create_Upload_File has finished processing files and isReady is set to true, return the final proccessed text back to the frontend 
    '''
    if isReady:
        return proccessedText

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)