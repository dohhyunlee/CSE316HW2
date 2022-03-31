import React from "react"

class Show extends React.Component {
    render() {
        return (
            <div>
                <p><b>{this.props.title}</b><br/>
                Language: {this.props.language}<br/>
                Learn more: {this.props.url}</p>
            </div>
        );
    }
}

export default Show;