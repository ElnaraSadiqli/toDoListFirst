//  Add  Btn  for display Input Card
let btnInput = document.querySelector('.add-btn');
// Send btn for push task  on List
let sendBtn = document.querySelector(".send-btn");
// Cancel btn for cancel Input Card 
let cancelBtn = document.querySelector("#btnCancel");
//Trash All  btn
let trashBtn = document.querySelector("#trash-btn");
//  Plus Icon for Add  Btn  to display Input Card
let inputIcon = document.querySelector(".addBtnIcon");

// Input Card
let inputCard = document.querySelector(".card-input");
// Input form on Input Card
let inPut = document.querySelector("#todoInput");
// List
let ul = document.querySelector(".card-body-list");
// Array List
let dataList = [];

// Value for Editing Task
let isEditTask = false;

//Value for Edit task  > Equal id and task id 
let editId;

//...............................Date of card
let date = new Date();
setMonth();
setWeek();
setDay();
//.............Change Month automatically
function setMonth() {
    //  Month tag get from Html
    let pMonth = document.querySelector(".card-date-month");

    // Array  of months
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let month = date.getMonth();

    pMonth.innerHTML = months[month];

}
//.............Change Week automatically
function setWeek() {

    // Week tag get from Html
    let pWeek = document.querySelector(".card-date-week");

    let weeks = [
        " ",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    let week = date.getDay();
    // Display week on  screen 
    pWeek.innerHTML = weeks[week] + ",";

}
//.............Change Week automatically
function setDay() {

    // Date tag get from Html
    let pDay = document.querySelector(".card-date-day");

    let days = date.getDate();

    pDay.innerHTML = days + "th";

}



eventListeners();

// Display All Tasks when update page
displayList(e);


function eventListeners() {
    // Change Icon Add Btn for display input card
    inputIcon.addEventListener("click", () => {
        changeIcon();
        displayInput();
    });

    // Click Add btn for display updating and new task
    sendBtn.addEventListener("click", newTask);

    // Cancel Btn for hide input Card
    cancelBtn.addEventListener("click", (item) => {
        inputCard.style.display = "none";
        inputIcon.classList.remove("fa-times")

        e.preventDefault();
    })

    // Trash All Task
    trashBtn.addEventListener("click", clearAll);

}


// Change icon for Add btn  to input card
function changeIcon() {
    inputIcon.classList.toggle("fa-times")

}
// Click Add button for  display Input Card 
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

    // Check List empty or not
    if (dataList.length == 0) {
        ul.innerHTML = "Task List is empty";

        ul.style.color = "#6C757D";
        ul.style.fontSize = "1.2rem";
    } else {
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

    }

    e.preventDefault();

}
// List Display on Screen 
function newTask(e) {

    //If  Input value is empty
    if (inPut.value == "") {
        alert("Please write task,don't keep empty")
    } else {
        //If  Input value is not empty and edit mode
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

// --------------------Clear All Task
function clearAll() {

    dataList.splice(0, dataList.length);
    displayList();
}