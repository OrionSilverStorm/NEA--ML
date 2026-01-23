#handle files:
'''
Use FASTAPI as the backend server

1. recieve file stack from frontend, sync progress with loading bar
2. call img preproccessing func and preproccess the images
3. call inference func, infer images
4. return the infered text back to the frontend
'''
from fastapi import FastAPI, UploadFile

app = FastAPI()

@app.post("/uploadfile/")
async def CreateUploadFile(file: UploadFile):
    return {"filename": file.filename}