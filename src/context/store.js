import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from './userSlice'
import {boletaSlice} from "./boletaSlice";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        boleta: boletaSlice.reducer,
    }
})
export default store
