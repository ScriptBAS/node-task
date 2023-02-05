const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')


const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes () {
    const notes = await getNotes()
    notes.forEach(note => {
        console.log(chalk.blueBright(note.id, note.title));
    })
}

async function removeNote(id) {
    const notes = await getNotes()
    updatedNotes = notes.filter(note => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
}

async function updateNotes(id, title) {
    const notes = await getNotes()
    const updatedNotes = notes.map(note => {
        if (note.id === id) {
            return {id, title}
        }
        return note
    })
    console.log(updatedNotes);
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
}

module.exports = {
    addNote, removeNote, getNotes, updateNotes
}