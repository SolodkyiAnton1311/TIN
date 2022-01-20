const baseUrl = 'http://localhost:3000/api/user'

export function addUserApiCall(user){
    const userString = JSON.stringify(user)
    console.log(user)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: userString
    };
    const promise = fetch(baseUrl,options);
    return promise;
}