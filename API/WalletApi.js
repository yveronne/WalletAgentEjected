import moment from "moment";

const URL = "http://192.168.99.37:8000/";

export function logUser(username, password){
    const url = URL+"merchant/login";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "username" : username,
            "password" : password
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log("Une erreur est survenue lors de la collecte" + error))
}

export function getWaitingList(storeID, token){

    const url = URL+"merchantpoints/"+storeID+"/waitingline";

    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log("Une erreur est survenue lors de la collecte" + error))
}

export function markAsServed(itemID, token){

    const url = URL+"waitinglines/"+itemID;

    return fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type" : 'application/json',
            "Authorization" : "Token "+token
        },
        body : JSON.stringify({
            "wasserved" : true,
            "servicedate": moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        })
    })
        .then(response => {
            if(response.ok) return response.json();
            else return {"error" : "Une erreur est survenue"}
        })
        .catch(error => console.log("Une erreur est survenue lors de la modification " +error))
}

export function validateTransaction(codie, token){

    const url = URL+"transactions/confirm";
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : 'application/json',
            "Authorization" : "Token "+token
        },
        body : JSON.stringify({
            code : codie
        })
    })
        .then(response => response.json())
        .catch(error => console.log("Une erreur est survenue lors de la collecte" + error))
}

export function logout(token){

    const url = URL+"merchant/logout";

    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization" : "Token "+token,
            "Content-Type" : "application/json"
        }
    })
        .then(response => response)
        .catch(error => console.log("Une erreur est survenue lors de la collecte" + error))
}