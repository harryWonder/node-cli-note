//Modules....
const _ = require('lodash');
const Yargs = require('yargs');

//Custom Modules....
const Notes = require('./functions.js');

//Data properties...
const YargsArgV = Yargs
  .command('add', 'Adds A New Note', {
    title: {
      alias: 't',
      demand: true,
      describe: 'Add a title for your new Note.',
    },
    body: {
      alias: 'b',
      demand: true,
      describe: 'Add a body for your new Note.'
    }
  })
  .command('list', 'List all notes.')
  .command('fetchNote', 'Fetch a particular Note.', {
    title: {
      alias: 't',
      demand: true,
      describe: 'Fetch a Note with this title.'
    }
  })
  .command('deleteNote', 'Deletes a particular Note', {
    title: {
      alias: 't',
      demand: true,
      describe: 'Deletes a Note with this title.'
    }
  })
  .help().argv;
const Command = YargsArgV._[0];

//Cli commands...
if (Command === 'add')
  Notes.addNote( YargsArgV.title, YargsArgV.body );
else if (Command === 'list')
  Notes.listNotes();
else if (Command === 'fetchNote')
  Notes.fetchNote( YargsArgV.title );
else if (Command === 'deleteNote')
  Notes.deleteNote( YargsArgV.title );
else
  console.log( 'Command not recognized...' );
