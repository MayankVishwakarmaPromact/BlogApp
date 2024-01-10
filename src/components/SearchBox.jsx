/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
export default function SearchBox({ searchTerm, handleSearch }) {
  const navigateTo = useNavigate();
  const btnRef = useRef();
  const [searchparams] = useSearchParams();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      btnRef.current.click();
    }
  };
  return (
    <>
      <div className="flex items-center space-x-2 rounded-md border border-black/30">
        <input
          className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Search Topics"
          value={searchTerm}
          onChange={handleSearch}
          onKeyUp={handleKeyPress}
        ></input>
        <button
          ref={btnRef}
          type="button"
          className="rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() =>
            navigateTo({ pathname: "/posts", search: searchparams.toString() })
          }
        >
          <Search />
        </button>
      </div>
    </>
  );
}
