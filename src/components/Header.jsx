import React, { useEffect } from "react";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  netflix_Logo,
  SUPPORTED_LANGUAGES,
  userIcon,
} from "../../utils/constants";
import { toggleGptSearchView } from "../../utils/gptSlice";
import { changeLanguage } from "../../utils/configSlice";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleGtpSearchClick = () => {
    //toggle gpt search
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
    console.log(showGptSearch);
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex  flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0 " src={netflix_Logo} alt="logo" />

      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-800 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((e) => (
                <option key={e.name} value={e.identifier}>
                  {e.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2  my-2 px-4 mx-4 text-white bg-purple-600 rounded-lg m-2"
            onClick={handleGtpSearchClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
            className=" hidden md:block w-12 h-12"
            src={userIcon}
            alt="userIcon"
          />
          <button className="font-bold text-white m-2" onClick={handleSignOut}>
            Sign Out {user.displayName}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
