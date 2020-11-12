let items = JSON.parse(localStorage.getItem("items"))

if (items) {
    items = items
} else {
    items = []
}

class TodoList {
    item(name) {
        return {
            name: name,
            time: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
    }

    addItem(item) {
        localStorage.setItem("items", JSON.stringify([...items, item]))
        items = JSON.parse(localStorage.getItem("items"))
    }

    removeItem(name) {
        let lefts = []
        items.forEach(item => {
            if (item.name !== name) {
                lefts.push(item)
            }
        })
        localStorage.setItem("items", JSON.stringify(lefts))
        items = JSON.parse(localStorage.getItem("items"))
        this.renderItems()
    }

    showAlert(type, txt) {
        document.getElementById("alertBox").innerHTML =
            `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${txt}
            <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>
        </div>`
    }

    renderItems() {
        if (items || items.length !== 0) {
            document.getElementById("noItems").style.display = "none"
            document.getElementById("itemList").innerHTML = ""

            items.reverse().forEach(item => {
                const li = document.createElement("li")
                li.classList.add("list-group-item")
                li.style.margin = "10px"
                li.innerHTML = `
                <b>${item.name.toUpperCase()}</b>, On - ${item.time}
                <button onClick=removeItem("${item.name}") style="float:right; clear: both;" class="deleteBtn btn btn-danger">DELETE</button>
                `
                document.getElementById("itemList").appendChild(li)
            })
        }
        else {
            document.getElementById("noItems").style.display = "block"
        }
    }
}

const itemNameInput = document.getElementById("item_name_inp")
const addItemBtn = document.getElementById("add_item_btn")
const deleteBtns = document.querySelectorAll(".deleteBtn")

const todoList = new TodoList();
todoList.renderItems()

addItemBtn.addEventListener("click", () => {
    if (itemNameInput.value.trim() == "") {
        todoList.showAlert("warning", "Please enter some text")
    }

    else if (items.includes(itemNameInput.value)) {
        todoList.showAlert("warning", "This item already in list")
    }

    else {
        todoList.addItem(todoList.item(itemNameInput.value.toUpperCase()))
        itemNameInput.value = ""
        todoList.showAlert("success", "Item added successfully")
        todoList.renderItems()
    }
})

function removeItem(name) {
    todoList.removeItem(name)
}
