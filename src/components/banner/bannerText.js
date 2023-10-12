import React from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import banner3 from '../../images/banner/banner-3.png';


const bannerText = () => {
  return (
       <div className="flex flex-wrap flex-row lg:px-24 justify-between bg-lightPurple py-10">
       	  <div className=" w-2/5">
          	<h1 className="text-2xl font-bold ">Textured Alligatoer</h1>
            <p className="text-sm leading-5 py-5">With Amaco Textured Alligator Glazes, no two pieces are ever alike due to the many variations in texture which occur in firing. You can expect variegated matte textures to predominate at the lower firing temperatures, while gloss textures are more common at higher temperatures. For firings in between the extremes, there will be a mingling of matte and gloss.
              <br/>
              <br/>
              We recommend firing LT-22 Tahitian Blue at Cone 06 (1855°F, 1013°C) because
              it flows more than other glazes in this series.</p>
          </div>
          <div className="w-1/2">
            <img src={banner3} className="w-full object-cover rounded-xl"/>
          </div>
        </div>
 );
};

export default bannerText ;