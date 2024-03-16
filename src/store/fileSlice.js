import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    selectedFile: {
        id: 1,
        filename: "First",
        extension: 'java',
        code: "class selectedFirst{\n public static void main(String args[]){\n \n }\n}",
    },
    files: [
        {
            id: nanoid(),
            filename: "First",
            extension: 'java',
            code: "class First{\n public static void main(String args[]){\n \n }\n}",
        },
        {
            id: nanoid(),
            filename: "Second",
            extension: 'java',
            code: "class Second{\n public static void main(String args[]){\n \n }\n}",
        },
        {
            id: nanoid(),
            filename: "Third",
            extension: 'java',
            code: "class Third{\n public static void main(String args[]){\n \n }\n}",
        },
    ]
}

export const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        selectFile: (state, action) => {
            state.selectedFile = action.payload
            console.log("file slice :: selectFile : ", state.selectedFile)
        },
        addFiles: (state, action) => {
            state.files = action.payload
        },
        addFile: (state, action) => {
            const { id, filename, extension, code } = action.payload
            const file = {
                id: id,
                filename: filename,
                extension: extension,
                code: code
            }
            console.log(file)
            state.files.push(file)
        },
        renameFile: (state, action) => {
            const { filename, rename } = action.payload
            const fileToRename = state.files.find(file => file.filename == filename);
            if (fileToRename) {
                fileToRename.filename = rename
            }

            console.log("fileSlice :: renameFile :: fileToRename : ", fileToRename.filename)

        },
        removeFile: (state, action) => {
            const id  = action.payload
            state.files = state.files.filter(file => file.id != id)
            console.log("removeFile :: files : ",state.files)
        },
        saveFile: (state, action) => {
            const { id, code } = action.payload;
            const fileToUpdate = state.files.find(file => file.id === id);
            if (fileToUpdate) {
                // console.log("File to Update : ", fileToUpdate)
                fileToUpdate.code = code;
                state.selectedFile = fileToUpdate;
            } else {
                console.error(`FileSlice : saveFile : File with id ${id} not found.`);
            }
        }
    }
})

export const { selectFile, addFiles, addFile, renameFile, removeFile, saveFile } = fileSlice.actions;
export default fileSlice.reducer