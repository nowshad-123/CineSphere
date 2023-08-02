import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoading/LazyLoading";
import PosterFallback from "../../assets/no-poster.png";
import Genres from "../genres/Genres";
import "./style.scss";

const Carousel = ({data,loading,endpoint}) => {
  console.log(data)
  const navigate=useNavigate()
    const carouselContainer=useRef()
    const {url}=useSelector((state)=>(state.home))
    
    const navigation =(dir)=>{
      const container =carouselContainer.current;
      const scrollAmount=dir ==="left"?((container.scrollLeft) -(container.offsetWidth +20)):
      ((container.scrollLeft)+(container.offsetWidth +20))
      container.scrollTo({
        left:scrollAmount,
        behavior:"smooth",
      })
    }

    const sklItem=()=>{
      return(
        <div className="skeletonItem">
          <div className="posterBlock skeleton"></div>
            <div className="textBlock">
              <div className="title skeleton"></div>
              <div className="date skeleton"></div>
            </div>
        </div>
      )
    }

  

  return (
    <div className="carousel" >
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
        className="carouselLeftNav arrow"
        onClick={()=>navigation("left")}
        />
        
        <BsFillArrowRightCircleFill className="carouselRightNav arrow"
        onClick={()=>navigation("right")}
        />
        {!loading?( <div  ref={carouselContainer} className="carouselItems">
        {data?.map((item)=>{
          const posterUrl=item.poster_path?url.poster+item.poster_path:PosterFallback
          return(
            <div 
            key={item.id}
            className="carouselItem" 
           onClick={()=>navigate(`/${item.media_type ||endpoint}/${item.id}`)}
            >
              <div className="posterBlock">
              <div className="circle">
                <Img src={posterUrl}/>
                {<CircleRating rating={+(item.vote_average.toFixed(1))}/>}
              </div>
              <Genres data={item.genre_ids.slice(0,2)} />
              </div>
              <div className="textBlock">
                <span className="title">
                  {item.title ||item.name}
                </span>
                <span className="date">
                  {dayjs(item.release_Date).format("MM D YYYY")}
                </span>
              </div>
            </div>
          )
        })}

        </div>  ):( <div className="loadingSkeleton">
          {sklItem()}
          {sklItem()}
          {sklItem()}
          {sklItem()}
          {sklItem()}

        </div> )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel