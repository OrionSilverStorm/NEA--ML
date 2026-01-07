const divContainer = document.querySelector("#textToToggle"); //assigning the html div into this div container to manipulate it
let isClicked = true;

let toggleDisplay = function(){
    if (isClicked){
        divContainer.style.display = "block";
        isClicked = false;
    }else{
        divContainer.style.display = "none";
        isClicked = true;
    }
}