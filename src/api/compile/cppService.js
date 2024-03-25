import axios from "axios"

async function compile({ filename, extension, input, code }) {
    const token = localStorage.getItem("token")
    const reponse = await axios.post(
        'http://localhost:8080/cpp/compile',
        {
            filename,
            extension,
            code,
            input
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

    )
        .then((reponse) => {
            // console.log(">", reponse)
            return reponse;
        })
        .catch((error) => {
            return error;
        })
        .finally(() => {

        })

    return reponse;
}

async function run({ filename, extension, code, input }) {
    const token = localStorage.getItem("token")
    const reponse = await axios.post(
        'http://localhost:8080/cpp/run',
        {
            filename,
            extension,
            code,
            input
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

    )
        .then((reponse) => {
            // console.log(">", reponse)
            return reponse;
        })
        .catch((error) => {
            return error;
        })
        .finally(() => {

        })

    return reponse;
}

export { compile, run } 