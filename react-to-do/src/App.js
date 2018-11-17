import React, { Component } from 'react';
import Tasks from './components/Tasks';
import {makeHeaders,findElement} from './helperFunctions';
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
  fetch('http://localhost:4000/missions')
  .then(responseFromServer => responseFromServer.json())
  .then(responseFromServer => 
  {
    this.setState({
     todos : responseFromServer
    })
  })
}
  deleteItem = (id) => 
  {
      let header = makeHeaders('DELETE');
      let myRequest = new Request('http://localhost:4000/missions/' + id, header);
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
        let myRequest = new Request('http://localhost:4000/missions', header);
        fetch(myRequest)
        .then((newRocordAdded)=>  
        {
            newRocordAdded.json().then((responseFromServer)=>{
            if(responseFromServer)
            {
              this.state.todos.push({_id: responseFromServer._id, content: responseFromServer.content})
              console.log(this.state.todos);
              this.setState({textarea:''})
            }
            });
        })
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
        const todos = this.state.todos; 
        let newItem = {content:result}; 
        let foundIDIndex = findElement(todos, id);
        let header = makeHeaders('PUT', newItem);
        let myRequest = new Request('http://localhost:4000/missions/' + id, header);
        fetch(myRequest)
        .then((newRocordAdded)=>  
        {
            newRocordAdded.json().then((responseFromServer)=>
            {
              if(responseFromServer)
              {
                todos[foundIDIndex].content = result;
                this.setState({todos});
                this.setState({textarea:''})
              }
  
            });
        })
      });
  }
  handelTyping = (event) => 
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
        <h1 className="center title">To Do List</h1>
        <input className="textarea" onKeyPress={this.handleKeyPress} autoFocus value={this.state.textarea} onChange={this.handelTyping}/>
        
        <div className="center-align">
          <br></br>
          <button className="btn waves-effect blue" type="submit" onClick={()=>this.addItem(this.state.textarea)}>
              <b>Add a mission</b>
          </button>
          </div>
        <br></br><br></br>
        <Tasks todos= {this.state.todos} 
              deleteItem={this.deleteItem} 
              editItem={this.editItem}/>
      </div>
    );
  }
}

export default App;
