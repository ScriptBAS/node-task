const yargs = require("yargs");
const { addNote, printNotes, removeNote} = require("./notes.controller")

yargs.command({
    command: "add",
    decribe: "add new note",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true
        }
    },
    handler( { title } ) {
        addNote(title)
    }
})

yargs.command({
    command: "list",
    decribe: "show notes list",
    async handler() {
       printNotes()
    }
})

yargs.command({
    command: "remove",
    decribe: "Remove note by id",
    builder: {
        id: {
        type: "string",
        describe: "Note id",
        demandOption: true}
    },
    async handler({id}) {
       await removeNote(id)
    }
})

yargs.parse()

