const textArea = document.getElementById("textToExport");
const fileName = document.getElementById("exportFileName")
const copyButton = document.getElementById("copyB");
const docButton = document.getElementById("docxB");
const pdfButton = document.getElementById("pdfB");
const txtButton = document.getElementById("txtB");


//when user updates the text area it updates the content text
textArea.addEventListener("input", (e) => {
    textArea.textContent = e.target.value;
    console.log("Live Text: ", textArea.textContent);
})

//Copy to clickboard
async function copyToClipBoard(){
    try{
        await navigator.clipboard.writeText(textArea.textContent);
        console.log(textArea.textContent);
    } catch (err){
        console.error("Failed to copy: ", err);
    }
}

//export as a word docx


//export as a pdf


//export as a .txt file
const downloadFile = () =>{
    const link = document.createElement("a");
    const file = new Blob([content], {type: "text/plain"});
    link.href = URL.createObjectURL(file);
    link.download = "${}"
}