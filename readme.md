**Handwritten Notes to Text Converter: A Full-Stack Web Application for Digitising Handwritten Notes**

A full-stack web application that converts photos of handwritten notes into editable, exportable text. Built with a FastAPI backend and an HTML/CSS/JavaScript frontend, it sends uploaded images to Google’s Gemini model for OCR, then lets users correct the transcription and export it as a PDF, Word document or text file. Developed across three Agile cycles and shaped by stakeholder surveys (directly taken from students), competitor analysis and testing, it demonstrates modular, documented code and a user-centred approach to software engineering.

# Dependencies and Instructions to run
- pip install fastapi[standard]
- pip install uvicorn
- pip install pillow
- pip install google-genai
- pip install pathlib
- Install live server extension on vs code for debugging 
- Put in a free Gemini api key to the const in the main file (just go to the google AI devspace or lab, sign in with google and you can get a free one)
- Be in the backend directory
- Click Go Live at the bottom right of VS code while your in a HTML file
- In terminal type: uvicorn main:app --reload, wait till it says application start up
