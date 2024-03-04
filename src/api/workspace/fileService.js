import axios from "axios";

async function getFiles(userId, workspaceId) {
    const token = localStorage.getItem("token");
    const response = await axios.get(
        `http://localhost:8080/users/${userId}/workspaces/${workspaceId}/files`,
        {
            headers: {
                Authorization: 'Bearer ' + token
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

        })

    return response;
}

async function postFiles(userId, workspaceId, { filename, extension, code }) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `http://localhost:8080/users/${userId}/workspaces/${workspaceId}/files`,
        {
            filename,
            extension,
            code
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
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

        })
    return response
}


export { getFiles, postFiles }