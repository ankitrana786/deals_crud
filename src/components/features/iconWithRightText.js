import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import icon1 from '../../images/home1.svg';
import icon2 from '../../images/home2.svg';
import icon3 from '../../images/home3.svg';



const IconWithRightText = () => {
  
  
  return (
       <div className="w-full h-auto bg-purple-50 md:grid md:grid-cols-3 px-10 lg:px-20 py-6 md:py-0">
           <div className="flex md:justify-center items-center mb-4 lg:mb-0">
               <img src={icon1} className="w-20 h-20"/>
               <div className="flex flex-col">
                   <p className="text-sm text-lightBlack">How to Order </p>
                   <p className="text-sm text-lightBlack">In stock and special offer</p>
               </div> 
           </div>
           <div className="flex md:justify-center items-center">
               <img src={icon2} className="w-20 h-20"/>
               <div className="flex flex-col">
                   <p className="text-sm text-lightBlack">My Account </p>
                   <p className="text-sm text-lightBlack">Your orders at a glance</p>
               </div>
           </div>
           <div className="flex md:justify-center items-center">
               <img src={icon3} className="w-20 h-20"/>
               <div className="flex flex-col">
                   <p className="text-sm text-lightBlack">Shipping, Pickup &</p>
                   <p className="text-sm text-lightBlack">Defective item</p>
               </div>
           </div>
       </div>
 );
};

export default IconWithRightText;