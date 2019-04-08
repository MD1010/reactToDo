import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import '../../react-to-do/src/styles/app.css'
import Navbar from './Layout/Navbar';
import SignUp from './components/Authentication/SignUp'
import SignIn from './components/Authentication/SignIn';
import MyZone from './components/MyZone';

class App extends Component 
{
  render() {
    return(
      <BrowserRouter>
        <div className="App">
          <div className="navBar">
            <Navbar/>
          </div>
            <Switch>
                <Route path='/SignIn' component={SignIn} />
                <Route path='/SignUp' component={SignUp} />
                <Route path='/MyTasks' component={MyZone} />                
                <Redirect from="/" to="/SignIn"/>

            </Switch>
        
         </div>
         
        {/* all components are mapped to / therfore they are all pointing to signIn  */}
      </BrowserRouter>
    )
  }
}
export default App;
