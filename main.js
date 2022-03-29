let modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


let currentNoteID = 2;
let currentNote = `note${currentNoteID}`
let noteID = 2;
let empty = 0;

let noteArray = [];

let firstn = {
    id : 0,
    noteid:"note",
    text : "CSE316",
    date : gettime(),
    exist : 1
}
let secondn = {
    id : 1,
    noteid:`note${this.id}`,
    text : "Another wrapping line example",
    date : gettime(),
    exist : 1
}
let thirdn = {
    id : 2,
    noteid:`note${this.id}`,
    text : "This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.\n\nYou can press enter to add new lines as well.",
    date : gettime(),
    exist : 1
}

noteArray.push(firstn);
noteArray.push(secondn);
noteArray.push(thirdn);

function findID(noteID){
    for(let i=0; i<noteArray.length; i++){
        if(`note${i}` == noteID){
            return i;
        }
    }
    return 0;
}

function getnote(noteID){
    document.getElementById(currentNote).style.background="#ffffff";
    let ID = findID(noteID);
    document.getElementById(noteID).style.background="rgb(229, 241, 253)";
    document.getElementById('textfield').value = noteArray[ID].text;
    currentNoteID = ID;
    currentNote = `note${currentNoteID}`;

}

getnote("note2");

function deletenote(){
    noteArray[currentNoteID].text = "";
    noteArray[currentNoteID].exist = 0;
    document.getElementById(currentNote).style.display="none";
    for(let i=noteArray.length; i>0; i--){
        if(noteArray[i-1].exist==1){
            getnote(`note${i-1}`)
            empty = 0;
            break;
        }
        if(i==1){
            empty = 1;
        }
    }
    if(empty == 1){
        document.getElementById('textfield').value = "";
        document.getElementById('textfield').style.visibility="hidden";
    }
}

function getfirstline(){
    let text = document.getElementById('textfield').value;
    let lines = text.split("\n");
    return lines[0];
}

function gettime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = "";
    let minzero = "";
    let seczero = "";
    if (hours>=12){
        hours -= 12;
        ampm = " PM";
    } else {
        ampm = " AM";
    }
    if (minutes<=10){
        minzero = "0";
    }
    if (seconds<=10){
        seczero = "0";
    }
    return `<div class="curdate" id="date${noteID}">`+ month + "/" + day + "/" + year + ",    " + hours + ':' + minzero + minutes + ':' + seczero + seconds + ampm + `</div>`;
}

function insertNote() {
    if(empty == 1){
        document.getElementById('textfield').style.visibility="visible";
    }
    noteID += 1;
    let newHTML = `<div class="note" id="note${noteID}"  onclick="getnote(this.id)">New Note</div>`;
    let newnote = {
        id : noteID,
        text : "",
        date : gettime(),
        exist : 1
    }
    noteArray.push(newnote);
    let listElement = document.getElementById("listed");
    listElement.insertAdjacentHTML("afterbegin", newHTML);
    document.getElementById(`note${noteID}`).insertAdjacentHTML("beforeend", gettime());
    getnote(`note${noteID}`);

}

function update() {
    noteArray[currentNoteID].text = document.getElementById('textfield').value;
    document.getElementById(`note${currentNoteID}`).innerText = getfirstline();
    document.getElementById(`note${currentNoteID}`).insertAdjacentHTML("beforeend", gettime());
}