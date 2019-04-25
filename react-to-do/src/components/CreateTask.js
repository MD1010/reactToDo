import React, { Component } from 'react'
import { addToDo } from '../store/Actions/taskActions'
import { connect } from 'react-redux'
import $ from 'jquery'
import Swal from 'sweetalert2'
import '../styles/swals.css'
import { makeConfirmationSwal } from '../helpers/swalFunctions'

class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                ownerFirstName: "",
                ownerLastName: "",
                content: "",
                date: ""
            }
    }
    componentDidMount() {
        $("#content").focus();
    }


    handleChange = (event) => {
        let { id, value } = event.target;
        this.setState({ [id]: value })
    }

    createNewTask = (event) => {
        event.preventDefault()
        this.openNewTaskSwal()
    }

    openNewTaskSwal = () => {
        Swal.fire({
            title: "Write your task here..",
            input: 'text',
            inputPlaceholder: 'Type your message here...',
            showCancelButton: true,
            position: "center",
            heightAuto: false,

        }).then((result) => {

            if (result.value) {
                this.setState({
                    ownerFirstName: "Michael",
                    ownerLastName: "Deglin",
                    content: result.value,
                    date: new Date().toDateString()
                })
                this.props.createTask(this.state)
                makeConfirmationSwal(result)
            }
        })

    }


    render() {
        return (
            <button onClick={this.createNewTask} className="btn-floating btn-large waves-effect waves-light blue right"><i className="material-icons">add</i></button>
        )
    }
}

const mapDispachToProps = (dispach) => {
    return {
        createTask: (todo) => { dispach(addToDo(todo)) }
    }
}

export default connect(null, mapDispachToProps)(CreateTask)
