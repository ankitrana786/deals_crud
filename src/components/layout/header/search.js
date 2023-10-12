import React from 'react';
import SearchIcon from "../../Ui/icons/search-icon";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';



const Search = () => {
  
  
  return (
       <div className="text-right hidden md:block mt-6 ">
            <div className="flex justify-between text-lg bg-white border-2 border-gray-400 rounded py-2 px-3">
                <input type="text" placeholder="Search For Products" className="font-semibold text-sm mr-20"/>
                <SearchIcon />
            </div>
            <a href="#" className="underline text-xs text-gray-400">Advanced Search</a>
        </div>
 );
};

export default Search;