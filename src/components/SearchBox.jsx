/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
export default function SearchBox ({searchTerm, handleSearch}) {  
    return (
      <><div className=" flex items-center space-x-2 rounded-md border border-black/30">
            <input
              className="flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Search Topics"
              value={searchTerm}
              onChange={handleSearch}
            ></input>
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Search />
            </button>
          </div></>
    )
  
  }