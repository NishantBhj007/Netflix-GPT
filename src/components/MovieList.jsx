import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  return (
    <div className="px-6 bg-black">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((poster) => (
            <MovieCard key={poster.id} posterPath={poster?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
