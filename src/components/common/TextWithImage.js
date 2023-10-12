import React from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import textImg from '../../images/text-img.png';
import PrimaryButton  from "../Ui/buttons/button"
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { LazyLoadImage } from "react-lazy-load-image-component";


export const TextWithImage = ({data}) => {
  // console.log(data);
  // const imgPath = "https://dev.ceramicarts.com/categoryBanners/";
  return (
       <div className="flex flex-col mx-auto lg:flex-row lg:py-7 py-6 justify-between lg:gap-[190px] gap-10 items-top">
         <div className="w-full lg:w-1/2">
           <h2 className="text-2xl leading-7 mb-2 font-medium">{data.category_name}</h2>
           <p dangerouslySetInnerHTML={{__html: data.description}}></p>
         </div>
         <div className="w-full lg:w-1/2">
           {data?.filename &&(
              <div className="rounded-xl bg-white border-8 w-full lg:w-[500px] lg:h-[350px] overflow-hidden lg:float-right">
                {data?.content_type === "image" && (
                  <LazyLoadImage src={process.env.REACT_APP_DEV_HOST+"categoryBanners/"+data?.filename} alt={data.category_name} className="w-full object-center object-fill h-auto"  />
                )}
                {data?.content_type === "video" && (
                  <video className="w-full h-full object-center object-fill h-full" controls>
                    <source src={process.env.REACT_APP_DEV_HOST+"categoryBanners/"+data?.filename} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
         </div>
       </div>
 );
};