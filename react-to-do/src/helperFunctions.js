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

export default makeHeaders;