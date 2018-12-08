import React from 'react'


const ShowMoreLess = ({limitMissionsToDisplay, startIndexMission, todos, loadMore, loadLess})=>
{
    let forwards = <i onClick={loadMore} className="forwards small material-icons right">arrow_forward</i>;
    let backwards = <i onClick={loadLess} className="backwards small material-icons left">arrow_back</i>
    if(startIndexMission < limitMissionsToDisplay) return(<div>{forwards}</div>);
    else if(todos.length - startIndexMission > limitMissionsToDisplay) return(<div>{forwards}{backwards}</div>);
    else return(<div>{backwards}</div>);
}

export default ShowMoreLess;