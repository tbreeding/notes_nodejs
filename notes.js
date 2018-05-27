const fs = require('fs');

const checkForDuplicates = (notesArray, title) => {
    let duplicateNotes = notesArray.filter(note => note.title === title);

    return duplicateNotes.length;
}

const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };
    
    
    if(!checkForDuplicates(notes, title)) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    
}

const getAll = () => {
    console.log('Getting all notes');
    let notes = fetchNotes();
    console.log('======== Listing All Notes ========');
    notes.forEach(note =>  {
        console.log('Title:', note.title);
        console.log('Body:', note.body);
        console.log('========');
    });
}

const getNote = (title) => {
    console.log('Getting note -', title);
    let notes = fetchNotes();
    return notes.filter(note => note.title === title)[0];
     
}

const removeNote = (title) => {
    let notes = fetchNotes()
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);   
    
    return notes.length !== filteredNotes.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}
