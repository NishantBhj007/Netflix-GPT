import React, { useEffect, useRef } from "react";
import lang from "../../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, gemini_KEY } from "../../utils/constants";
import ErrorPage from "./ErrorPage";
import { addGptMovieResult } from "../../utils/gptSlice";
import useSearchMovieTMDB from "../hooks/UseSearchMovieTMDB";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  //search movie in tmdb

  // const searchMovieTMDB = useSearchMovieTMDB();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a movie recommandation system and suggest some movies for the query :" +
      searchText.current.value +
      "only give me names of 5 movies,comma seperated";

    const genAI = new GoogleGenerativeAI(gemini_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use the correct function
    const result = await model.generateContent(gptQuery);
    const response = await result.response;
    const gptResults = response.text();
    console.log(gptResults);
    const gptMovies = gptResults.split(",");
    console.log(gptMovies);

    if (!gptResults) {
      console.log("error");
      <ErrorPage />;
    }

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div
      className="pt-[35%] md:pt-[10%] flex justify-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12">
        <input
          ref={searchText}
          className=" p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
