import React, {useState} from "react";
import {useRef} from "react";
import Tag from './components/Tag';
import './app.css';



function App() {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const ModalOff = (e) => {
        const clicked = e.target.closest('.modal-content');
        if (clicked) return;
        else {
            setModalOpen(false);
        }
    };

    const inputRef = useRef(null);
    const modalRef = useRef(null);

    let empty = false;

    const getTime = () => {
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
        return month + "/" + day + "/" + year + ",    " + hours + ':' + minzero + minutes + ':' + seczero + seconds + ampm;
    };

    const firstn = {
        id : 0,
        text : "CSE316",
        date : getTime(),
        exist : 1,
        tags: []
    };
    const secondn = {
        id : 1,
        text : "Another wrapping line example",
        date : getTime(),
        exist : 1,
        tags: []
    };
    const thirdn = {
        id : 2,
        text : "This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.\n\nYou can press enter to add new lines as well.",
        date : getTime(),
        exist : 1,
        tags: []
    };

    const initArray = [firstn,secondn,thirdn];

    const [noteID, setnoteID] = useState(3);

    const [noteArray, setNoteArray] = useState(initArray);

    const [currentNote, setcurrentNote] = useState(thirdn);

    const [input, setInput] = useState(currentNote.text);

    const [date, setDate] = useState(new Date());

    const getNote = () => {

    }

    const deleteNote = () => {
        currentNote.text = "";
        currentNote.exist = 0;
        setNoteArray(noteArray.filter(note => note.id !== currentNote.id));
        setcurrentNote(noteArray[noteArray.length-1]);
        inputRef.current.value = currentNote.text;
    }

    const getFirstline = (note) =>{
        let text = note.text;
        let lines = text.split("\n");
        return lines[0];
    }

    const insertNote = () => {
        setnoteID(noteID+1);
        const newNote = {
            id : noteID,
            text : "New Note",
            date : getTime(),
            exist : 1,
            tags: []
        }
        setcurrentNote(newNote);
        setNoteArray(noteArray.concat(newNote));
        inputRef.current.value = "";
    }

    const update = () => {
        currentNote.text = inputRef.current.value;
        currentNote.date = getTime();
    }

    return (
        <div>
        <div className="rows">
            <div className="row">
                <div className='logo'>
                    <img src="./simpson.jpg" className="profile"
                         onClick={openModal} alt="MyImage"></img>
                    <div className="title">My Notes</div>
                    <span className="material-icons" id="noteadd" onClick={insertNote}
                          style={{float:'right', top:'6px'}}>note_add</span>
                </div>
                <div className="main">
                    <span className="material-icons" style={{left:"20px"}}>notification_add</span>
                    <span className="material-icons" style={{left:"45%"}}>person_add_alt</span>
                    <span className="material-icons" onClick={deleteNote}
                          style={{float:"right"}}>delete_outline</span>
                </div>
                <div className="main2">
                        <span className="material-icons" onClick="document.getElementById('id01').style.display='block'"
                              style={{left:"20px"}}>arrow_back</span>
                    <span className="material-icons" style={{left:"25%"}}>notification_add</span>
                    <span className="material-icons" style={{left:"55%"}}>person_add_alt</span>
                    <span className="material-icons" onClick={deleteNote}
                          style={{float:"right"}}>delete_outline</span>
                </div>
            </div>
            <div className="row2">
                <div className="sidebar">
                    <div className="searchbar">
                        <span className="material-icons" style={{left:"20px"}}>search</span>
                        <input className="notesearch" type="search" placeholder="Search all notes"></input>
                    </div>
                    <div className="noteList">
                        {noteArray.map((note) => (
                            <div className={`listed ${currentNote === note && "on"}`} onClick={() => {inputRef.current.value = note.text;setcurrentNote(note) }}>
                                <div className="note">{getFirstline(note)}
                                    <div className="curdate">{note.date}</div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="text">
                    <textarea className="textfield" ref={inputRef} onKeyUp={update}
                              style={{height:"100%", width:"100%",border:"none", resize: "none"}}></textarea>
                    <Tag className="tagfield" note={currentNote}
                         />
                </div>
            </div>
        </div>
            <div id="id01" className={modalOpen ? 'modal' : 'closemodal'} onClick={(e) => ModalOff(e)}>
                <form className="modal-content" action="" ref={modalRef}>
                    <div className="container">
                        <div className="editp">
                            <h2 style={{marginTop : '5px', marginBottom: '40px'}}>Edit Profile</h2>
                            <span onClick={closeModal} className="close"
                                  title="Close Modal">&times;</span>
                        </div>
                        <div className="prof">
                            <img src="simpson.jpg" className="profile" style={{marginLeft:"30px"}} alt="MyImage"/>
                            <div className="newimg">Add new image</div>
                            <div className="removeimg">Remove image</div>
                        </div>
                        <label htmlFor="name"><b>Name</b></label>
                        <input type="text" value="Dohhyun" placeholder="Enter Name" name="name" required/>

                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" value="dohhyun.lee@stonybrook.edu" placeholder="Enter Email" name="email"
                               required/>

                        <label htmlFor="psw-repeat"><b>Color Scheme</b></label>
                        <select className="select">
                            <option>Light</option>
                            <option>Dark</option>
                        </select>

                        <div className="clearfix">
                            <button type="submit" className="savebtn">Save</button>
                            <div className="logout">Logout</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;