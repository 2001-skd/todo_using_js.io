const inputValue = document.querySelector(".input_value");
const addButton = document.querySelector(".add_button");
const todoList = document.querySelector(".todo_list");
const activeButton = document.querySelector(".active");
const notCompletedButton = document.querySelector(".not_completed");
let taskList = [];
let taskObj;

addButton.addEventListener("click", addTask);

function addTask() {
  let task = inputValue.value;
  inputValue.value = "";

  if (task.trim() === "") {
    console.log("Please add Task");
  } else {
    taskObj = {
      id: Date.now(),
      task: task,
      isCompleted: false,
    };
    taskList.push(taskObj);
  }

  listTask();

  console.log(taskList);
}

// filter active task starts
activeButton.addEventListener("click", () => {
  let activeTasks = taskList.filter((task) => {
    task.isCompleted === false;
  });
  listTask(activeTasks);
  //   console.log("active");
});

notCompletedButton.addEventListener("click", () => {
  let notCompletedTasks = taskList.filter((task) => {
    task.isCompleted === true;
  });
  listTask(notCompletedTasks);
});
// filter active task ends

function listTask(list = taskList) {
  todoList.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    const list = document.createElement("ul");
    let { id, task, isCompleted } = taskList[i];
    list.innerHTML = `<li>
              <div>
                <input type="checkbox" ${
                  isCompleted ? "checked" : ""
                } /> <label class="task_text" contenteditable="false">${task}</label>
              </div>
              <div>
                <button class="edit_btn">Edit</button>
                <button class="delete_btn">Delete</button>
              </div>
            </li>`;

    let taskText = list.querySelector(".task_text");
    let checkBox = list.querySelector("input[type=checkbox]");

    // function to checkbox starts
    checkBox.addEventListener("change", () => {
      //   if (checkBox.checked) {
      //     // console.log("checked");
      //     taskList = taskList.map((task) => {
      //       if (task.id === id) {
      //         task.isCompleted = true;
      //       }
      //       return task;
      //     });
      //   } else {
      //     // console.log("not checked");
      //     taskList = taskList.map((task) => {
      //       if (task.id === id) {
      //         task.isCompleted = false;
      //       }
      //       return task;
      //     });
      //   }

      taskList = taskList.map((task) => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      });
    });
    // function to checkbox ends

    // delete function starts
    let deleteButton = list.querySelector(".delete_btn");
    deleteButton.addEventListener("click", () => {
      let confirmDelete = confirm(
        `You Want To Delete This Task - ${taskList[i].task}`
      );
      if (confirmDelete) {
        let filteredArray = taskList.filter((task) => {
          // console.log(task.id);
          return task.id !== id;
        });
        taskList = filteredArray;

        todoList.removeChild(list);
      }
    });
    // delete function ends

    // edit function starts
    const editButton = list.querySelector(".edit_btn");
    editButton.addEventListener("click", () => {
      if (editButton.innerHTML === "Edit") {
        taskText.setAttribute("contenteditable", true);
        taskText.focus();
        editButton.innerHTML = "Save";
      } else {
        editButton.innerHTML = "Edit";
        taskText.setAttribute("contenteditable", false);
        let updatedText = taskText.innerHTML.trim();
        if (updatedText !== "") {
          taskList = taskList.map((task) => {
            if (task.id === id) {
              task.task = updatedText;
            }
            return task;
          });
        }
      }
    });
    // edit function ends

    // list.classList.add("todo_list");
    todoList.appendChild(list);
  }
}
