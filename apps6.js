class Note {
    constructor(title, para, date, time){
        this.title = title,
        this.para = para,
        this.date = date,
        this.time = time
    }
}

class UI {
    
        addNotetotheList(note){
            const noteSection = document.getElementById('notes'),
                  noteDiv = document.createElement('DIV');
                  noteDiv.className = "note fade-in";
                  noteDiv.innerHTML = `
                  <div class="tt">
                  <div class="tt1">
                      <img src="https://img.icons8.com/pastel-glyph/64/000000/time.png"/>
                  </div>
                  <div class="tt2">
                      <span class="date">${note.date}</span>
                      <span class="time">${note.time}</span>
                  </div>
              </div>
                    <h1>${note.title}</h1>
                    <p>${note.para}</p>
                    <button class="d-btn">Delete Note</button>
                    `
                  noteSection.appendChild(noteDiv);
                  noteSection.scrollIntoView();

        }

        clearFields(noteTitle, notePara){
            document.getElementById('h-input').value = "";
            document.getElementById('g-minput').value = "";
        }

        showAlert(message, cls){

            const formUI = document.getElementById('m-form'),
                  insBtn = document.getElementById('g-btn'),
                  alert = document.createElement('P'),
                  alertText = document.createTextNode(message);
                  alert.className = `alert ${cls} fade-in`;
                  alert.appendChild(alertText);
                  formUI.insertBefore(alert, insBtn)

                  setTimeout(function(){
                    alert.className = `alert ${cls} fade-out`;
                    
                    setTimeout(function(){
                        document.querySelector('.alert').remove();
                    }, 500)

                  }, 1000)
        }
        
        deleteNote(target){
            
            if(target.className === 'd-btn'){
                target.parentElement.remove();

                const ui = new UI()
                // Show Alert
                ui.showAlert('Note Deleted', 'info')
            }


        }
}

    class Store{

        static getNotes(){
            var  notes;
            if(localStorage.getItem('notes') === null){
                notes = [];
            } else{
                notes = JSON.parse(localStorage.getItem('notes'));
            };

            return notes;
        }

        static displayNote(){
            const notes = Store.getNotes();
            console.log(notes);
            notes.forEach(function(note){
                const ui = new UI;
                ui.addNotetotheList(note);
            })
        }

        static addNote(note){
            const notes = Store.getNotes();
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
        }

        // static removeNote(){

        // }

    }

    // DomContentLoad Event for LS
    document.addEventListener('DOMContentLoaded', Store.displayNote);


    // Listen for Submit Event
    document.getElementById('m-form').addEventListener('submit', function(e){
        
    const noteTitle = document.getElementById('h-input').value,
          notePara = document.getElementById('g-minput').value;

        //   Date and time
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var time = hours + ':' + minutes + ' ' + ampm;
                

        // Note Object Created
        const note = new Note(noteTitle, notePara, date, time);
        
        // Initiating UI
        const ui = new UI();
        
        // Validate
        if(noteTitle === '' || notePara === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {

        // Add book to list
        ui.addNotetotheList(note);

        // Add to LS
        Store.addNote(note);

        // Clear fields
        ui.clearFields(noteTitle, notePara);

        // Show success
        ui.showAlert('Book Added!', 'success');

        
  
  }

    e.preventDefault();
});

    // Delete Note
    document.querySelector('#notes').addEventListener('click', function(e){
        const ui = new UI();
        
        // Delete Note
        ui.deleteNote(e.target);


    })

    