<<<<<<< HEAD
import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-52 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated"} movies={movies.TopRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.UpcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
=======
import React from "react";

const SecondaryContainer = () => {
  return <div>secondary</div>;
};

export default SecondaryContainer;
>>>>>>> 21f851628c24316e04779d73c73b874eea1c3c47
