import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { search } from "../api";
import { useRef,useCallback, useEffect } from "react";

export default function SearchInput({ updateSearchResults }) {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const inputRef = useRef(input);
  inputRef.current = input;

  const handleSearch = (e) => {
    if (e.target.value !== undefined) setInput((prev) => e.target.value);
  };

  const updateSearch = async (input) => {
	  console.log("inputRef :"+input)
    try {
	  const searchData = await search(input, "track");
	  updateSearchResults(searchData.tracks.items);
	  setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
	let timeoutCode = null;
	console.log(input)
    if (!!input && !loading){
		 timeoutCode = setTimeout(() =>updateSearch(inputRef.current), 800);
		 setLoading(prev => true)
	}
    return () => {
		clearTimeout(timeoutCode)
	};
  }, [input]);

  return (
    <div className="flex content-center justify-between items-center bg-white w-1/2 rounded-full h-10">
      <SearchIcon sx={{ margin: "10px" }} />
      <input
        onChange={handleSearch}
        alt="search"
        placeholder="Artists, musics or podcasts"
        className="m-2 w-full outline-none "
        type="text"
      ></input>
    </div>
  );
}
