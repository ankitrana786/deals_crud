import React from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';

const CopyRight = () => {
  return (
      <div className="text-center w-full bg-zblack text-white py-4">
        <h1 className="text-xs">© 2023  Ceramic Arts. All rights reserved </h1>
      </div>    
 );
};

export default CopyRight;