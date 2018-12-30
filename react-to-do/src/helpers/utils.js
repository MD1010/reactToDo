import {missionsURL} from './consts'
import makeHeaders from './headers';

function findElement(array,id)
{
    let foundIDIndex = array.indexOf(array.find(element => 
    {
        return element._id === id;
    }));

    return foundIDIndex;
}

function getTasks()
{
    return fetch(missionsURL)
        .then(response => response.json());
}

function deleteTask(taskId)
{
    let header = makeHeaders('DELETE');
    let myRequest = new Request(`${missionsURL}/${taskId}`, header);
    return fetch(myRequest)
        .then(response => response.json());
}

function addTask(value){

    let newItem = {content:value};
    let header = makeHeaders('POST', newItem);
    let myRequest = new Request(missionsURL, header);
    return fetch(myRequest)
    .then((newRecordAdded)=>  newRecordAdded.json())
}

function editTask(taskId, newItem){
   
    let header = makeHeaders('PUT', newItem);
    let myRequest = new Request(missionsURL + `/${taskId}` , header);
    return fetch(myRequest)
    .then((newRecordAdded)=>  newRecordAdded.json())
    
}

export {findElement, getTasks, deleteTask, addTask, editTask};