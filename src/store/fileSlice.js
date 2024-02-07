import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    files : [
        {
            id : 1,
            name : "First.java",
            code : "class First{\n public static void main(String args[]){\n \n}\n",
        },
        {
            id : 2,
            name : "Second.java",
            code : "class Second{\n public static void main(String args[]){\n \n}\n",
        },
        {
            id : 3,
            name : "Third.java",
            code : "class Third{\n public static void main(String args[]){\n \n}\n",
        },
    ]
}

export const fileSlice = createSlice({
    name : "file",
    initialState,
    reducers : {
        addFile : (state, action) => {

        },
        removeFile : (state, action) => {

        },
        saveFile : (state, action) => {
            
        }

    }
})

export const {addFile, removeFile} = fileSlice.actions;
export default fileSlice.reducer