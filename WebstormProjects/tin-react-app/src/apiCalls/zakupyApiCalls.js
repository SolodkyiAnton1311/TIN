
const zakupyBaseUrl ='http://localhost:3000/api/zakups'
export function getZakupyApiCall()
{
    const promise = fetch(zakupyBaseUrl);
    return promise;
}

export function getZakupyByIdApiCall(zakupyId)
{
    const url = zakupyBaseUrl+'/'+zakupyId;
    const promise = fetch(url);
    return promise;
}
export function addZakupyApiCall(sklep){
    const sklepString = JSON.stringify(sklep)
    console.log(sklepString)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: sklepString
    };
    const promise = fetch(zakupyBaseUrl,options);
    return promise;
}

export  function updateZakupyApiCall(zakupyId,zakupy)
{
    const url = zakupyBaseUrl+'/'+zakupyId;
    const zakupyString = JSON.stringify(zakupy)
    console.log(zakupyString)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: zakupyString
    };
    const promise = fetch(url,options);
    return promise
}
