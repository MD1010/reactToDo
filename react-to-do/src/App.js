import React, { Component } from 'react';

import Tasks from './components/Tasks';
import Title from './components/Title';
import Input from './components/Input';
import Button from './components/Button';

import makeHeaders from './helpers/headers';
import {findElement} from './helpers/utils';
import {missionsURL} from './helpers/consts';

import swal from 'sweetalert';

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      todos:[],
      textarea: ''
    }
  }
  
  componentDidMount()
  {
    fetch(missionsURL)
    .then(responseFromServer => responseFromServer.json())
    .then(todos => 
    {
      this.setState({
      todos
      })
    })
  } 

  deleteItem = (id) => 
  {
      let header = makeHeaders('DELETE');
      let myRequest = new Request(`${missionsURL}/${id}`, header);
      fetch(myRequest)
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
    if(this.state.textarea)
    {
      let newItem = {content:value};
      let header = makeHeaders('POST', newItem);
        let myRequest = new Request(missionsURL, header);
        fetch(myRequest)
        .then((newRocordAdded)=>  newRocordAdded.json())
        .then((responseFromServer) => {
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
        if(result)
        {
          const {todos} = this.state; 
          let newItem = {content:result}; 
          let foundIDIndex = findElement(todos, id);
          let header = makeHeaders('PUT', newItem);
          let myRequest = new Request(missionsURL + `/${id}` , header);
          fetch(myRequest)
          .then((newRocordAdded)=>  
          {
              newRocordAdded.json().then((responseFromServer)=>
              {
                if(responseFromServer)
                {
                  todos[foundIDIndex].content = result;
                  this.setState({todos, textarea:''})
                }
              });
          })
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

  render() {
    return (
      <div className="App container">
        <Title/>
        <Input handleKeyPress={this.handleKeyPress} 
              textarea={this.state.textarea} 
              handleTyping={this.handleTyping}/>
        <Button 
              textarea={this.state.textarea}
              addItem={this.addItem}/>
        <Tasks todos= {this.state.todos} 
              deleteItem={this.deleteItem} 
              editItem={this.editItem}/>
      </div>
    );
  }
}

export default App;
