// Card
let todoCard = document.querySelector(".card-todo");
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
// Input check
let inputCheck = document.querySelector(".inputName");
// Input Card
let inputCard = document.querySelector(".card-input");
// Input form on Input Card
let inPut = document.querySelector("#todoInput");
// List
let ul = document.querySelector(".card-body-list");
// Array List
let dataList = [];
`use strict`
//..........................Local storage
if (localStorage.getItem("dataList") !== null) {

    dataList = JSON.parse(localStorage.getItem("dataList"));
}

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
displayList(document.querySelector("span.active").id);


// document.querySelector("span.active").id
function eventListeners() {
    // Change Icon Add Btn for display input card
    inputIcon.addEventListener("click", () => {
        changeIcon();
        displayInput()
    });

    // Click Add btn for display updating and new task
    sendBtn.addEventListener("click", newTask);

    // Cancel Btn for hide input Card
    cancelBtn.addEventListener("click", (item) => {
        inputCard.style.display = "none";
        inputIcon.classList.remove("fa-times")
        todoCard.classList.remove("card-blur");

    })

    // Trash All Task
    trashBtn.addEventListener("click", clearAll);

}


// Change icon for Add btn  to input card
function changeIcon() {
    inputIcon.classList.toggle("fa-times")

}
// Click Add button for  display Input Card 
function displayInput(e) {

    if (!inputCard.style.display) {

        inputCard.style.display = "none"

    }
    if (inputCard.style.display === "none") {
        todoCard.classList.add("card-blur");
        inputCard.style.display = "block";



    } else {
        inputCard.style.display = "none"

    }

    e.preventDefault();


}


//.................Filters for  card header title

// Filters for status
let filters = document.querySelectorAll("#filters span");


console.log(filters)


// --------------------Add Task 

// Display Task on List 
function displayList(filter) {

    // Check List empty or not
    if (dataList.length == 0) {
        ul.innerHTML = "Task List is empty";

        ul.style.color = "#6C757D";
        ul.style.fontSize = "1.2rem";

    } else {
        ul.innerHTML = "";

        for (let data of dataList) {

            let complate = data.status == "complated" ? "checked" : "";

            // Filter all task as status
            if (filter == data.status || filter == "all") {


                let li = `<li class="d-flex flex-1  justify-content-between mt-4 align-items-center">
                <form class="card-form-check">
                   <input type="checkbox"  onclick="displayStat(this)" id="${data.id}" class="inputName input-check" ${complate} >
                   <label class="card-form-label ${complate}" for="${data.id}">${data.name}</label>
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

        }
        inPut.value = "";
        localStorage.setItem("dataList", JSON.stringify(dataList));
    }

}

//....................Filters

// Change color  automatic when click Title
for (let span of filters) {

    span.addEventListener("click", () => {

        // If span has active class remove
        document.querySelector('span.active').classList.remove("active");

        // When click span  add active class 
        span.classList.add("active");

        displayList(document.querySelector("span.active").id)


    });



}


//...............Display the tasks on Screen when click btn
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
                "status": "pending"
            })

        } else {
            // Update Task
            addUpdatingTask();
        }
        displayList(document.querySelector("span.active").id);
        localStorage.setItem("dataList", JSON.stringify(dataList));
    }

    e.preventDefault();

}

// --------------------Delete Task 
function deleteTask(item) {
    let id;

    id = dataList.findIndex((task) => {
        task.id == item;
    })

    dataList.splice(id, 1);

    displayList(document.querySelector("span.active").id);
    localStorage.setItem("dataList", JSON.stringify(dataList));
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

    localStorage.setItem("dataList", JSON.stringify(dataList));
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
    displayList("all");
    localStorage.setItem("dataList", JSON.stringify(dataList));

}

// Line throught Task if checked
function displayStat(statCheck) {

    let label = statCheck.nextElementSibling;

    let s;

    if (statCheck.checked) {

        statCheck.style.backgroundColor = "#C0F0E7";
        label.classList.add("checked");

        s = "complated"

    } else {
        statCheck.style.backgroundColor = "transparent";

        label.classList.remove("checked");
        s = "pending"
    }


    for (let data of dataList) {

        if (data.id == statCheck.id) {
            data.status = s;
        }
    }
    localStorage.setItem("dataList", JSON.stringify(dataList));

}