function UploadFiles(){
    const input = document.getElementById("fileInput");
    const files = input.files;

    if (!files.length){
        displayMessage("No files selected.", "red")
        return;
    }
}