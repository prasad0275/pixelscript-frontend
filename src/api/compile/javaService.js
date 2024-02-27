import axios from "axios"

function compile({ filename, extension, code }) {

}

async function run({ filename, extension, code, input }) {
    const reponse = await axios.post(
        'http://localhost:8080/compile',
        {
            filename,
            extension,
            code,
            input
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