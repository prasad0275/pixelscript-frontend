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
            console.log("authService :: Login :: Error:", error);
            return error.response;
        })
        .finally(() => {
            console.log("this is finally")
        })

    return response;
}

async function getUser(id) {

    console.log(id)
    const token = localStorage.getItem("token")
    const response = await axios.get(`http://localhost:8080/users/${id}`,
    {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.log("authService :: UpdateUser :: Error:", error);
            return error.response;
        })
        .finally(() => {
            console.log("this is finally")
        })

    return response;
}

async function updateUser(id, data) {

    console.log(id, data)
    const token = localStorage.getItem("token")
    const response = await axios.patch(`http://localhost:8080/users/${id}`, {
        ...data
    },
    {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.log("authService :: UpdateUser :: Error:", error);
            return error.response;
        })
        .finally(() => {
            console.log("this is finally")
        })

    return response;
}

async function validateToken({ user_id, token }) {
    const response = await axios.post(`http://validate-user/${user_id}`, {
        token
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })

    return response;
}


export { signup, login, getUser, updateUser, validateToken }