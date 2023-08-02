import "./style.scss";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useFetch} from "../../../hooks/useFetch"
import { server } from "../../../main";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoading/LazyLoading"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"


const HeroBanner = () => {

    const [background,setBackground]=useState("")
    const [query,setQuery]=useState("") 
    const navigate =useNavigate()
    const {url}=useSelector(state=>state.home)
    const {data,loading,error}=useFetch(`${server}/movie/upcoming`)

    useEffect(()=>{
      const bg =url?.backdrop+data?.results?.[+(Math.random()* 20).toFixed()]?.backdrop_path
      setBackground(bg)  
    },[data])

    const searchQueryHandler=(event)=>{
      if(event.key==="Enter" && query.length > 0){
        navigate(`/search/${query}`)
      }
    }
  return (
    <div className="heroBanner">
      {
        !loading && <div className="backdrop-img" >
        <Img src={background}  />
        </div>
      }
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies,Tv shows and people
            to discover.
            Explore now
           </span>
          <div className="searchInput">
            <input onKeyUp={searchQueryHandler} onChange={(event)=>setQuery(event.target.value)} type="search" placeholder="Search For a movie or Tv show..." />
            <button  type="submit" onClick={searchQueryHandler} >Search</button>
          </div>
        </div>
      </ContentWrapper>
      </div>
  )
}

export default HeroBanner

