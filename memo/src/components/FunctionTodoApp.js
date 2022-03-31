import React, {useState} from 'react';


function FunctionTodoApp() {

    const [text, setText] = useState('');
    const [items, setItems] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.length === 0) {
            return;
        }
        const newItem = {
            text: text,
            id: Date.now()
        };

        setItems(items.concat(newItem));
        setText('');
    }

    const handleChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div>
            <h3>TODO</h3>
            <FunctionTodoList items={items}/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-todo">
                    What needs to be done?
                </label>
                <input
                    id="new-todo"
                    onChange={handleChange}
                    value={text}
                />
                <button>
                    Add #{items.length + 1}
                </button>
            </form>
        </div>
    );
}

function FunctionTodoList(props) {
    return (
        <ul>
            {props.items.map(item => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    );
}

export default FunctionTodoApp;