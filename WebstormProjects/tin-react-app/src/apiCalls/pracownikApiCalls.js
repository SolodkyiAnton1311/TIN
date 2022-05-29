import {getCurrentUser, userToken} from "../helper/authHelper";
const pracownikBaseUrl ='http://localhost:3000/api/pracowniki'
export function getPracowniktApiCall()
{
    const promise = fetch(pracownikBaseUrl);
    return promise;
}

export function getPracownikByIdApiCall(pracownikId)
{
    const url = pracownikBaseUrl+'/'+pracownikId;
    const promise = fetch(url,);
    return promise;
}

export function addPracownikApiCall(pracownik){
    const klientString = JSON.stringify(pracownik)
    let token = userToken();
    console.log(klientString)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: klientString
    };
    const promise = fetch(pracownikBaseUrl,options);
    return promise;
}

export  function updatePracownikApiCall(pracownikId,pracownik)
{
    const url = pracownikBaseUrl+'/'+pracownikId;
    const pracownikString = JSON.stringify(pracownik)
    console.log(pracownikString)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: pracownikString
    };
    const promise = fetch(url,options);
    return promise
}
export  function deletePracownikApiCall(pracownikId)
{
    const url = pracownikBaseUrl+'/'+pracownikId;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const promise = fetch(url,options);
    return promise
}