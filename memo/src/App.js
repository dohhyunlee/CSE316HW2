import React, {useState} from "react";
import {useEffect} from "react";
import {useRef} from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import './app.css';


function App() {

    useEffect(()=>{
        let localArr = localStorage.getItem('localNotes');
        let localID = localStorage.getItem('localID');
        let localProfile = localStorage.getItem('localProfile')
        localArr = JSON.parse(localArr);
        localID = JSON.parse(localID);
        localProfile = JSON.parse(localProfile);
        setNoteArray(localArr);
        setnoteID(localID);
        if(localProfile !== null){
            console.log("localProfile")
            console.log(localProfile)
            setProfile(localProfile);
            setName(localProfile[0]);
            setEmail(localProfile[1]);
            setSelected(localProfile[2]);
            selectRef.current.value = localProfile[2];
        } else{
            setName("Dohhyun");
            setEmail("dohhyun.lee@stonybrook.edu");
            setSelected("2");
            setProfile(["Dohhyun","dohhyun.lee@stonybrook.edu","2"]);
        }
        if (localArr.length !== 0){
            setcurrentNote(localArr[localArr.length-1]);
            setInput(localArr[localArr.length-1].text);
            setCurtag(localArr[localArr.length-1].tags);
            } else{
            setlistEmpty(true);
        }
        },
        []
    )


    const saveLocal = (ar) => {
        localStorage.setItem('localNotes',JSON.stringify(ar));
        localStorage.setItem('localID',JSON.stringify(noteID));
    }

    const [listEmpty, setlistEmpty] = useState(false);
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
        tags: []
    };
    const secondn = {
        id : 1,
        text : "Another wrapping line example",
        date : getTime(),
        tags: []
    };
    const thirdn = {
        id : 2,
        text : "This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.\n\nYou can press enter to add new lines as well.",
        date : getTime(),
        tags: []
    };

    const initArray = [firstn,secondn,thirdn];

    const [noteID, setnoteID] = useState(3);

    const [noteArray, setNoteArray] = useState(initArray);

    const [currentNote, setcurrentNote] = useState(thirdn);

    const [input, setInput] = useState("");

    const [curtag, setCurtag] = useState([]);

    const textRef = useRef(null);

    const deleteNote = () => {
        const newArray = noteArray.filter(note => note.id !== currentNote.id)
        setNoteArray(newArray);
        if(newArray.length === 0){
            setlistEmpty(true);
            setCurtag([]);
            textRef.current.style.display = "none";
        } else {
            const newCurnote = newArray[newArray.length-1];
            setcurrentNote(newCurnote);
            setInput(newCurnote.text);
            setCurtag(newCurnote.tags);
        }
        saveLocal(newArray);
    }

    const getFirstline = (note) =>{
        let text = note.text;
        let lines = text.split("\n");
        return lines[0];
    }

    const insertNote = () => {
        if(listEmpty===true){
            textRef.current.style.display = "flex";
            setlistEmpty(false);
        }
        setnoteID(noteID+1);
        const newNote = {
            id : noteID,
            text : "New Note",
            date : getTime(),
            tags: []
        }
        setcurrentNote(newNote);
        const newArray = noteArray.concat(newNote);
        setNoteArray(newArray);
        setInput("New Note");
        setCurtag(newNote.tags);
        saveLocal(newArray);
    }

    const update = () => {
        currentNote.text = input;
        currentNote.date = getTime();
        saveLocal(noteArray);
    }


    const [name, setName] = useState("Dohhyun");
    const [email, setEmail] = useState("dohhyun.lee@stonybrook.edu");
    const [selected, setSelected] = useState("1")
    const [, setProfile] = useState([name,email,selected]);

    const selectRef = useRef(null);

    const handleChangeSelect = (e) => {
        setSelected(e.target.value);
    };

    const saveProfile = () => {
        setProfile([name,email,selected]);
        localStorage.setItem('localProfile',JSON.stringify([name,email,selected]));
    }

    const [, setTags] = useState([]);

    const handleDelete = (i) => {
        currentNote.tags = currentNote.tags.filter((tag, index) => index !== i);
        setTags(currentNote.tags);
        saveLocal(noteArray);
    };

    const handleAddition = (tag) => {
        currentNote.tags.push(tag);
        setTags(tag);
        saveLocal(noteArray);
    };

    const handleDrag = (tag, currPos, newPos) => {
        currentNote.tags.splice(currPos, 1);
        currentNote.tags.splice(newPos, 0, tag);
        setTags([tag, ...currentNote.tags]);
        saveLocal(noteArray);
    };

    const onTagUpdate = (i, newTag) => {
        currentNote.tags.splice(i, 1, newTag);
        setTags(currentNote.tags);
        saveLocal(noteArray);
    };

    const [sidebar, setSidebar] = useState(false);
    const [text, setText] = useState(true);

    const backButton = () => {
        setSidebar(true);
        setText(false);
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
                <div className={sidebar ? 'logo2T' : 'logo2'}>
                    <img src="./simpson.jpg" className="profile"
                         onClick={openModal} alt="MyImage"></img>
                    <div className="title" style={{margin:"0 150px 0 0"}} >My Notes</div>
                    <span className="material-icons" id="noteadd" onClick={insertNote}
                          style={{float:'right', top:'6px'}}>note_add</span>
                </div>
                <div className="main">
                    <span className="material-icons" style={{left:"20px"}}>notification_add</span>
                    <span className="material-icons" style={{left:"45%"}}>person_add_alt</span>
                    <span className="material-icons" onClick={deleteNote}
                          style={{float:"right"}}>delete_outline</span>
                </div>
                <div className={sidebar ? 'main2T' : 'main2'}>
                        <span className="material-icons" onClick={backButton}
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
                    <div className={listEmpty ? 'emptyList' : 'noteList'}>
                        {noteArray.map((note) => (
                            <div className={`listed ${currentNote === note && "on"}`} onClick={() => {setSidebar(false);setText(true);setInput(note.text); setcurrentNote(note); setCurtag(note.tags)}}>
                                <div className="note">{getFirstline(note)}
                                    <div className="curdate">{note.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={sidebar ? 'sidebar2T' : 'sidebar2'}>
                    <div className="searchbar">
                        <span className="material-icons" style={{left:"20px"}}>search</span>
                        <input className="notesearch" type="search" placeholder="Search all notes"></input>
                    </div>
                    <div className={listEmpty ? 'emptyList' : 'noteList'}>
                        {noteArray.map((note) => (
                            <div className={`listed ${currentNote === note && "on"}`} onClick={() => {setSidebar(false);setText(true);setInput(note.text); setcurrentNote(note); setCurtag(note.tags)}}>
                                <div className="note">{getFirstline(note)}
                                    <div className="curdate">{note.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={text ? 'text' : 'textF'} ref={textRef}>
                    <textarea className="textfield" onKeyUp={update} value={input} onChange={e => setInput(e.target.value)}
                              style={{height:"100%", width:"100%",border:"none", resize: "none"}}></textarea>
                    <div className="tagDiv">
                        <ReactTags
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            onTagUpdate={onTagUpdate}
                            placeholder="Enter a tag"
                            autofocus={false}
                            allowDeleteFromEmptyInput={true}
                            autocomplete={true}
                            readOnly={false}
                            allowUnique={true}
                            allowDragDrop={true}
                            inline={true}
                            allowAdditionFromPaste={true}
                            editable={true}
                            tags={curtag}/>
                    </div>
                </div>
            </div>
        </div>
            <div id="id01" className={modalOpen ? 'modal' : 'closemodal'} onClick={(e) => ModalOff(e)}>
                <form className="modal-content" action="">
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
                        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" name="name" required/>

                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" name="email"
                               required/>

                        <label htmlFor="color"><b>Color Scheme</b></label>
                        <select className="select" onChange={handleChangeSelect} ref={selectRef}>
                            <option value="1">Light</option>
                            <option value="2">Dark</option>
                        </select>

                        <div className="clearfix">
                            <button className="savebtn" onClick={saveProfile}>Save</button>
                            <div className="logout">Logout</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;