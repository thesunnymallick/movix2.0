import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../content/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  // control nabvar bacground color with help navbar scroll change
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    addEventListener("scroll", controlNavbar);
    return () => {
      removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  //Search Query
  const searchQueryHandel = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  // serach bar show or close
  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  // mobile menu show or close
  const mobileMenuHandel = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  // navigate explore page
  const navigationHandel = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="movix" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandel("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandel("tv")}>
            Tv Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          <>
            {mobileMenu ? (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            ) : (
              <SlMenu onClick={mobileMenuHandel} />
            )}
          </>
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movies and Tv shows..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandel}
              />
            </div>
            <VscChromeClose
              style={{ fontSize: "20px", cursor: "pointer", marginTop: "7px" }}
              onClick={() => setShowSearch(false)}
            />
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
