document.addEventListener("click", event => {
    const id = event.target.dataset.id
    if (event.target.dataset.type === "remove") {
        remove(id).then(() => {
            event.target.closest("li").remove()
        })
    } else if (
        event.target.dataset.type === "edit"
    ) {
        const editedTitle = prompt("Введите новое название")
        if (editedTitle) {
            edit(editedTitle, id)
            .then(() => {
                event.target.closest("li").firstChild.textContent = editedTitle
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: "DELETE"})
}

async function edit(title, id) {
    const updatedNote = {title, id}
    await fetch(`/${id}`, {method: "PUT", 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote)})
}