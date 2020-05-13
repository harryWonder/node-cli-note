//Modules....
const Fs = require('fs');
const Os = require('os');

//Data properties...
const UserName  = Os.userInfo().username;
const Date = global.Date();

//Fetching all stored notes...
let Notes = Fs.readFileSync(__dirname + '/store/Notes.json', 'utf-8');
Notes = JSON.parse(Notes);

//Adding Notes...
const addNote = ( title, body ) => {
  //Data properties...
  const Data = `${UserName} Created A Note Titled: ${title} on ${Date}` + '\n';
  // Check if a note with this title exist...
  if (checkNotes(title)) {
    const Message = `
    ===============================
    ===============================
        NOTE ALREADY EXISTS
    ===============================
    ===============================
    Sorry. A Note with this title already exist. Please, try again later.
    `;
    console.log(Message);
    return false;
  }
  //Create the note....
  Notes.push({ title: title, body: body });
  const Note = JSON.stringify(Notes);

  //creating the stored notes...
  Fs.writeFile(__dirname + '/store/Notes.json', Note, 'utf-8', ( err ) => {
    if ( err )
      console.log( 'Failed to write your note to the store. Please, try again later.' );
    else
    console.log( 'Added a New Note entry to the Note Store.' );
  });

  //Writing to the log file...
  Fs.appendFile(__dirname + '/log.txt', Data, 'utf-8', ( err ) => {
    if ( err )
      console.log( 'An unexpected error occurred and your log could not be updated.' );
  });
}

//Listing Notes...
const listNotes = () => {
  const Data = `${UserName} Fetched all Notes on ${Date}` + '\n';
  //List all Notes...
  Notes.forEach( (Note) => {
    console.log(`Title: ${Note.title}`);
    console.log(`Body: ${Note.body}`);
  } );
  //Write to the file logs...
  Fs.appendFile(__dirname + '/log.txt', Data, 'utf-8', ( err ) => {
    if ( err )
      console.log( 'An unexpected error occurred and your log could not be updated.' );
  });
}

//Fetching Notes...
const fetchNote = ( title ) => {
  const Data = `${UserName} Fetched A Note Titled: ${title} on ${Date}` + '\n';
  //Check if a note with the title already exist....
  if (checkNotes(title)) {
    let Note = searchNote(title);
    console.log(`Title: ${Note.title}`);
    console.log(`Body: ${Note.body}`);
  }
  //write to the file logs...
  Fs.appendFile(__dirname + '/log.txt', Data, 'utf-8', ( err ) => {
    if ( err )
      console.log( 'An unexpected error occurred and your log could not be updated.' );
  });
}

//Deleting Notes...
const deleteNote = ( title ) => {
  const Data = `${UserName} Deleted A Note Titled: ${title} on ${Date}` + '\n';

  if (checkNotes( title )) {
    Notes = Notes.filter( (note) => {
      if (note.title !== title) return true;
    } );

    Notes = JSON.stringify(Notes);
    Fs.writeFile(__dirname + '/store/Notes.json', Notes, 'utf-8', ( err ) => {
      if ( err )
        console.log( 'An unexpected error occurred and your Note could not be deleted...' );
    });
  }

  Fs.appendFile(__dirname + '/log.txt', Data, 'utf-8', ( err ) => {
    if ( err )
      console.log( 'An unexpected error occurred and your log could not be updated.' );
  });
}

//check notes...
const checkNotes = ( title ) => {
  const Note = Notes.filter( (note) => {
    if (note.title === title) return true;
  });

  if (Note.length > 0)
    return true;
  else
    return false;
}

//search and return a note by it's title...
const searchNote = ( title ) => {
  let Note = { };
  Notes.forEach( (note) => {
      if (note.title === title) {
        Note.title = note.title;
        Note.body = note.body;
      }
  } );

  return Note;
}

//Exporting resuable functions...
module.exports = {
  addNote,
  listNotes,
  fetchNote,
  deleteNote
};
