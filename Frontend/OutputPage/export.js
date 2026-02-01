const textArea = document.getElementById("textToExport");
const copyButton = document.getElementById("copyB");
const docButton = document.getElementById("docxB");
const pdfButton = document.getElementById("pdfB");
const txtButton = document.getElementById("txtB");
const fileName = document.getElementById("exportFileName")

//when user updates the text area it updates the content text
textArea.addEventListener("input", (e) => {
    textArea.textContent = e.target.value;
    console.log("Live Text: ", textArea.textContent);
})

//Copy to clickboard
async function CopyToClipBoard(){
    try{
        await navigator.clipboard.writeText(textArea.textContent);
        console.log(textArea.textContent);
    } catch (err){
        textArea.textContent = err
        console.error("Failed to copy: ", err);
    }
}

//export as a word docx
function TxtToDocx() {
  console.log("BUTTON CLICKED") //check if the button is linked to the func
  const doc = new docx.Document({ //create a new word document
    sections: [ //specficy the doc attributes
      {
        properties: {}, //no additional properties needed for our needs
        children: [ 
          new docx.Paragraph({  //create a new paragraph element thats a child of the overal document 
            children: [
              new docx.TextRun(textArea.textContent), //then append the actual text content as a child of the paragrapgh
            ]
          })
        ]
      }
    ]
  });

  docx.Packer.toBlob(doc).then((blob) => {  //use the docx packer to create a doc blob to store the doc file so it can then be downloaded 
    const link = document.createElement("a"); //create a new link element
    link.href = URL.createObjectURL(blob);   //convert the document blob into a link that will point to the downloadable docx file
    link.download = `${fileName.value}.docx`; //set the document name to tell broswer its downloadable
    link.click();   //to save file on local computer
    URL.revokeObjectURL(link.href);   //to reset the button for a new text content
    console.log("Document created and downloaded!");  //debug to check if the blobification actually ocurs
  });
}


//export as a pdf
function TxtToPDF(){
    const doc = new window.jspdf.jsPDF(); //creates a new PDF document
    const lines = doc.splitTextToSize(textArea.textContent, 180); //split the doc into lines, each line is 180 units long (basic PDF size), so each line is split by 180 units
    doc.text(lines, 10, 10);  //add the text to the doc at position 10,10 - so at the top left corner of the PDF
    doc.save(`${fileName.value}.pdf`);  //define PDF name
}

//export as a .txt file
const ExportAsTxt = () =>{  //use arrow func as we want to "return" the file to the user implicitly, instead of utright returning it
    const link = document.createElement("a");   //create HTML link element which will be attached to the button
    const file = new Blob([textArea.textContent], {type: "text/plain"}); //get text and add it to the plain-text blob (file like object to represent data not native to js like text files)
    link.href = URL.createObjectURL(file);  //add the blog to the href attribute of the link, by creating a URL link that points to a given file (blob in this acse)
    link.download = `${fileName.value}.txt`; //adds the name of the file to the download attribute so it knows this is a downloadble link
    link.click();   //so that the file is saved on the local computer
    URL.revokeObjectURL(link.href); //remove the file link at the end to reset the downloadable text file, ready for the next time they edit the editiable text field
}

async function SetTextContent() {
  const response = await fetch("http://127.0.0.1:8000/returnfile/");
  const text = await response.text();
  textArea.textContent = text;
}

document.addEventListener("load", SetTextContent())