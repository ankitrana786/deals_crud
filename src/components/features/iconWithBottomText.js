import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import sale from '../../images/sale.png';
import article from '../../images/article.png';
import idea from '../../images/idea.png';
import cafe from '../../images/cafe.png';
import booking from '../../images/booking.png';




const IconWithBottomText = () => {
  
  
  return (
       <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-nowrap lg:gap-12 px-10 lg:px-20 py-6 md:py-0 justify-center text-center my-9">
           <div className="w-full md:w-1/3 lg:w-1/5">
               <img src={sale} className="w-36 h-36 mx-auto"/>
               <div className="text-center mt-3 p-6">
                   <p className="text-base text-black mx-auto">Never Miss a Sale </p>
               </div> 
           </div>
           <div className="w-full md:w-1/3 lg:w-1/5">
               <img src={article} className="w-36 h-36 mx-auto"/>
               <div className="text-center mt-3 p-6">
                   <p className="text-base text-black mx-auto">Product Inormation Articles</p>
               </div>
           </div>
           <div className="w-full md:w-1/3 lg:w-1/5">
               <img src={idea} className="w-36 h-36 mx-auto"/>
               <div className="text-center mt-3 p-6">
                   <p className="text-base text-black mx-auto">Business Ideas</p>
               </div>
           </div>
            <div className="w-full md:w-1/3 lg:w-1/5">
               <img src={cafe} className="w-36 h-36 mx-auto"/>
               <div className="text-center mt-3 p-6">
                   <p className="text-base text-black mx-auto">Add a Cafe</p>
               </div>
           </div>
            <div className="w-full md:w-1/3 lg:w-1/5">
               <img src={booking} className="w-36 h-36 mx-auto"/>
               <div className="text-center mt-3 p-6">
                   <p className="text-base text-black mx-auto">Digital Booking System</p>
               </div>
           </div>
       </div>
 );
};

export default IconWithBottomText;