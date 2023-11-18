let closeBtnHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="close">
        <path class="path" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>
`;

window.onload = function() {
    loadSavedNotes();   
};


function loadSavedNotes() {
    let savedNotes = localStorage.getItem("notes");


    if (savedNotes) {
        let notesArray = JSON.parse(savedNotes);

        notesArray.forEach(note => {
            createNewNote(note);
        });
    }
}


function createNewNote(note){
    let inputValue = note ? note.heading : document.getElementById("inputNoteName").value;
    let inputContent = note ? note.content : ''; 

    if (!inputValue) return;

    

    let noteBox = document.createElement('div');
    noteBox.classList.add('noteBox');

    let topNote = document.createElement('div')
    topNote.classList.add('topNote')

    let headingNote = document.createElement(`h4`)
    headingNote.textContent = inputValue;

    let close = document.createElement('div');
    close.style = "display: flex; align-items: center; cursor: pointer";
    close.innerHTML = closeBtnHtml;
    close.onclick = deleteNote;

    close.onclick = function() {
        deleteNote(noteBox);
    };

    let line = document.createElement(`hr`);
    line.classList.add('line');

    let textArea = document.createElement('textarea');
    textArea.classList.add('inputNote');
    textArea.placeholder = '  \n Enter new note '
    textArea.cols = 30;
    textArea.rows = 10;

    textArea.value = inputContent;

    textArea.addEventListener('keypress', function (e) {
        saveNotes();  
    });

    

    noteBox.appendChild(topNote);
    topNote.appendChild(headingNote);
    topNote.appendChild(close);
    noteBox.appendChild(textArea);
    

    let notesPlate = document.getElementsByClassName('notesPlate').item(0);


    document.getElementById("inputNoteName").value = "";
    notesPlate.appendChild(noteBox);

    saveNotes();
}

function pressEnter(e){
    if(e.key == 'Enter') createNewNote();
}

function deleteNote(noteElement) {
    noteElement.remove();
    saveNotes();
}

function deleteAllNotes(event){
    var notesContainer = document.querySelector(".notesPlate");

    if(notesContainer){
        var confirmDelete = confirm("Are you sure you want to delete all notes?");
        if (confirmDelete) {
            notesContainer.innerHTML = "";
        }
    }
}

function saveNotes(){
    let notes = Array.from(document.getElementById("notesPlate").children)
    .map(noteBox => {
        return {
            heading: noteBox.querySelector('.topNote h4').textContent,
            content: noteBox.querySelector('.inputNote').value
        };
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}
    