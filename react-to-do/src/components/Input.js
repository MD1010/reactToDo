import React from 'react'
const Input = ({handleKeyPress,textarea,handleTyping}) =>
{
    return(
        <input className="textarea" onKeyPress={handleKeyPress} autoFocus value={textarea} onChange={handleTyping}/>
    );
}
export default Input;


