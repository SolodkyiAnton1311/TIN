import {getCurrentUser} from "../helper/authHelper";

const klientBaseUrl ='http://localhost:3000/api/klients'
export function getKlientApiCall()
{
   const promise = fetch(klientBaseUrl);
    return promise;
}

export function getKlientByIdApiCall(klientId)
{
   const url = klientBaseUrl+'/'+klientId;
   const promise = fetch(url,);
   return promise;
}

export function addKlientApiCall(klient){
    const user = getCurrentUser()
    const klientString = JSON.stringify(klient)
    let token
    if (user && user.token)
    {
        token =user.token;
    }
    console.log(klientString)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: klientString
    };
    const promise = fetch(klientBaseUrl,options);
    return promise;
}

export  function updateKlientApiCall(klientId,klient)
{
    const url = klientBaseUrl+'/'+klientId;
    const klientString = JSON.stringify(klient)
    console.log(klientString)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: klientString
    };
const promise = fetch(url,options);
    return promise
}
export  function deleteKlientApiCall(klientId)
{
    const url = klientBaseUrl+'/'+klientId;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const promise = fetch(url,options);
    return promise
}