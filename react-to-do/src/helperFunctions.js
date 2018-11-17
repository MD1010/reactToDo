function makeHeaders(method,bodyRequest)
{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let header = 
    {
      method: method,
      headers: headers, 
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(bodyRequest)
    };

    return header;
}

function findElement(array,id)
{
    let foundIDIndex = array.indexOf(array.find(element => 
    {
        return element._id === id;
    }));

    return foundIDIndex;

}

export {makeHeaders,findElement};