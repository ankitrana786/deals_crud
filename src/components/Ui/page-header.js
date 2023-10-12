import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import bg from '../../images/bg.jpg';

const PageHeader = (JsonData) => {
	 //console.log(JsonData.JsonData);

	/*const rootClassName = cn(
		`absolute top-4 left-2 font-bold text-sm px-3 py-2 rounded-md ${bgColor} ${textColor}`,
    {
      "-bottom-4 top-auto -left-2.5 rounded-r-full rounded-b-full  rounded-tl-full w-24 h-24 text-left pt-8 pl-6":
      variant=="rounded"
    },
	);*/
  const imageUrl= JsonData.JsonData ? "https://dev.ceramicarts.com/categoryBanners/"+JsonData.JsonData.filename:bg;
  //console.log(imageUrl);
  return (
		<div className="">
      <div
        className="flex justify-center relative bg-no-repeat bg-center bg-cover"
        style={{backgroundImage: `url(${imageUrl})`}}
      >
        <div className="absolute top-0 start-0 bg-black w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
        <div className="w-full flex items-center justify-center relative z-10 py-10 xl:py-20">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
            <span className="font-satisfy block font-normal mb-3">
              {JsonData.JsonData?.title}
            </span>
           
          </h2>
        </div>
      </div>
    </div>
 );
};

export default PageHeader;