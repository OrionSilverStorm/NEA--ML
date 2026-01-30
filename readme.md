# Dependencies

- pip install chandra-ocr
- pip install opencv-python
- pip install fastapi[standard]
- pip uninstall torch torchvision torchaudio
- pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu126

# Stuff to run:

- Run inference.py seperately, just call the func at the bottom of the script and set the file path to be the y21.jpg file in uploads
- Then uncomment the inference in main.py and run it from the website; u just need to use liveserver and go live, and then you just have to init the uvicorn server (fastapi run main.py --reload)