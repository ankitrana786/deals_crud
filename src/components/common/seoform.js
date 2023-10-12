import React ,{useState} from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import textImg from '../../images/text-img.png';
import PrimaryButton  from "../Ui/buttons/button"
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { LazyLoadImage } from "react-lazy-load-image-component";


const SeoForm = ({seoData,preSeoData}) => {
  const [seoformData, setseoformData] = useState({title:"", desc:""})
   // console.log(preSeoData);
  // const imgPath = "https://dev.ceramicarts.com/categoryBanners/";
  const handleSeoTitle=(e)=>{
    setseoformData({title:e.target.value, desc:seoformData.desc})
    seoData(seoformData);
  }
  const handleSeoDesc=(e)=>{
    setseoformData({title:seoformData.title, desc:e.target.value})
    seoData(seoformData);
  }

  return (
       
         <div className="w-full">
           <div className="flex flex-col">
            <label className="font-semibold text-lg mb-2 text-gray-600">Seo Title</label>
            <input
              placeholder="Enter Seo Title"
              defaultValue={preSeoData!=undefined ? preSeoData.title:''}
              className="px-3 py-2 outline-none border border-gray-400 mb-4"
              onChange={handleSeoTitle}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg mb-2 text-gray-600">Seo Description </label>
            <textarea
              defaultValue={preSeoData!=undefined ? preSeoData.desc:''}
              placeholder="Enter Seo Description"
              className="px-3 py-2 outline-none border border-gray-400 mb-4"
              onChange={handleSeoDesc} 
            />   
          </div>

         </div>
 );
};

export default SeoForm;