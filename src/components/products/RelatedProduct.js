import React, { useEffect, useState } from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import defaultImage from '../../images/p_defaultImage.png';
import PrimaryButton  from "../Ui/buttons/button"
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
export const RelatedProduct = ({data}) => {
   //console.log(data);
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
    };
  const handleDecrement = () => {
      setCount(prevCount => prevCount - 1);
  };
  const truncate = (str)=>{
      return str?.length > 14 ? str.substring(0, 14) + "..." : str;
  }
  return (
       <div className="cursor-pointer">
         <div className="mb-4 md:mb-0">
           <div className="">
           	  <div className="w-full sm:h-[180px] md:h-[180px] lg:h-[180px]">
              	<img src={(data.ImageFile != '') ? process.env.REACT_APP_IMAGE_URL+data.ImageFile : defaultImage} className="w-full h-full object-fill bg-gray-300"/>
              </div>
            </div>
         </div>
          <div className="w-full p-2.5 text-left">
              <p className="leading-6 text-base text-gray-650 font-normal mb-2">Item: {data?.ITEM_CODE}</p>
              <h1 className="font-bold capitalize leading-[21px] text-black text-base  mb-2">{truncate(data?.Item_Desc)}</h1>
              {data?.Dimension && (<p className="leading-6 text-sm text-gray-400 font-normal mb-2">{data?.Dimension}</p>)}
          </div>
       </div>
 );
};