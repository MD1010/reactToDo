import React, { Component } from 'react'
import $ from 'jquery'

class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                title: "",
                content: ""
            }
    }
    componentDidMount() {
        $("#title").focus();
    }

    submitForm = (event) => {
        event.preventDefault()
    }

    handleChange = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value })
    }

    render() {
        return (
            <div className="bgForm">
                <div className="container">
                    <input className="title field" id="title" spellCheck="false" autoComplete="off" placeholder="title" type="text" value={this.state.title} onChange={this.handleChange} maxLength="40"></input>
                    <input className="content field" spellCheck="false" autoComplete="off" placeholder="content" type="text" id="content" value={this.state.content} onChange={this.handleChange}></input>
                    <button type="submit" id="add-button" >Add task</button>
                </div>
            </div>
        )
    }
}

export default CreateTask 
