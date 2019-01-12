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

function getMyIpAddress()
{
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    return new Promise((resolve,reject)=>{
        pc.onicecandidate = function(ice)
        {
            
            if (ice && ice.candidate && ice.candidate.candidate)
            {
                // alert("in the function")
                let myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];  
                pc.onicecandidate = noop;  
                resolve(myIP)
            }
            else reject("error")  
        }
    }) 
}
function getTasksFromDB(missionsURL){
    return fetch(missionsURL)
    .then(response => response.json())
}

function fetchFromDB(myRequest)
{
    return fetch(myRequest)
        .then(response => response.json());
}

function deleteTask(taskId)
{
    let header = makeHeaders('DELETE');
    let myRequest = new Request(`${missionsURL}/${taskId}`, header);
   return fetchFromDB(myRequest)
}

function addTask(value){

    let newItem = {content:value};
    let header = makeHeaders('POST', newItem);
    let myRequest = new Request(missionsURL, header);
    return fetchFromDB(myRequest)
}

function editTask(taskId, newItem){
   
    let header = makeHeaders('PUT', newItem);
    let myRequest = new Request(missionsURL + `/${taskId}` , header);
    return fetchFromDB(myRequest)
    
}

export {findElement, fetchFromDB, deleteTask, addTask, editTask, getTasksFromDB, getMyIpAddress};