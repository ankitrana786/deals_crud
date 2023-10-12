import React, { useEffect, useState } from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import defaultImage from '../../images/p_defaultImage.png';
import PrimaryButton  from "../Ui/buttons/button"
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ROUTES } from "../../utils/routes"
export const SimilarProduct = ({data}) => {
  // console.log(data);
  const [pName,setPname] = useState((data.length >0 ) ? data[0].Item_Desc : []);
   const getImgname =(name)=>{
    setPname(name);
   }
  return (
   <div className="">
      <h2 className="text-xl lg:text-2xl text-black font-bold mb-2">Similar Products In This Category</h2>
      <div className="border border-gray-350 p-4 w-full">
        <h2 className="text-lg font-medium text-gray-400 mb-4 truncate ...">{pName}</h2>
        <div className="flex items-start flex-wrap gap-1.5">
          {data.map((items,index)=>(
            <div className="w-[34px] h-[34px] cursor-pointer">
              <a
                href={`/productdetail/${items.Item_Code}`}
                key={index}
              >
                <LazyLoadImage src={process.env.REACT_APP_IMAGE_URL+items.ImageFile} alt={items.Item_Desc} onMouseOver={()=>getImgname(items.Item_Desc)} className="w-full h-full object-cover"  />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
 );
};
