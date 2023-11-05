import {configureStore} from "@reduxjs/toolkit"
import fileSlice from "./fileSlice";
const store = configureStore({
    reducer : fileSlice,
})

export default store;