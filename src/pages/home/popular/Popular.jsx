import React from 'react'
import "../style.scss"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carousel from '../../../components/carousel/Carousel'
import { useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { server } from '../../../main'

const Popular = () => {
  const [endpoint,setEndpoint] =useState("movie")

  const {data,loading} =useFetch(`${server}/${endpoint}/popular`)

       const onTabChange=(tab)=>{
        setEndpoint(tab==="Movies"?"movie":"tv")
       }

  return (
    <>
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data={["Movies","Tv shows"]} 
            onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel  data={data?.results} endpoint={endpoint} loading={loading}/>
    </div>
    </>
  )
}

export default Popular