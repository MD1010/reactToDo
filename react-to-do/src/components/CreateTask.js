import React, { Component } from 'react'
import { addToDo } from '../store/Actions/taskActions'
import { connect } from 'react-redux'
import $ from 'jquery'
import Swal from 'sweetalert2'
import '../styles/swals.css'


class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                content: ""
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
        this.props.createTask(this.state)
    }

    openNewTaskSwal = () => {
        Swal.fire({
            input: 'textarea',
            inputPlaceholder: 'Type your message here...',
            showCancelButton: true,
            position: "center",
            heightAuto: false,
        }).then((result) => {
            if (result.value){
                this.makeConfirmationSwal(result)
                this.setState({content:result.value})
            }
        })

    }


    makeConfirmationSwal = (result) => {
        Swal.fire({
            heightAuto: false,
            type: 'success',
            text: result.value + " was added successfuly"

        });
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
