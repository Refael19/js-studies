
const table = document.getElementById("table")

let add = () => {
    table.innerHTML = `            <form action="" class="task">
                <div class="taskLine">
                    <label for="endDate">End date:</label>
                    <input id="endDate" type="date" name="endDate">
                </div>
                <div class="taskLine">
                    <label for="importance">importance:</label>
                    <select name="importance" id="importance" class="importance">
                        <option value=1>Low</option>
                        <option value=2>Medium</option>
                        <option value=3>High</option>
                    </select>
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
    const completed = document.getElementById("completed")

    while (!title.value.trim()) {
        title.value = prompt("Enter a title.")
    }

    let newTask = {
        "taskID": taskID,
        "endDate": endDate.value ? endDate.value : new Date().toISOString().split('T')[0],
        "importance": importance.value,
        "title": title.value,
        "content": content.value,
        "completed": "no",
        "completedColor": "red"
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
    sortTasks()
}

let deleteAll = () => {
    let isOK = prompt("Write 'delete' if you want to delete all tasks")
    console.log(isOK)
    if (isOK === "delete") {
        localStorage.clear()
        tasks = []
        numTasks.innerHTML = `Num of tasks: ${0}`
        table.innerHTML = "The all tasks deleted."
    }else{
        table.innerHTML = `You did not write 'delete',<br/> the tasks were not deleted.`
    }
}

let deleteButton = (taskID) => {
    tasks = tasks.filter(task => (task.taskID !== taskID))
    localStorage.setItem("tasks", JSON.stringify(tasks))
    numTasks.innerHTML = `Num of tasks: ${sumTasks()}`
    sortTasks()
}

const select = document.getElementById("sort")

let completedButton = (taskID) => {
    let i = tasks.findIndex(task => task.taskID === taskID)

    if (tasks[i].completed === "no") {
        tasks = tasks.map(temp => {
            if (temp.taskID === taskID) {
                temp.completed = "yes"
                temp.completedColor = "green"
            } return temp
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
        tasks = tasks.map(temp => {
            if (temp.taskID === taskID) {
                temp.completed = "no"
                temp.completedColor = "red"
            } return temp
        })
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    sortTasks()
}

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
                    <div>Importance: ${task.importance}</div>
                </div>
                <div style="display: flex; justify-content: space-around; align-items: center; font-size: 1em;">
                    <div><button class="completedButton" onclick="completedButton(${task.taskID})">Completed: <span style="color:${task.completedColor}">${task.completed}</span></button></div>
                    <div><button class="deleteButton" onclick="deleteButton(${task.taskID})">Delete</button></div>
                </div>
                <div>
                    <div style="font-size: 3em;">${task.title}</div>
                    <div style="font-size: 1.5em;">${task.content}</div>
                </div>
            </div>`
    });
}



start()
