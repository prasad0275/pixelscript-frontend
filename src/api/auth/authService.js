import axios from "axios";

function signup({username, email, firstname, lastname, password}){

    console.log(username, email)
    axios.post('http://localhost:8080/users',{
        username,
        email,
        firstname,
        lastname,
        password
    })
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
        return error
    })
    .finally(()=>{
        console.log("this is finally")
    })
}


// function login(){

// }


export {signup}