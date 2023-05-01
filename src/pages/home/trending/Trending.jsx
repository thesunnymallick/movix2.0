import React, { useState } from 'react'
import ContentWrapper from '../../../components/content/ContentWrapper'
import SwitchTab from '../../../components/switchTab/SwitchTab'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
const Trending = () => {

    const[endPoint, setEndPoint]=useState("day");
    const {data, loading}=useFetch(`/trending/all/${endPoint}`);
    console.log(data)
    const onTabsChange=(tab)=>{
     setEndPoint(tab==="Day"?"day":"week")
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
         <span className='carouselTitle'>
            Trending
         </span>
         <SwitchTab data={["Day","Week"]} onTabsChange={onTabsChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending