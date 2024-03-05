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

async function updateFiles(userId, workspaceId, fileId, { filename, extension, code }) {
    const token = localStorage.getItem("token");
    console.log(userId, workspaceId, fileId, { filename, extension, code })
    const response = await axios.patch(
        `http://localhost:8080/users/${userId}/workspaces/${workspaceId}/files/${fileId}`,
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
            console.log("updateFiles :: response:", response)
            return response;
        })
        .catch((error) => {
            console.log("updateFiles :: error:", error)
            return error.response;
        })
        .finally(() => {

        })
    return response
}


async function deleteFiles(userId, workspaceId, fileId) {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
        `http://localhost:8080/users/${userId}/workspaces/${workspaceId}/files/${fileId}`,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
        .then((response) => {
            console.log("deleteFiles :: response:", response)
            return response;
        })
        .catch((error) => {
            console.log("deleteFiles :: error:", error)
            return error.response;
        })
        .finally(() => {

        })
    return response
}


export { getFiles, postFiles, updateFiles, deleteFiles }