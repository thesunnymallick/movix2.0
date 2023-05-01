import React, { useEffect, useState } from "react";
import "./Herobanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadComponent/Img";
import ContentWrapper from "../../../components/content/ContentWrapper";
const Herobanner = () => {
  const [query, setQuery] = useState("");
  const [background, setBackground] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  // Set bacground image
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  //Search Query
  const searchQueryHandel = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  // serach btn
  const SearchBtnHandel = () => {
    navigate(`/search/${query}`);
    setTimeout(() => {
      setShowSearch(false);
    }, 1000);
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layout"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="hero-title">Welcome</span>
          <span className="hero-subTitle">
            Millions of movies, TV shows and people to discover Explore Now
          </span>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for movies and Tv shows..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandel}
            />
            <button onClick={SearchBtnHandel}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Herobanner;
