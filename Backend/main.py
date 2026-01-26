#handle files:
'''
Use FASTAPI as the backend server

1. recieve file stack from frontend, sync progress with loading bar
2. call img preproccessing func and preproccess the images
3. call inference func, infer images
4. return the infered text back to the frontend
'''

#to import FastAPI backend and upload file functionality 
from fastapi import FastAPI, UploadFile
#to store files in the server
from pathlib import Path

#const has the directory that the uplaoded file will go
UPLOAD_DIR = Path() / 'uploads'


app = FastAPI() #instantiate the fast api object

#decorator to use the HTTP POST protocol into the defined path in the param
@app.post("/uploadfile/")
async def Create_Upload_File(file_uploads: list[UploadFile]):  #async funtion that will take in a list of files from the frontend
    for file_upload in file_uploads:    #iterate over each file to save it to our directory
        data = await file_upload.read() #will read the file and store its contents in data, use await to make function wait for the file to be read
        save_to = UPLOAD_DIR / file_upload.filename #save a file in the predefined directory with the files name
        with open(save_to, 'wb') as f: #write to the files bytes
            f.write(data)   #write the read data, so we have completley stored this file in our backend
    return {"filenames": [f.filename for f in file_uploads]}   #returns a list of file names of all uploaded files