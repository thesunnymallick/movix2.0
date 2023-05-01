import React from 'react'
import Herobanner from './heroBanner/Herobanner'
import "./home.scss"
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
const Home = () => {
  return (
    <div className="homePage">
        <Herobanner/>
        <Trending/>
        <Popular/>
        <TopRated/>
    </div>
  )
}

export default Home