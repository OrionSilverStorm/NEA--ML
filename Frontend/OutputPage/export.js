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
function txtToPDF(){
    const doc = new window.jspdf.jsPDF();
    const lines = doc.splitTextToSize(textArea.textContent, 180);
    doc.text(lines, 10, 10);
    doc.save(`${fileName.value}.pdf`);
}

//export as a .txt file
const exportAsTxt = () =>{  //use arrow func as we want to "return" the file to the user implicitly, instead of utright returning it
    console.log("yes");
    const link = document.createElement("a");   //create HTML link element which will be attached to the button
    const file = new Blob([textArea.textContent], {type: "text/plain"}); //get text and add it to the plain-text blob (file like object to represent data not native to js like text files)
    link.href = URL.createObjectURL(file);  //add the blog to the href attribute of the link, by creating a URL link that points to a given file (blob in this acse)
    link.download = `${fileName.value}.txt`; //adds the name of the file to the download attribute so it knows this is a downloadble link
    link.click();   //so that the file is saved on the local computer
    URL.revokeObjectURL(link.href); //remove the file link at the end to reset the downloadable text file, ready for the next time they edit the editiable text field
}