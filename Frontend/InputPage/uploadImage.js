// creates variables for all the html elements so I can manipulate them
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('file-preview');
const errorMessages = document.getElementById('error-message');
const uploadButton = document.getElementById('uploadButton');
const form = document.getElementById('uploadFile');
const loadingWheel = document.querySelector(".loading-wheel");

let fileStack = [];

// Enable drag and drop functionality with visual feedback
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); //prevents the website to handle the drag and drop event normally so we can handle the event ourselves
  dropZone.classList.add('dragover'); //activates the css class element dragover to change the colour of the button when the user drags over a file
})

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover'); //removes the dragover element when nothing is being dragged over the drop zone
})

dropZone.addEventListener('drop', async (e) => { //when item is dropped it will execute, it is async so the rest of the website works asynschrously while the file is being uploaded, e is the event object
  e.preventDefault(); //prevents the broswer from accidently opening the file 
  dropZone.classList.remove('dragover'); //removes the dragover class property as the user has dragged and dropped the file
  await HandleFiles(Array.from(e.dataTransfer.files)); // calls the dropped files, converts it into a js array and sends it to HandleFiles func, await makes it so that everything waits for the file upload to finish before executing anything else
})

//when user uses file picker
fileInput.addEventListener('change', async (e) => { 
  await HandleFiles(Array.from(e.target.files)); //same logic from drog and drop, but when it uses file picker
})

uploadButton.addEventListener('click', ValidatePresence); //assigns the upload button the validatePresence function on click, so if no file is selected, it shows an error

//handles the file preprocessing and preview
async function HandleFiles(files) {
  //preproccess
  preview.innerHTML = ''; //resets any previous html preview content
  errorMessages.innerHTML = ''; //resets any previous error messages
  fileStack = []; //reset current file stack to avoid confusion with previous attempts

  //Validate, append & induce preview
  for (const file of files) { //loop through every file in the file array inputed to the function 
    const isValid = await ValidateFile(file); //bool isVaild is the result of called function that will validate files, use await since we want this to be finsihed before moving on
    if (isValid) {
      fileStack.push(file); //appends it into the files stack
      const reader = new FileReader(); //lets the script read the contents of the file to get the preview
      reader.onload = (e) => CreatePreview(e.target.result, file.name); //when file reader finsihes, callback func creates preview with the data url and filename
      reader.readAsDataURL(file); //start reading the file as a data url, which lets it access the file type, encoding and actual file data, this kick starts reader.onload
    }
  }
}

//validates files before adding them to the file stack
async function ValidateFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];  //set of acceptable image types
  const maxSize = 5 * 1024 * 1024 //5 MB limit in bytes
  const isVaild = true; //base bool so that if nothing is wrong it simply returns true

  //checks file type
  if (!validTypes.includes(file.type)) {
    ShowError(`${file.name} is not a valid file type`);
    isVaild = false;
  }

  //checks file size
  if (file.size > maxSize) {
    ShowError(`${file.name} is too large and exceeds the 5MB limit`);
    isVaild = false;
  }

  //returns if valid or not
  return isVaild;
}

//creates preview
function CreatePreview(source, id) {
  const container = document.createElement('div'); //creates the actual div container where the preview will be shown
  container.className = 'preview-item'; //name the div class preview item, as it only stores a single preview item

  const img = document.createElement('img');  //creates an image 
  img.src = source; //it sets the img source equal to the inputted image URL, so that when its appended to the html it knowns what the image actually is
  img.alt = id; //if the image cant be shown for some reason the id acts as the alt text thats shown if that occurs

  const fileName = document.createElement('span'); //create span for the lable of the image
  fileName.textContent = id;  //displays image name by setting the span equal to the image id

  //append img and span to the container and then append the container as a child to preview (actual html element) so it can be displayed
  container.appendChild(img);
  container.appendChild(fileName);
  preview.appendChild(container);
}

//shows error message
function ShowError(message) {
  const error = document.createElement('div');  //creates div container to contain the error
  error.textContent = message;  //the error message equals the given parameter
  errorMessages.appendChild(error); //appends error as a child into the actual error messages element in the html
}

//checks if the file stack is empty before upload, if so returns an error message so the website doesnt process an empty set of files
function ValidatePresence() {
  if (fileStack.length == 0) {
    ShowError('Please select the files to upload');
  }
}

async function uploadFiles() {
  if (fileStack.length != 0){
    for (const file of fileStack){
      form.append("file_uploads", file, file.name); 
    }
  }
}

//checks if the file stack is empty before upload, if so returns an error message so the website doesnt process an empty set of files
function ValidatePresence() {
  if (fileStack.length == 0) {
    ShowError('Please select the files to upload');
    return false;
  }
  else{
    return true
  }
}

//validates files before adding them to the file stack
async function ValidateFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];  //set of acceptable image types
  const maxSize = 5 * 1024 * 1024 //5 MB limit in bytes
  const isVaild = true; //base bool so that if nothing is wrong it simply returns true

  //checks file type
  if (!validTypes.includes(file.type)) {
    ShowError(`${file.name} is not a valid file type`);
    isVaild = false;
  }

  //checks file size
  if (file.size > maxSize) {
    ShowError(`${file.name} is too large and exceeds the 5MB limit`);
    isVaild = false;
  }

  //returns if valid or not
  return isVaild;
}


function ShowThrobber(){
  loadingWheel.classList.remove("loading-wheel-hidden")
}

function HideThrobber(){
  loadingWheel.classList.add('loading-wheel-hidden');
}

async function WaitUntillResponse(){
  //return new Promise(resolve => setTimeout(resolve, 2000));
  await fetch("http://127.0.0.1:8000/returnfile/");
}

uploadButton.addEventListener("click", async (e) =>{
  if (ValidatePresence()){
    uploadButton.disabled = true; //prevent double clicks
    ShowThrobber();
    await setTimeout(WaitUntillResponse(), 10);
    
    window.location.href = 'http://127.0.0.1:5500/Frontend/OutputPage/outputPage.html';
    HideThrobber();
    uploadButton.disabled = false;
  }
})

//ALSO DONT NEED THE EVENT LISTENER ONE AT THE TOP