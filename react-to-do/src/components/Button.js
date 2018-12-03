import React from 'react'
const Button = ({textarea,addItem}) =>
{
    return(
        <div className="center-align">
        <button className="btn" type="submit" onClick={()=>addItem(textarea)}>
            <b>Add a mission</b>
        </button>
        </div>
    );
}
export default Button;



