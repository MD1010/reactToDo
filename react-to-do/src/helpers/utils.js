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
function getData(missionsURL){
    return fetch(missionsURL)
    .then(response => response.json())
}

function changeData(myRequest)
{
    return fetch(myRequest)
        .then(response => response.json());
}

function deleteData(url,id)
{
    let header = makeHeaders('DELETE');
    let myRequest = new Request(`${url}/${id}`, header);
    return changeData(myRequest)
}

function postData(url, newData){
    let header = makeHeaders('POST', newData);
    let myRequest = new Request(url, header);
    return changeData(myRequest)
}

function putData(url, id, newData){
   
    let header = makeHeaders('PUT', newData);
    let myRequest = new Request(url + `/${id}` , header);
    return changeData(myRequest)
    
}

export {findElement, changeData , deleteData, postData, putData, getData , getMyIpAddress};