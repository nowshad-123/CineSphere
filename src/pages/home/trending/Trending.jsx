import React from 'react'
import "../style.scss"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Carousel from '../../../components/carousel/Carousel'
import { useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { server } from '../../../main'

const Trending = () => {
  const [endpoint,setEndpoint] =useState("day")

  const {data,loading} =useFetch(`${server}/trending/all/${endpoint}`)

       const onTabChange=(tab)=>{
        setEndpoint(tab==="Day"?"day":"week")
       }

  return (
    <>
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day","Week"]} 
            onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} endpoint={endpoint} loading={loading}/>
    </div>
    </>
  )
}

export default Trending