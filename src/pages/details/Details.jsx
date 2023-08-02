
import "./style.scss";
import {useFetch} from "../../hooks/useFetch";
import { server } from "../../main";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast"
// import VideosSection from "./videosSection/VideosSection";


const Details = () => {

  const {mediaType,id}=useParams()
  const {data,loading}=useFetch(`${server}/${mediaType}/${id}/videos`) 
  const {data:credits,loading :creditsLoading}=useFetch(`${server}/${mediaType}/${id}/credits`) 
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      {/* <VideosSection data={data} loading={loading}/> */}
    </div>
  )
}

export default Details