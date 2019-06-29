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
                ownerID:"",
                content: "",
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
            let { auth } = this.props
            if (result.value) {
                this.setState({
                    ownerID: auth.uid,
                    content: result.value,
                    
                })
                this.props.createTask(this.state)
                makeConfirmationSwal(result)
            }
        })

    }

    render() {
        let { tasks } = this.props
        return (
            <button onClick={this.createNewTask} className={tasks == null ? "hide" : "plusIcon btn-floating btn-large waves-effect waves-light right"}><i className="material-icons">add</i></button>
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
        tasks: state.firestore.ordered.tasks,
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispachToProps)(CreateTask)
