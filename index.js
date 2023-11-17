let closeBtnHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="close">
        <path class="path" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>
`;


function createNewNote(){
    let inputValue = document.getElementById("inputNoteName").value;

    if (!inputValue) return;

    let noteBox = document.createElement('div');
    noteBox.classList.add('noteBox');

    let topNote = document.createElement('div')
    topNote.classList.add('topNote')

    let headingNote = document.createElement(`h4`)
    headingNote.textContent = inputValue;

    let close = document.createElement('div');
    close.style = "display: flex; align-items: center;";
    close.innerHTML = closeBtnHtml;
    close.onclick = deleteNote;

    let line = document.createElement(`hr`);
    line.classList.add('line');

    let textArea = document.createElement('textarea');
    textArea.classList.add('inputNote');
    textArea.cols = 30;
    textArea.rows = 10;

    noteBox.appendChild(topNote);
    topNote.appendChild(headingNote);
    topNote.appendChild(close);
    noteBox.appendChild(line);
    noteBox.appendChild(textArea);

    let notesPlate = document.getElementsByClassName('notesPlate').item(0);
    
    document.getElementById("inputNoteName").value = "";
    notesPlate.appendChild(noteBox);
}

function pressEnter(e){
    if(e.key == 'Enter') createNewNote();
}

function deleteNote(e){
    e.target.parentNode.parentNode.parentNode.parentNode.remove();
}