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
let isEditTask = false;
let editId;

eventListeners();
displayList(e);


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

    ul.innerHTML = "";

    for (let data of dataList) {


        let li = `<li class="d-flex  justify-content-around mt-4 align-items-center">
            <form class="card-form-check">
               <input type="checkbox"  id="${data.id}" class="inputName input-check">
               <label class="card-form-label" for="${data.id}">${data.name}</label>
           </form>
       
           <div class="dropdown dropdown-checkbox">
               <button class="btn dropdown-toggle"  type="button" id="dropdown-btn" 
                   data-toggle="dropdown" aria-expanded="false">
                   <i class="fa-solid fa-ellipsis"></i>
               </button>
               <div class="dropdown-menu">
                   <a class="dropdown-item" href="#" onclick="deleteTask(${data.id})" >
                       <i class="fa-solid fa-circle-minus"></i>
                   </a>
                   <a class="dropdown-item" href="#" onclick="updateTask(${data.id},'${data.name}')">
                       <i class="fa-regular fa-pen-to-square"></i>
       
                   </a>
               </div>
               </div>
               </li>`


        ul.insertAdjacentHTML("beforeend", li);

    }
    inPut.value = "";

    e.preventDefault();

}
// List Display on Screen 
function newTask(e) {


    if (inPut.value == "") {

        alert("Please input task,don't stop value")
    } else {
        if (!isEditTask) {
            // Add Task
            dataList.push({
                "id": dataList.length + 1,
                "name": inPut.value,
                "status": "complated",
            })

        } else {
            // Update Task
            addUpdatingTask();
        }

    }
    displayList();

    e.preventDefault();

}

// --------------------Delete Task 
function deleteTask(item) {

    let id;


    id = dataList.findIndex((task) => {
        task.id == item;
    })

    dataList.splice(id, 1);

    displayList();
}
// --------------------Update Task 
function updateTask(taskId, taskName) {
    //    Equal parametr
    editId = taskId;

    isEditTask = true;

    inputCard.style.display = "block";

    inPut.value = taskName;

    inPut.focus();

    inPut.classList.add("active");



}

function addUpdatingTask() {

    for (let data of dataList) {
       
        if (data.id == editId) {
         
            data.name = inPut.value;
        }
       
        isEditTask = false;
    }
}