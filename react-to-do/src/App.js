import React, { Component } from 'react';

import Tasks from './components/Tasks';
import Title from './components/Title';
import Input from './components/Input';
import SubmitButton from './components/SubmitButton';
import ShowMoreLess from './components/ShowMoreLess';


import {findElement, deleteTask, addTask, editTask, getTasksFromDB} from './helpers/utils';


import swal from 'sweetalert';
import { missionsURL } from './helpers/consts';

class App extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = { todos:[], textarea: '',  
      limitMissionsToDisplay:4, startIndexMission: 0,
      loading:false
    }
  }
  
  componentDidMount() {
    
    this.setState({loading:true})
      getTasksFromDB(missionsURL)
      .then(todos => { setTimeout(()=>{this.setState({todos,  loading: false})},1500);
      let titleElement = Title.offsetHeighast

      // let inputElement = ReactDOM.findDOMNode(this.refs.input)
      // let submitButtonElement = ReactDOM.findDOMNode(this.refs.submitButton)
      // let tasksElement = ReactDOM.findDOMNode(this.refs.tasks)
      // let showMoreLessElement = ReactDOM.findDOMNode(this.refs.showMoreLess)
      
      
      // let inputHeight = inputElement.clientHeight
      // let submitButtonHeight = submitButtonElement.clientHeight
      // let tasksHeight = tasksElement.clientHeight
      // let showMoreLessHeight = showMoreLessElement.clientHeight

      // let totalHeight = titleHeight +  inputHeight +
      // submitButtonHeight + tasksHeight + showMoreLessHeight
       console.log(titleElement)
    })
  }
  
  deleteItem = (id) => 
  {
      deleteTask(id)
      .then(()=>  
      {
        const todos = this.state.todos.filter(todo =>
        {
          return todo._id !== id;
        });
        this.setState({todos});
      })
  }

  addItem = (value) =>
  {
    if(this.state.textarea.trim())
    {
      addTask(value)
      .then((responseFromServer) => 
      {
        if(responseFromServer)
        {
          let {todos} = this.state;
          todos.push({_id: responseFromServer._id, content: responseFromServer.content})
          console.log(this.state.todos);
          this.setState({todos,textarea:''})
        }
      });
    }
  } 

  editItem = (id) =>
  {
    swal(
      {
          title: "edit your task here:",
          content: "input",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: true,
      })
      .then((result) => 
      { 
        const {todos} = this.state; 
        let newItem = {content:result}; 
        let foundIDIndex = findElement(todos, id);

        if(result)
        {
          editTask(id, newItem)
          .then(responseFromServer=>
          {
              if(responseFromServer)
              {
                todos[foundIDIndex].content = result;
                this.setState({todos, textarea:''})
              }
          });
        }
      }); 
  }

  handleTyping = (event) => 
  {
    this.setState({textarea: event.target.value});
  }

  handleKeyPress = (event) =>
  {
    if(event.key === 'Enter')
    {
      this.addItem(event.target.value); 
    }
  }

  loadMore = () =>
  {
    this.setState({startIndexMission:this.state.startIndexMission + this.state.limitMissionsToDisplay});
  }

  loadLess = () =>
  {
    this.setState({startIndexMission:this.state.startIndexMission - this.state.limitMissionsToDisplay});
  }
 
  
  render() {
    const { loading } = this.state;
    
    if(loading) { 
      return <div className="spinner"></div>; 
    }
      return (
        <div className="App container">
          <Title/>
          <Input handleKeyPress={this.handleKeyPress} 
                textarea={this.state.textarea} 
                handleTyping={this.handleTyping}/>
          <SubmitButton 
                textarea={this.state.textarea}
                addItem={this.addItem}/>
          <Tasks todos= {this.state.todos} 
                deleteItem={this.deleteItem} 
                editItem={this.editItem}
                limitMissionsToDisplay={this.state.limitMissionsToDisplay}
                startIndexMission={this.state.startIndexMission}/>
          <ShowMoreLess limitMissionsToDisplay={this.state.limitMissionsToDisplay}
                startIndexMission={this.state.startIndexMission}
                todos={this.state.todos}
                loadMore={this.loadMore}
                loadLess={this.loadLess}/>
        </div>
      );
    }

  }

export default App;
