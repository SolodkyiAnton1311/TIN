
const sklepBaseUrl ='http://localhost:3000/api/skleps'
export function getSklepApiCalls()
{
    const promise = fetch(sklepBaseUrl);
    return promise;
}

export function getSklepByIdApiCall(sklepId)
{
    const url = sklepBaseUrl+'/'+sklepId;
    const promise = fetch(url);
    return promise;
}
export function addSklepApiCall(sklep){
    const sklepString = JSON.stringify(sklep)
    console.log(sklepString)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: sklepString
    };
    const promise = fetch(sklepBaseUrl,options);
    return promise;
}

export  function updateSklepApiCall(sklepId,sklep)
{
    const url = sklepBaseUrl+'/'+sklepId;
    const sklepString = JSON.stringify(sklep)
    console.log(sklepString)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: sklepString
    };
    const promise = fetch(url,options);
    return promise
}
export  function deleteSklepApiCall(sklepId)
{
    const url = sklepBaseUrl+'/'+sklepId;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const promise = fetch(url,options);
    return promise
}