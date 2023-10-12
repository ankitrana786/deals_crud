import React,{useState,useEffect} from 'react';
import ListBox from "../Ui/list-box";
import ListBoxName from "../Ui/list-box-name";
import cn from "classnames";
import { IoGridSharp,IoListSharp } from "react-icons/io5";
export const SearchTopBar = ({cardView, itemCount}) => {
  const [isOpen, setIsOpen] = useState(false);
  //  const handleChange =(value)=>{
  //   console.log(value);
  // }
  return (
    <div className="mb-5">
      
      <div className="flex items-center justify-between">
        <div className="text-base text-black">
          Showing {itemCount} items
        </div>
        <div className="hidden lg:block lg:flex items-center justify-end space-x-2">
          <div className="flex space-x-5 mr-5">
            <IoGridSharp onClick={()=>cardView("0")} className="cursor-pointer w-5 h-5" />
            <IoListSharp  onClick={()=>cardView("1")} className="cursor-pointer w-5 h-5" />
          </div>
          <div className="flex space-x-4">
            <ListBoxName
              options={[
                { name: "Sort By Name", value: "" },
                { name: "Ascending", value: "ascending" },
                { name: "Descending", value: "descending" }
              ]}

            />
            <ListBox
              options={[
                { name: "Sort By Price", value: "Sort By" },
                { name: "Low high", value: "low-high" },
                { name: "High low", value: "high-low" },
              ]}

            />
          </div>
        </div>
      </div>
    </div>   
 );
};