import {configureStore} from "@reduxjs/toolkit"
import {homeReducer} from "./redux"


export const store = configureStore({
    reducer:{
        home:homeReducer
        
    }
})