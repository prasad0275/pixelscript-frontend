import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,

}

const authSlice  = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true,
            state.userData = action.payload.userData;
        },
        logout : (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem("token")
            localStorage.removeItem("status")
        }
    }
})

export const { login, logout } = authSlice.actions //This will export methods of reducers

export default authSlice.reducer; //This will export whole reducer object 