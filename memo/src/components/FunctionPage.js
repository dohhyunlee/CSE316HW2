import TimerAsFunction from "./TimerAsFunction";
import FunctionTodoApp from "./FunctionTodoApp";

function FunctionPage() {
    return (
    <div> Function page:
        <h3>My Timer:</h3>
        <TimerAsFunction/>
        <h3>Todo App Using Functions</h3>
        <FunctionTodoApp/>
    </div>
    );
}

export default FunctionPage;