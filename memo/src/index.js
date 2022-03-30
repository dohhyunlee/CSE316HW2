import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import './main.js';

class Head extends React.Component {
    render() {
        return (
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="app.css" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet"></link>
                    <title>Notes</title>
        </head>
        );
    }
}

class Body extends React.Component {
    render() {
        const update = update();
        const deletenote = deletenote();
        const insertNote = insertNote();
        return (
            <div className="rows">
                <div className="row">
                    <div className='logo'>
                        <img src="./simpson.jpg" className="profile"
                             onClick="document.getElementById('id01').style.display='block'" alt="MyImage"></img>
                            <div className="title">My Notes</div>
                            <span className="material-icons" id="noteadd" onClick={insertNote}
                                  style={{float:'right', top:'6px'}}>note_add</span>
                    </div>
                    <div className="main">
                        <span className="material-icons" style={{left:"20px"}}>notification_add</span>
                        <span className="material-icons" style={{left:"45%"}}>person_add_alt</span>
                        <span className="material-icons" onClick={deletenote}
                              style={{float:"right"}}>delete_outline</span>
                    </div>
                    <div className="main2">
                        <span className="material-icons" onClick="document.getElementById('id01').style.display='block'"
                              style={{left:"20px"}}>arrow_back</span>
                        <span className="material-icons" style={{left:"25%"}}>notification_add</span>
                        <span className="material-icons" style={{left:"55%"}}>person_add_alt</span>
                        <span className="material-icons" onClick="deletenote()"
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
                            <div id="listed">
                                <div className="note" id="note2" onClick="getnote(this.id)">This is a note with a long
                                    line of text. Notice that the text will automatically wrap to the next line once it
                                    reaches the right side of the screen.
                                    <div className="curdate" id="date2">3/14/2022, 2:24:25 AM</div>
                                </div>
                                <div className="note" id="note1" onClick="getnote(this.id)">Another wrapping line
                                    example
                                    <div className="curdate" id="date1">3/14/2022, 1:17:04 AM</div>
                                </div>
                                <div className="note" id="note0" onClick="getnote(this.id)">CSE316
                                    <div className="curdate" id="date0">3/13/2022, 11:54:13 AM</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="text">
                        <textarea id="textfield" onKeyUp={update}
                                  style={{height:"99%", width:"99%", border:"none", resize: "none"}}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Head />
                </div>
                <div className="game-info">
                    <Body />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
