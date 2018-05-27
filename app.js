
const FS = require('fs');
const OS = require('os');
const NOTES = require('./notes');
const _ = require('lodash');
const yargs = require('yargs');

let command = process.argv[2];
const title = {
        describe: 'Title of note.',
        demand: true,
        alias: 't'
};
const body = {
    describe: 'Body of note.',
    demand: true,
    alias: 'b'
}
const argv = yargs
    .command('add', 'Add a new note.', {
        title,
        body
    })
    .command('list', 'List all notes.')
    .command('read', 'Read a note', {
        title
    })
    .command('remove', 'Remove a note.', {
        title
    })
    .help()
    .argv;
// console.log('Yargs', argv);

if(command === 'add') {
    const note = NOTES.addNote(argv.title, argv.body);
    if(note) {
        console.log(argv.title, 'Added to notes.');
    } else {
        console.log('Note with this title already exists: ');
        NOTES.getNote(argv.title);
    }
} else if (command === 'list') {
    NOTES.getAll();
} else if (command === 'read') {
    let note = NOTES.getNote(argv.title);
    if(note) {
        console.log('Note Found');
        console.log('Title:', note.title);
        console.log('Body:', note.body);  
    } else {
        console.log('Note note found.');
    }
} else if (command === 'remove') {
    let noteRemoved = NOTES.removeNote(argv.title);

    console.log(noteRemoved ? 'Note Was Removed' : 'Note not found.');

} else {
    console.log('Command note recognized');
}




// console.log(user);


// FS.appendFile('greetings.txt', `Hello ${user.username}! You are ${NOTES.age}.`, (err) => {
//     if (err) {
//       console.log('Unable to write to file');
//     }
//   });