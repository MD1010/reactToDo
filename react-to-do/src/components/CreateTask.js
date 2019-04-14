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
                content: "",
                owner: "",
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
            input: 'textarea',
            inputPlaceholder: 'Type your message here...',
            showCancelButton: true,
            position: "center",
            heightAuto: false,
            
        }).then((result) => {
            if (result.value) {
                this.setState({ content: result.value, owner: "Misha", date: new Date() })
                this.props.createTask(this.state)
                this.makeConfirmationSwal(result)
            }
        }).then(()=>{
            console.log("after add..", this.props.tasks)
        })

    }


    makeConfirmationSwal = () => {
        Swal.fire({
            heightAuto: false,
            type: 'success',
            text: "Your task was successfuly added!",
            toast: true,
            position: "top-right",
            timer: 2000,
            showConfirmButton:false, 
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

const mapStateToProps = (state) => {
    return {
        tasks: state.task.tasks
    }
}

export default connect(mapStateToProps, mapDispachToProps)(CreateTask)