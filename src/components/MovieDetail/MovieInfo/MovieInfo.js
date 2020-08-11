import React from "react";
import classes from './MovieInfo.module.css';


const MovieInfo = (props) => {
    return (
      <div className={classes.MovieInfo}>
          <h1>{props.movieTitle}</h1>
          <h3>{props.movieYear}</h3>
          <h3>{props.movieDirector}</h3>
          <br />
          <p>{props.movieDesc}</p>
      </div>
    );
}

export default MovieInfo;