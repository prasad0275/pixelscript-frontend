import {configureStore} from "@reduxjs/toolkit"
import fileSlice from "./fileSlice";
const store = configureStore({
    reducer : fileSlice,
})

export default store;


// This for future, I don't have implement yet so it is for future use when I will multiple slice

// import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import { globalSearchSlice, imageSearchSlice } from "./slices.js"

// const reducers = combineReducers({
//   [globalSearchSlice.name]: globalSearchSlice.reducer,
//   [imageSearchSlice.name]: imageSearchSlice.reducer,
// })

// export const store = configureStore({
//   reducer: reducers,
//   devTools: process.env.NODE_ENV !== "production",
// })