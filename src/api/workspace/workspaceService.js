import axios from "axios"
import { useSelector } from "react-redux";

async function getWorkspaces(id) {
    const response = await axios.get(`http://localhost:8080/users/${id}/workspaces`,
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }
    )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })
        .finally(() => {
            console.log("finally")
        })

    return response;
}

async function postWorkspaces(id, { name, description, type }) {

    const token = localStorage.getItem("token");
    // const userData = useSelector((state) => state.authSlice.userData)
    // const userId = userData.id;

    console.log("userId : ", 23)
    const response = await axios.post(
        `http://localhost:8080/users/${id}/workspaces`
        ,
        {
            name,
            description,
            type
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
        .then((response) => {
            console.log("Workspace response : ", response)
            return response;
        })
        .catch((error) => {
            return error.response
        })
        .finally(() => {

        })

    return response;
}
async function deleteWorkspaces(user_id, workspace_id) {

    const token = localStorage.getItem("token");
    const response = await axios.delete(
        `http://localhost:8080/users/${user_id}/workspaces/${workspace_id}`
        ,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
        .then((response) => {
            console.log("Workspace response : ", response)
            return response;
        })
        .catch((error) => {
            return error.response
        })
        .finally(() => {

        })

    return response;
}

export { getWorkspaces, postWorkspaces, deleteWorkspaces }