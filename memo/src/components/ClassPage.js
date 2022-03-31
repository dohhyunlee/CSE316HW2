import React from "react";
import Timer from "./Timer";
import TodoApp from "./TodoApp";


class ClassPage extends React.Component {
    render() {
        return (
            <div>
                On Class Page:
                <h3>My Timer:</h3>
                <Timer />
                <h3>My Todo App:</h3>
                <TodoApp />
            </div>
        )
    }
}

export default ClassPage;