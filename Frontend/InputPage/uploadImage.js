const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('file-preview');
const uploadButton = document.getElementById('uploadButton');
const dropZone = document.getElementById('drop-zone');
const errorMessages = document.getElementById('error-message');

let fileStack = [];

// Enable drag and drop functionality with visual feedback
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); /*prevents the website to handle the drag and drop event normally so we can handle the event ourselves*/ 
  dropZone.classList.add('dragover'); /*activates the css class element dragover to change the colour of the button when the user drags over a file*/
})

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover'); /*removes the dragover element when nothing is being dragged over the drop zone*/
})

dropZone.addEventListener('drop', async (e) => { /*when item is dropped it will execute, it is async so the rest of the website works asynschrously while the file is being uploaded, e is the event object */
  e.preventDefault(); /*prevents the broswer from accidently opening the file */
  dropZone.classList.remove('dragover'); /*removes the dragover class property as the user has dragged and dropped the file */
  await handleFiles(Array.from(e.dataTransfer.files)); /* calls the dropped files, converts it into a js array and sends it to handleFiles func, await makes it so that everything waits for the file upload to finish before executing anything else*/
})

/*when user uses file picker*/
fileInput.addEventListener('change', async (e) => { 
  await handleFiles(Array.from(e.target.files)); /*same logic from drog and drop, but when it uses file picker*/
})

uploadButton.addEventListener('click', validatePresence); /*assigns the upload button the validatePresence function on click, so if no file is selected, it shows an error*/

async function handleFiles(files) {
  preview.innerHTML = ''; /*resets any previous html preview content*/
  errorMessages.innerHTML = ''; /*resets any previous error messages*/
  fileStack = []; /*reset current files*/

  for (const file of files) { /*loop through every file in the file array*/
    const isValid = await validateFile(file); /*bool isVaild calls function that will validate files*/
    if (isValid) {
      fileStack.push(file); /*appends it into the selected files stack*/
      const reader = new FileReader(); /*lets the script read the contents of the file*/
      reader.onload = (e) => createPreview(e.target.result, file.name); /*when file reader finsihes, callback func creates preview with the data url and filename*/
      reader.readAsDataURL(file); /*start reading the file as a data url, which lets it access the file type, encoding and actual file data, this kick starts reader.onload*/
    }
  }
}

async function validateFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024 //5 MB max limit;
  const isVaild = true;

  if (!validTypes.includes(file.type)) {
    showError(`${file.name} is not a valid file type`);
    isVaild = false;
  }

  if (file.size > maxSize) {
    showError(`${file.name} too large, exceeds the 5MB limit`);
    isVaild = false;
  }

  return isVaild;

}

function createPreview(source, id) {
  const container = document.createElement('div');
  container.className = 'preview-item';

  const img = document.createElement('img');
  img.src = source;
  img.alt = id;

  const fileName = document.createElement('span');
  fileName.textContent = id;

  container.appendChild(img);
  container.appendChild(fileName);
  preview.appendChild(container);
}

function showError(message) {
  const error = document.createElement('div');
  error.textContent = message;
  errorMessages.appendChild(error);
}

function validatePresence() {
  if (fileStack.length === 0) {
    showError('Please select the files to upload');
    return;
  }
}