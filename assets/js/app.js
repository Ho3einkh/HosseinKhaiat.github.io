const todoInsert = document.querySelector("#todoInsert");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const form = document.querySelector(".form");
const dropDown = document.querySelector("#todoListDropdown");
let list = [];

// Event Listener
todoInsert.addEventListener("click" , addTodoList);
form.addEventListener('keypress' , addTodoListEnter);
dropDown.addEventListener("change" , filterTodo);
window.addEventListener("load" , uodateLocalStorage);

// Functions

// on click add to list
function addTodoList(e){
    e.preventDefault(todoList.hei);
    const todo = {
        id : list.length + 1,
        content : todoInput.value,
        compelete : false,
        animatoin : false
    }
    pushArray(todo);
    insertItem();
    clearInput();
    fadeIn();
    deleteTodo();
    todoCheckCompelete();
    return false;
}
// on enter add to list
function addTodoListEnter(e){
    let key = e.charCode || e.keyCode || 0; 
    if(key == 13){
        e.preventDefault();
        const todo = {
            id : list.length + 1,
            content : todoInput.value,
            compelete : false
        }
        pushArray(todo);
        pushToLocalStorage(list);
        insertItem();
        clearInput();
        fadeIn();
        deleteTodo();
        todoCheckCompelete();
        return false;
    }
}

// if input value was not empty push it to list of todo
function pushArray(todo){
    if(todoInput.value !== ""){
        list.push(todo);
    }else{
        alert("input should have value");
    }
}

// clear input after hit enter key or add button clicked
function clearInput(){
    todoInput.value = "";
}

// make element and push data of array to it and add it to page
function insertItem(){
    let li = "";
    list.forEach((item , index ) => {
        li = `<li class="todoItems my-2 mx-auto">
        <div class="itemsContainer pl-4 row justify-content-around align-items-center">
        <span class="todoIndex col-1">${index + 1}</span>
        <h4 class="todoTitle col-7 col-sm-9">${item.content}</h4>
        <input type="checkbox" class="fa todoCompelete" ${(item.compelete) ? "checked" : ""}>
        <button class="btn trash"><i class="fas fa-trash"></i></button>
        </div>
        </li>`;
    });

    todoList.insertAdjacentHTML("beforeend" , li);
}

// fade in animation
function fadeIn(){
    const todoItems = document.querySelector(".todoItems:last-child");
    setTimeout( ()=>{todoItems.classList.add("fade-in")} , 100);
}

// delete operats 
function deleteTodo(){
    const trash = document.querySelectorAll(".trash").forEach(item =>{ 
        item.addEventListener("click" , deleteItem);
    });
    pushToLocalStorage(list);
}

// remove element from page and also remove item from list of todo array
function deleteItem(e){
    const pElement = e.target.parentElement.parentElement;
    const newList = Array.from(todoList.children);
    newList.forEach((item , index ) =>{
        if(item == pElement){
            list.splice(index , 1);
        }
    });
    pElement.remove();
    updateIndex();
    pushToLocalStorage(list);
}

// check compelete
function todoCheckCompelete(e){
    const todoCheckbox = document.querySelectorAll(".todoCompelete");
    todoCheckbox.forEach(item => 
        item.addEventListener("change" , checkTodo)
    );
}
// change the compelete proprety and change style of element !!
function checkTodo(e){
    const id = parseInt(e.target.previousElementSibling.previousElementSibling.textContent) - 1;
    const pElement = e.target.parentElement.parentElement;
    list[id].compelete = !list[id].compelete;
    pElement.classList.toggle("done");
    pushToLocalStorage(list);
}

// update index each time an element remove
function updateIndex(){
    const todoIndex = document.querySelectorAll(".todoIndex");
    for(let i=0 ; i < list.length ; i++){
        todoIndex[i].innerText = i + 1;
    }
}

// filter todo list
function filterTodo(){
    let dropDownValue = Number(dropDown.value);
    if(todoList.childElementCount > 0){
        const todoItems = document.querySelectorAll(".todoItems");
        switch (dropDownValue){
            case 1:
                todoItems.forEach(item => {
                    (item.classList.contains("done")) ? item.style.display = "block" : item.style.display = "none"
                });
                break;
            case 2:
                todoItems.forEach(item => {
                    (item.classList.contains("done")) ? item.style.display = "none" : item.style.display = "block"
                });
                break;
            default:
                todoItems.forEach(item => item.style.display = "block");
        }
    }else{
        alert("no todo found");
    }
}

// update local storage with every item that add up to list
function pushToLocalStorage(value){
    localStorage.setItem("todoList" , JSON.stringify(value));
}

// retreve data from local storage if exist
function uodateLocalStorage(){
    if(localStorage.length > 0){
        let todoInStorage = JSON.parse(localStorage.getItem("todoList"));
        // console.log(JSON.parse(todoInStorage));
        for(let i=0 ; i < todoInStorage.length;i++){
            list[i] = todoInStorage[i];
            insertItem();
            fadeIn();
            clearInput();
            fadeIn();
            deleteTodo();
            todoCheckCompelete();
        }
        updateCheckbox();
    }
}

// update element class if checked when read data from local storage
function updateCheckbox(){
    const itemList = document.querySelectorAll(".todoCompelete");
    itemList.forEach(item => {
        (item.hasAttribute("checked")) ? item.parentElement.parentElement.classList.add("done") : ""
    });
}