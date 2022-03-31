import React from "react";


// This example was taken from https://reactjs.org/docs/forms.html - Read more there
// A 3rd party library for making it easier to work with forms is: https://react-hook-form.com/
class FormExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // Try uncommenting this line – notice the form's value is controlled in the render by the state
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        // Prevent default will prevent the default form submission behavior from HTML
        // Normally here you do your own handling either locally, or making a separate API call to send the
        // data to your server.
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default FormExample;