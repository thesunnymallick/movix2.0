import React from "react";
import { useSelector } from "react-redux";
import "./genres.scss";
const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data.map((g) => {
        return <div className="genre">{genres[g]?.name}</div>;
      })}
    </div>
  );
};

export default Genres;
