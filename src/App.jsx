import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {useEffect } from 'react'
import {  fetchDataFromApi} from "./utils/api"
import { useDispatch } from 'react-redux'
import Home from './pages/home/Home'
import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResult from './pages/searchResult/SearchResult'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { server } from './main'



function App() {

  const dispatch=useDispatch()


  useEffect(()=>{
    fetchApiConfig();
  
  },[])

  const fetchApiConfig=()=>{
    fetchDataFromApi(`${server}/configuration`).then((res)=>{

      const url = {
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original",
      }
      dispatch({
        type:"getApiConfigurationUrl",
        payload:url
      })
      
    }).catch((error)=>{
      console.log(error)
     })

  }

  const genresCall =async()=>{
    let promises=[]
    let endPoints =["tv","movie"]
    let allGenres={}

    endPoints.forEach((url)=>{
      return (
        promises.push(fetchDataFromApi(`${server}/genre/${url}/list`))
      )
    })
    const data =await Promise.all(promises)
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
      
    })
    console.log(allGenres)
    dispatch({
      type:"getGenres",
      payload:allGenres
    })
    
  }

  genresCall()
 

  return (
    <>
     <Router>
      <Header/>
      <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/:mediaType/:id" element={<Details/>}/>
      <Route  path="/explore/:mediaType" element={<Explore/>}/>
      <Route  path="/search/:query" element={<SearchResult/>}/>
      <Route  path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
     </Router>
    </>
  )
}

export default App
