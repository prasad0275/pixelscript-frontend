import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    files: [
        {
            id: nanoid(),
            name: "First",
            extension: 'java',
            code: "class First{\n public static void main(String args[]){\n \n }\n}",
        },
        {
            id: nanoid(),
            name: "Second",
            extension: 'java',
            code: "class Second{\n public static void main(String args[]){\n \n }\n}",
        },
        {
            id: nanoid(),
            name: "Third",
            extension: 'java',
            code: "class Third{\n public static void main(String args[]){\n \n }\n}",
        },
    ]
}

export const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        addFile: (state, action) => {
            const { id, filename, extension, code } = action.payload
            const file = {
                id: id,
                name: filename,
                extension: extension,
                code: code
            }
            console.log(file)
            state.files.push(file)
        },
        renameFile: (state, action) => {
            const { filename, rename } = action.payload
            const fileToRename = state.files.find(file => file.name === filename);
            if(fileToRename){
                fileToRename.name = rename
            }


        },
        removeFile: (state, action) => {

        },
        saveFile: (state, action) => {
            const { id, code } = action.payload;
            const fileToUpdate = state.files.find(file => file.id === id);
            if (fileToUpdate) {
                // console.log("File to Update : ", fileToUpdate)
                fileToUpdate.code = code;
            } else {
                console.error(`FileSlice : saveFile : File with id ${id} not found.`);
            }
        }
    }
})

export const { addFile, renameFile, removeFile, saveFile } = fileSlice.actions;
export default fileSlice.reducer