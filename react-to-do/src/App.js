import React, { Component } from 'react';
import Tasks from './components/Tasks';

// import swal from 'sweetalert';
// import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos:[],
      textarea: ''
    }
  }
componentDidMount()
{
  fetch('http://localhost:4000/missions')
  .then(res => res.json())
  .then(json => 
  {
    this.setState({
     todos : json
    })
  })
}
  deleteItem = (id) => 
  {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      let myInit = {
        method: 'DELETE',
        headers: headers, 
        mode: 'cors',
        cache: 'default'
      };
      let myRequest = new Request('http://localhost:4000/missions/' + id, myInit);
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
    let newItem = {content:value};
    let headers = new Headers();
      headers.append('Content-Type','application/json');
      let myInit = {
        method: 'POST',
        headers: headers, 
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(newItem)
      };
      let myRequest = new Request('http://localhost:4000/missions', myInit);
      fetch(myRequest)
      .then((newRocordAdded)=>  
      {
          newRocordAdded.json().then((data)=>{
          if(data)
          {
            this.state.todos.push({_id: data._id, content: data.content})
            console.log(this.state.todos);
            this.setState({textarea:''})
          }

          });
      })
  } 

  editItem = (id) =>
  {
    // swal(
    //   {
    //       title: "edit your task here:",
    //       content: "input",
    //       closeOnClickOutside: false,
    //       closeOnEsc: false,
    //       buttons: true,
    //   })
    //   .then((result) => 
    //   {   
    //       if(result) {
    //         const todos = this.state.todos;
    //         todos[id-1].content = result;
    //         this.setState({todos});
    //       } 
    //   });
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
