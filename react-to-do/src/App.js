import React, { Component } from 'react';
import Tasks from './Tasks';
import swal from 'sweetalert';
// import $ from 'jquery';

class App extends Component {

  state =
  {
    todos:[
     {"id":1, content:"first task"}
    ]
  }
  deleteItem = (id) => 
  {
      const todos = this.state.todos.filter(todo =>{
       return todo.id !== id;
      });
      
      this.setState({
        todos 
      })
  }

  
  addItem = () =>
  {
    let newItem = document.getElementById('textarea').value;
    const todos = this.state.todos;
    if(newItem) 
    {
      console.log("value",newItem)
      todos.push({id:todos.length+1,content:newItem});
      this.setState({todos});
      document.getElementById('textarea').value = '';
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
          todos[id-1].content = result;
          this.setState({todos});
          
      });
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.addItem(); 
    }
  }
  render() {
    return (
      <div className="App container">
        <h1 className="center title">To Do List</h1>
        <input id="textarea" onKeyPress={this.handleKeyPress}/>
        <br></br><br></br>
        <div className="center-align">
          <br></br>
          <button className="btn waves-effect blue" type="submit" onClick={this.addItem}>
              <b>Add a mission</b>
          </button>
        </div>
        <br></br><br></br>
        <Tasks todos= {this.state.todos} deleteItem={this.deleteItem} addItem={this.addItem}
        editItem={this.editItem}/>
      </div>
    );
  }
}

export default App;
