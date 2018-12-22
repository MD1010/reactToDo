function findElement(array,id)
{
    let foundIDIndex = array.indexOf(array.find(element => 
    {
        return element._id === id;
    }));

    return foundIDIndex;
}

function getTasks(missionsURL)
{
    return fetch(missionsURL);
}

function returnPromise()
{
    return new Promise((resolve, reject) => {
        resolve("Hi");
        reject("Bye")
    })
}

export {findElement, getTasks, returnPromise};