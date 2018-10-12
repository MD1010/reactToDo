import React, { Component } from 'react';
import Tasks from './Tasks';

class App extends Component {

  state =
  {
    todos:[
      {id:1 , content:"but milk"},
      {id:2 ,content:"make the react app to work"}
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
    todos.push({id:todos.length+1,content:newItem});
    this.setState({todos});
    document.getElementById('textarea').value = '';
  } 

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.addItem(); 
    }
  }
  render() {
    return (
      <div className="App container">
        <h1 className="center cyan-text">To Do List</h1>
        <textarea id="textarea" className="materialize-textarea" onKeyPress={this.handleKeyPress}></textarea>
        <br></br><br></br>
        <div className="center-align">
          <button className="btn waves-effect waves-light" type="submit" onClick={this.addItem}>
            <i className="material-icons">Add a mission</i>
          </button>
        </div>
        <br></br><br></br><br></br><br></br>
        <Tasks todos= {this.state.todos} deleteItem={this.deleteItem} addItem={this.addItem}/>
      </div>
    );
  }
}

export default App;
