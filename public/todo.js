const todoListElement = document.getElementById("todoList");

async function loadTodos() {
    todoListElement.innerHTML = "";
    const todos = await axios.get("http://localhost:3000/todos", {
        headers: {
            authorization: localStorage.getItem("token")
        }
    })
    console.log(todos.data)
    todos.data.forEach(todo => {
        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");
        li.textContent = todo.text;
        deleteBtn.textContent = "Delete";
        todoListElement.appendChild(li);
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", async function () {
            try {
                const url = "http://localhost:3000/todos/" + todo.id;
                await axios.delete(url, {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                loadTodos()
            }
            catch (err) {
                console.log(err)
            }

        })

        //----MARK AS DONE------------//

        const marksAsDone = document.createElement("input");
        marksAsDone.type = "checkbox"
        li.appendChild(marksAsDone);
        marksAsDone.addEventListener("change", async function () {
            try {
                const url = "http://localhost:3000/todos/" + todo.id;
                await axios.put(url,{completed:true},{
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                })
                loadTodos();
            }
            catch(err){
                console.log(err);
            }

        })


    })
}

window.onload = loadTodos;

const inputTodo = document.getElementById("inputTodo");
const addTodo = document.getElementById("addTodo");

addTodo.addEventListener("click", async function () {
    const input = inputTodo.value;

    try {
        const response = await axios.post("http://localhost:3000/todos", { text: input }, { headers: { authorization: localStorage.getItem("token") } })
        console.log(response.data);
        loadTodos()
        inputTodo.value = "";

    }

    catch (err) {
        console.log(err)
    }


})
