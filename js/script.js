// chatgpt was used for assistance with object constructor logic
document.addEventListener('DOMContentLoaded', function () {
    const storageKey = 'notes';

    class Note {
        constructor(content = '') {
            this.content = content;
        }
    }

    class NotesApp {
        constructor() {
            this.notes = JSON.parse(localStorage.getItem(storageKey)) || [];
            this.notesContainer = document.getElementById('notes-container');
            this.readerContainer = document.getElementById('reader-container');
            this.lastSaved = document.getElementById('last-saved');
            this.lastRetrieved = document.getElementById('last-retrieved');

            if (this.notesContainer) {
                this.renderNotes();
                this.autoSave();
            }

            if (this.readerContainer) {
                this.autoRetrieve();
            }
        }

        saveNotes() {
            localStorage.setItem(storageKey, JSON.stringify(this.notes));
            this.updateLastSaved();
        }

        addNote() {
            const newNote = new Note();
            this.notes.push(newNote);
            this.renderNotes();
        }

        removeNote(index) {
            this.notes.splice(index, 1);
            this.renderNotes();
        }

        renderNotes() {
            this.notesContainer.innerHTML = '';

            this.notes.forEach((note, index) => {
                const noteDiv = document.createElement('div');
                const textArea = document.createElement('textarea');
                const removeButton = document.createElement('button');

                textArea.value = note.content;
                textArea.addEventListener('input', () => {
                    this.notes[index].content = textArea.value;
                });

                removeButton.innerText = 'Remove';
                removeButton.addEventListener('click', () => {
                    this.removeNote(index);
                });

                noteDiv.appendChild(textArea);
                noteDiv.appendChild(removeButton);
                this.notesContainer.appendChild(noteDiv);
            });
        }

        autoSave() {
            setInterval(() => {
                this.saveNotes();
            }, 2000);
        }

        autoRetrieve() {
            setInterval(() => {
                this.notes = JSON.parse(localStorage.getItem(storageKey)) || [];
                this.readerContainer.innerHTML = '';
                this.notes.forEach(note => {
                    const noteDiv = document.createElement('div');
                    noteDiv.innerText = `Note: ${note.content}`;
                    this.readerContainer.appendChild(noteDiv);
                });
                this.updateLastRetrieved();
            }, 2000);
        }

        updateLastSaved() {
            if (this.lastSaved) {
                const now = new Date();
                this.lastSaved.innerText = `Last saved: ${now.toLocaleTimeString()}`;
            }
        }

        updateLastRetrieved() {
            if (this.lastRetrieved) {
                const now = new Date();
                this.lastRetrieved.innerText = `Last retrieved: ${now.toLocaleTimeString()}`;
            }
        }
    }

    const app = new NotesApp();

    document.getElementById('add-note')?.addEventListener('click', () => {
        app.addNote();
    });
});
