const divContainer = document.querySelector("#text-to-toggle"); //assigning the html div into this div container to manipulate it
let isClicked = true;

let ToggleDisplay = function(){
    if (isClicked){
        divContainer.style.display = "block";
        isClicked = false;
    }else{
        divContainer.style.display = "none";
        isClicked = true;
    }
}