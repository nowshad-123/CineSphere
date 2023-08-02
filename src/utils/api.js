import axios from "axios"


const TMDB_TOKEN= import.meta.env.VITE_APP_POPCORN_TOKEN

const headers={
    Authorization :"bearer " +TMDB_TOKEN,
    'accept': 'application/json'
    
}


export const fetchDataFromApi=async(url)=>{
    try{
        const {data}=await axios.get(url,{headers})
        return data

    }catch(error){
        console.log(error)
        return error
    }

}



