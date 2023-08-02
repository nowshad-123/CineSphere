import {createReducer} from "@reduxjs/toolkit"

export const homeReducer=createReducer({
    url:[],genres:[]
},{
    getApiConfigurationUrl:(state,action)=>{
        state.url=action.payload
    },
    getGenres:(state,action)=>{
        state.genres=action.payload
    }
})




