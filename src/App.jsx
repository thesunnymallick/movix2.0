import { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {fetchDataFromApi} from "./utils/apiConfig"
import {getApiConfiguration,getApiGenres} from "./store/homeSlice"
import {useDispatch } from 'react-redux'
import SearchResult from './pages/searchResult/SearchResult'
import Header from './components/header/Header'
import Footer from "./components/footer/Footer"
import Home from './pages/home/Home'
import NotFound from './pages/notFound/NotFound'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
function App() {
 const dispatch=useDispatch();

  useEffect(()=>{
    fetchApiConfiguration();
    genresCall();
  },[])
  
  // fetch configuration api
  const fetchApiConfiguration=()=>{
   fetchDataFromApi("/configuration").then((res)=>{
    // set image url
    const url={
      backdrop:res.images.secure_base_url+"original",
      poster:res.images.secure_base_url+"original",
      profile:res.images.secure_base_url+"original",
    }
    // store image url in redux
    dispatch(getApiConfiguration(url))
   })
  }

   const genresCall=async()=>{
    let promises=[];
    let endpoints=["tv", "movie"];
    let allGenres={};

       endpoints.forEach((url)=>{
        promises.push(fetchDataFromApi(`/genre/${url}/list`))
       })
    
    const data=await Promise.all(promises);
     console.log(data)
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
   dispatch(getApiGenres(allGenres))
   }
  
   

  return (
     <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/search/:query' element={<SearchResult/>} />
      <Route path='/:mediaType/:id' element={<Details/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>} />
      <Route path='*' element={<NotFound/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>
  )
}

export default App
