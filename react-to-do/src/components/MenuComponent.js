import React, { Component } from 'react';

class MenuComponent extends Component
{
    render(){
       return (
        <div className="row">
            <div className="card">
                <div className="card-acion center">
                        <h3>
                            Login
                        </h3>
                </div>

                <div className="card-content">
                    <div className="form-field">
                        <label for="userName">UserName</label>
                        <input type="text" id="userName"></input>
                    </div>
                    <br/>

                    <div className="form-field">
                        <label for="password">Password</label>
                        <input type="password" id="password"></input>
                    </div>
                    <br/>

                    <div className="form-field">
                        <input type="checkBox" id="remember"/>
                        <label for="remember">Remember Me</label>
                    </div>
                    <br/>
                    
                    
                    <div className="form-field">
                        <button className="btn-large waves-effect waves-dark" type="submit" id="submit">SIGN IN</button>
                    </div>
                    <br/>

                </div>
            </div>
        </div>
                
       )
    }
}

export default MenuComponent