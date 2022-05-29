const pracaBaseUrl ='http://localhost:3000/api/praca'

export function getPracaApiCall()
{
    const promise = fetch(pracaBaseUrl);
    return promise;
}

export function getPracaByIdApiCall(pracaId)
{
    const url = pracaBaseUrl+'/'+pracaId;
    const promise = fetch(url);
    return promise;
}
export function addPracaApiCall(praca){
    const pracaString = JSON.stringify(praca)
    console.log(pracaString)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: pracaString
    };
    const promise = fetch(pracaBaseUrl,options);
    return promise;
}

export  function updatePracaApiCall(zakupyId,zakupy)
{
    const url = pracaBaseUrl+'/'+zakupyId;
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
export  function deletePracaApiCall(pracaId)
{
    const url = pracaBaseUrl+'/'+pracaId;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const promise = fetch(url,options);
    return promise
}
