// Input Button
let btnInput = document.querySelector('.input-card-btn');
// Input Button Icon
let inputIcon = document.querySelector(".inputBtnIcon");
// 

eventListeners();

function eventListeners() {
    inputIcon.addEventListener("click", changeIcon)


}


// Change Input Button icon
function changeIcon() {
    inputIcon.classList.toggle("fa-times")

}