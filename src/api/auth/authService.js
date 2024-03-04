import axios from "axios";

async function signup({ username, email, firstname, lastname, password }) {

    // console.log(username, email)
    const response = await axios.post('http://localhost:8080/register', {
        username,
        email,
        firstname,
        lastname,
        password
    })
        .then((response) => {
            console.log("authService:: signup: response ", response);
            return response;
        })
        .catch((error) => {
            console.log("authService:: signup: error", error);
            return error.response
        })
        .finally(() => {
            console.log("this is finally")
        })

    return response;
}

async function login({ username, password }) {

    // console.log(username, email)
    const response = await axios.post('http://localhost:8080/login', {
        username,
        password
    })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.log("authService :: Login :: Error:",error);
            return error.response;
        })
        .finally(() => {
            console.log("this is finally")
        })

    return response;
}


export { signup, login }