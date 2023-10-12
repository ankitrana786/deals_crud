import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import image1 from '../../images/img1.png';
import { IoIosSearch } from "react-icons/io";
import OverlayLabel  from "../Ui/labels/overlaylabel";



const CardWithText = () => {
  const bodyArray = [
    {label: "Hot Offers", color: "bg-yellow", image: image1, text:"Get In The Silkscreen/1 SPO"},
    {label: "New", color: "bg-yellow", image: image1, text:"Home Puppy Planter/4 SPO"},
    {label: "Did You Know?", color: "bg-red-300", image: image1, text:"Get In The Silkscreen/1 SPO"}  
  ];
  
  return (
      <div className="md:flex space-y-6 md:space-y-0 md:gap-10 mx-auto justify-between items-center my-10">
         {bodyArray.map((card, index)=>(
            <div className="w-full md:w-1/3">
              <div className="border border-gray-150 p-2 rounded-md mb-4 md:mb-0">
                <div className="relative">
                  <img src={card.image} className="rounded w-full"/>
                  <OverlayLabel text={card.label} bgColor={card.color}/>
                </div>
              </div>
              <p className="mt-6 text-lightShade text-center font-semibold text-lg">{card.text}</p>
            </div>
          ))}
      </div>
 );
};

export default CardWithText;