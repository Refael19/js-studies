
const table = document.getElementById("table")

let add = () => {
    table.innerHTML = `            <form action="" class="task">
                <div class="taskLine">
                    <label for="endDate">End date:</label>
                    <input id="endDate" type="date" name="endDate">
                </div>
                <div class="taskLine">
                    <label for="importance">Importance:</label>
                    <input id="importance" type="number" name="importance" style="width: 100px;" value="1">
                </div>
                <div class="taskLine">
                    <label for="title">Title:</label>
                    <input id="title" type="text" name="title" style="width: 100%; text-align: left; padding: 10px;" placeholder="Write the title of the task.">
                </div>
                <div class="taskLine">
                    <label for="content">Contect:</label>
                    <textarea id="content" name="content"
                        placeholder="Write the content of the task." style="width: 100%;" ></textarea>
                </div>
                <div style="margin-top: 10px;"><button onclick="submitButton()">Add task</button></div>
            </form>`
}

let taskID = localStorage.getItem("countTask") ? parseInt(localStorage.getItem("countTask")) : 0;
tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []

submitButton = () => {
    taskID++;

    const endDate = document.getElementById("endDate")
    const importance = document.getElementById("importance")
    const title = document.getElementById("title")
    const content = document.getElementById("content")

    while (!title.value.trim()) {
        title.value = prompt("Enter a title.")
    }

    let newTask = {
        "taskID": taskID,
        "endDate": endDate.value ? endDate.value : new Date().getFullYear(),
        "importance": importance.value,
        "title": title.value,
        "content": content.value
    }

    tasks.push(newTask)

    localStorage.setItem("countTask", JSON.stringify(taskID))
    localStorage.setItem("tasks", JSON.stringify(tasks))

    table.innerHTML = "The task is added"
    numTasks.innerHTML = `Num of tasks: ${sumTasks()}`
}

const numTasks = document.getElementById("numTasks")
let sumTasks = () => tasks.length

let start = () => {
    numTasks.innerHTML = `Num of tasks: ${sumTasks()}`
    add()
}
start()

let deleteAll = () => {
    localStorage.clear()
    tasks = []
    numTasks.innerHTML = `Num of tasks: ${0}`
    table.innerHTML = "The all tasks deleted"
}

let deleteButton = (taskID,title) => {
    tasks = tasks.filter(task => (task.taskID !== taskID))
    localStorage.setItem("tasks", JSON.stringify(tasks))
    numTasks.innerHTML = `Num of tasks: ${sumTasks()}`
    sortTasks()
}

const select = document.getElementById("sort")

let sortTasks = () => {
    if (!tasks[0]) {
        table.innerHTML = "Your do not have any task."
        return
    }
    if (select.value === "date") {
        tasks.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
    }
    if (select.value === "importance") {
        tasks.sort((a, b) => (b.importance) - (a.importance))
    }

    table.innerHTML = ""

    tasks.forEach(task => {
        table.innerHTML += `            <div class="task" style="width: 40%; overflow-y: scroll;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>End date: ${task.endDate}</div>
                    <div><button class="deleteButton" onclick="deleteButton(${task.taskID,task.title})">Delete</button></div>
                    <div>Importance: ${task.importance}</div>
                </div>
                <div>
                    <div style="font-size: 3em;">${task.title}</div>
                    <div style="font-size: 1.5em;">${task.content}</div>
                </div>
            </div>`
    });
}
