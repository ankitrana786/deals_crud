import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import painglaze from '../../images/category/pain&glaze.jpg';
import supplies from '../../images/category/supplies.jpg';
import stoneware from '../../images/category/stoneware.jpg';
import canvas from '../../images/category/canvas.jpg';
import glass from '../../images/category/glass.jpg';
import klinssupplies from '../../images/category/klins&supplies.jpg';
import claywheel from '../../images/category/clay&wheel.jpg';
import bisque from '../../images/category/bisque.jpg';
import { IoIosSearch } from "react-icons/io";
import OverlayLabel  from "../Ui/labels/overlaylabel";




const CardWithImage = () => {
  
  return (
      <div className="flex flex-col md:flex-row  md:flex-wrap md:gap-4 lg:gap-2 lg:flex-none lg:grid lg:grid-rows-3 lg:grid-flow-col lg:gap-4 mx-auto mb-10 mt-10 md:mt-10">
         <div className="ml-4 mb-4 rounded-md md:mb-0">
             <div className="relative overflow-hidden">
                <img src={painglaze} className="rounded lg:w-full"/>
                <OverlayLabel text="Paint & Glaze" textColor="text-white" bgColor="bg-leftBannerBase" variant="rounded"/>
              </div>
         </div>
         <div className="ml-4 mb-4 rounded-md md:mb-0">
            <div className="relative overflow-hidden">
              <img src={supplies} className="rounded lg:w-full"/>
              <OverlayLabel text="Supplies" textColor="text-white" bgColor="bg-leftBannerBase" variant="rounded"/>
            </div>
         </div>
         <div className="ml-4  mb-4 rounded-md md:mb-0">
            <div className="relative overflow-hidden">
              <img src={stoneware} className="rounded lg:w-full"/>
              <OverlayLabel text="Stoneware" textColor="text-white" bgColor="bg-leftBannerBase" variant="rounded"/>
            </div>
         </div>
         <div className="md:order-last lg:order-none ml-4  mb-4 rounded-md md:mb-0 lg:row-span-2">
            <div className="relative overflow-hidden">
              <img src={bisque} className="rounded lg:w-full"/>
              <OverlayLabel text="Bisque" textColor="text-white" bgColor="bg-darkPurple" variant="rounded"/>
            </div>
         </div>
         <div className="ml-4  mb-4 rounded-md md:mb-0">
            <div className="relative overflow-hidden">
              <img src={canvas} className="rounded lg:w-full"/>
              <OverlayLabel text="Canvas" textColor="text-white" bgColor="bg-leftBannerBase" variant="rounded"/>
            </div>
         </div>
          <div className="ml-4  mb-4 rounded-md md:mb-0 ">
            <div className="relative overflow-hidden">
              <img src={claywheel} className="rounded lg:w-full"/>
              <OverlayLabel text="Clay & Wheel" textColor="text-white" bgColor="bg-leftBannerBase" variant="rounded"/>
            </div>
         </div>
         <div className="ml-4  mb-4 rounded-md md:mb-0">
            <div className="relative overflow-hidden">
              <img src={klinssupplies} className="rounded lg:w-full"/>
              <OverlayLabel text="Klins & Supplies" textColor="text-white" bgColor="bg-leftBannerBase" variant="rounded"/>
            </div>
         </div>
         <div className="ml-4  mb-4 rounded-md md:mb-0">
            <div className="relative overflow-hidden">
              <img src={glass} className="rounded lg:w-full"/>
              <OverlayLabel text="Glass" textColor="text-white" bgColor="bg-leftBannerBase" variant="rounded"/>
            </div>
         </div>

       </div>
 );
};

export default CardWithImage;