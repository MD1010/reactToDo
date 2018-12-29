import React from 'react'


const ShowMoreLess = ({limitMissionsToDisplay, startIndexMission, todos, loadMore, loadLess})=>
{
    console.log('start',startIndexMission);
    let forwards = <i onClick={loadMore} className="forwards small material-icons right">arrow_forward</i>;
    let backwards = <i onClick={loadLess} className="backwards small material-icons left">arrow_back</i>
    if (startIndexMission > 0 && todos.length - startIndexMission > limitMissionsToDisplay) return(<div>{forwards}{backwards}</div>);
    if(todos.length - startIndexMission > limitMissionsToDisplay) return(<div>{forwards}</div>);
    if(startIndexMission > 0) return(<div>{backwards}</div>);
    else return null;
}

export default ShowMoreLess;