import React, { Component } from 'react';
import Tasks from './components/Tasks';
import Title from './components/Title';
import Input from './components/Input';
import SubmitButton from './components/SubmitButton';
import ShowMoreLess from './components/ShowMoreLess';
import {findElement, deleteData, postData, putData, getData} from './helpers/utils';

import swal from 'sweetalert';
import { missionsURL } from './helpers/consts';

class App extends Component 
{
    constructor(props)
    {
      super(props);
      this.state = 
      {
        todos:[], textarea: '',  
        limitMissionsToDisplay:undefined, startIndexMission: 0,
        loading:false
      }
      
  }
 componentWillMount(){
  this.setState({loading:true})
 }
  componentDidMount() {
      getData(missionsURL)
      .then(todos => { setTimeout(()=>{this.setState({todos,  loading: false})},0);
    })
  }
  
  setMaxAmmountOfMissions = (limitMissionsToDisplay)=>{
    this.setState({limitMissionsToDisplay})
  }
  deleteItem = (id) => 
  {
      deleteData(missionsURL, id)
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
    let newData = {content: value}
    if(this.state.textarea.trim())
    {
      postData(missionsURL, newData)
      .then((responseFromServer) => 
      {
        if(responseFromServer)
        {
          let {todos} = this.state;
          todos.push({_id: responseFromServer._id, content: responseFromServer.content})
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
          if(result.trim())
          {
            putData(missionsURL, id, newItem)
            .then(responseFromServer=>
            {
                if(responseFromServer)
                {
                  todos[foundIDIndex].content = result;
                  this.setState({todos, textarea:''})
                }
            });
          }
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
          <Tasks 
                todos={this.state.todos} 
                deleteItem={this.deleteItem} 
                editItem={this.editItem}
                setMaxAmmountOfMissions={this.setMaxAmmountOfMissions}
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
