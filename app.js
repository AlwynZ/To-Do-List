

let input=document.getElementById("newTask");
let addButton=document.getElementsByTagName("button")[0];
let incompleteTaskList=document.getElementById("incompleteTasks");
let completedTaskList=document.getElementById("completeTasks");
let filterOption= document.getElementById("filter")

//task creation
let createNewTask=function(newTask){

	let listItem=document.createElement("li");
	let checkBox=document.createElement("input");
	let label=document.createElement("label");


	let editInput=document.createElement("input");

	let editButton=document.createElement("button");
	let deleteButton=document.createElement("button");

	label.innerText=newTask;

	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";
	
	//append objects to list entry
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}


//add task, set as incomplete
let addTask=function(){
	let listItem=createNewTask(input.value);

	//Append listItem to incompleteTaskList, empty entries invalid
	if(input.value){ 
	incompleteTaskList.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	input.value="";
	}

}

//Mark task completed
let taskCompleted=function(){	
	//remove  list item from the list
	let listItem=this.parentNode;
	//Append the task list item to the completed task list
	completedTaskList.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}


let taskIncomplete=function(){
//mark task as incomplete.
//append the task list item to incompleteTask list
	let listItem=this.parentNode;
	incompleteTaskList.appendChild(listItem);
	bindTaskEvents(listItem,taskCompleted);
}


//Edit task
let editTask=function(){
	let listItem=this.parentNode;
	let editInput=listItem.querySelector('input[type=text]');
	let label=listItem.querySelector("label");
	let containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){
		//switch to .editmode
		//set label to given input.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		//toggle editmode on the parent
		listItem.classList.toggle("editMode");
}

//Delete task.
let deleteTask=function(){
	let listItem=this.parentNode;
	let ul=listItem.parentNode;
	//remove list item from the ul.
	ul.removeChild(listItem);

}

//hide completed/uncompleted task lists based on filter selection 
function filterTodo(e) {
	switch (e.target.value) {
		case "all":
			completedTaskList.hidden = false;
			incompleteTaskList.hidden = false;
			break;
		case "completed":
			completedTaskList.hidden = false;
			incompleteTaskList.hidden = true;
			break;
		case "uncompleted":
			completedTaskList.hidden = true;
			incompleteTaskList.hidden = false;
		 	break;
	};
  }


//event listeners for addTask function and dropdown filter
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
filterOption.addEventListener("click", filterTodo);

let bindTaskEvents=function(taskListItem,checkBoxEventHandler){

	let checkBox=taskListItem.querySelector("input[type=checkbox]");
	let editButton=taskListItem.querySelector("button.edit");
	let deleteButton=taskListItem.querySelector("button.delete");

			//Bind functions to checkbox and button
			editButton.onclick=editTask;
			deleteButton.onclick=deleteTask;
			checkBox.onchange=checkBoxEventHandler;
}

//loop through list items and bind events
for (let i=0; i < incompleteTaskList.children.length; i++){
	bindTaskEvents(incompleteTaskList.children[i],taskCompleted);
}

for (let i = 0; i < completedTaskList.children.length; i++){
	bindTaskEvents(completedTaskList.children[i],taskIncomplete);
}




