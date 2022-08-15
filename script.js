// Input Button 
let btnInput = document.querySelector('.add-btn');
// Add Input Button
let sendBtn = document.querySelector(".send-btn");

// Input Button Icon
let inputIcon = document.querySelector(".addBtnIcon");

// Card input
let inputCard = document.querySelector(".card-input");
let inPut = document.querySelector("#todoInput");

let ul = document.querySelector(".card-body-list");

let dataList = [];


eventListeners();

displayList();

function eventListeners() {
    inputIcon.addEventListener("click", () => {
        changeIcon();
        displayInput();
    });

    sendBtn.addEventListener("click", newTask);

}


// Change icon for Input Button 
function changeIcon() {
    inputIcon.classList.toggle("fa-times")

}
// Click Input button for  display Input Card 
function displayInput(event) {

    if (!inputCard.style.display) {

        inputCard.style.display = "none"
    }
    if (inputCard.style.display === "none") {

        inputCard.style.display = "block"

    } else {
        inputCard.style.display = "none"
    }

    event.preventDefault();
}

// --------------------Add Task 


// Display Task on List 
function displayList(e) {

    let li;

    for (let data of dataList) {

        dataList = [];

        li = `<li class="d-flex  justify-content-around align-items-center">
        <form class="card-form-check">
           <input type="checkbox"  id="${data.id}" class="inputName input-check">
           <label class="card-form-label" for="${data.id}">${data.name}</label>
       </form>
   
       <div class="dropdown dropdown-checkbox">
           <button class="btn dropdown-toggle" id="dropdown-btn" type="button"
               data-toggle="dropdown" aria-expanded="false">
               <i class="fa-solid fa-ellipsis"></i>
           </button>
           <div class="dropdown-menu">
               <a class="dropdown-item" href="#">
                   <i class="fa-solid fa-circle-minus"></i>
               </a>
               <a class="dropdown-item" href="#">
                   <i class="fa-regular fa-pen-to-square"></i>
   
               </a>
           </div>
           </div>
           </li>`


        ul.insertAdjacentHTML("beforeend", li);



    }



    e.preventDefault();

}

// List Display on Screen 
function newTask(e) {

    e.preventDefault();

    dataList.push({
        "id": dataList.length + 1,
        "name": inPut.value,
        "status": "complated",
    })


    displayList();


}