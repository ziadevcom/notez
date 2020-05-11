
let formContainer = document.getElementById('note-input');
let formUI = document.getElementById('m-form');

let noteValue = document.getElementById('g-minput');
let noteheadingInput = document.getElementById('h-input');
let submitForm = formUI.addEventListener('submit', noteAdded);

let notesUI = document.getElementById('notes');

let newNoteAbs = document.querySelector('.btn-abs');
let mContainer = document.querySelector('.input-wrapper');


function noteAdded(e){
    console.log('Form Submitted');


    
    let noteValueSubmitted = noteValue.value;
    console.log(noteValueSubmitted);

    let noteheadingInputSubmitted = noteheadingInput.value;
    console.log(noteheadingInputSubmitted);

    let yourNotesUI = document.querySelector('.your-notes');
    yourNotesUI.style.display = "block";

    let noteDiv = document.createElement('DIV');
    noteDiv.className = "note";

    let noteHeading = document.createElement('H1')
    noteHeading.innerHTML = noteheadingInputSubmitted.toUpperCase();
    noteDiv.appendChild(noteHeading);
    
    let notePara = document.createElement('P')
    notePara.innerHTML = noteValueSubmitted;
    noteDiv.appendChild(notePara);
    
    let deleteNote = document.createElement('BUTTON')
    deleteNote.className = "d-btn";
    deleteNote.innerHTML = "Delete Note";
    noteDiv.appendChild(deleteNote);

    noteDiv.classList.add("fade-in");
    notesUI.appendChild(noteDiv);

    // Delete Note
    deleteNote.addEventListener('click', removeNote)
    // Delete Note End

    noteheadingInput.value = "";
    noteValue.value = "";
    
    noteheadingInput.placeholder = "Enter New Note's Heading";
    noteValue.placeholder = "Enter New Note";
    e.preventDefault();

    formContainer.classList.add('scale-down');

    formContainer.addEventListener('transitionend', function(){
        formContainer.remove();

        newNoteAbs.style.display = "flex";

    })

    newNoteAbs.addEventListener('click', function(){
        mContainer.appendChild(formContainer);
        formContainer.classList.remove("scale-down");
        newNoteAbs.style.display = "none";
    })

}

    function removeNote(e){
        e.target.parentElement.remove();
        
        if(notesUI.children.length === 0){
            window.location.reload();
        }
    }

    console.log(notesUI.children.length)
    
    