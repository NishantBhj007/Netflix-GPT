import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => {
          return (
            <MovieList
              title={movieName}
              movies={movieResults[index]}
              key={movieName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
