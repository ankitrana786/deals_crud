import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

const OverlayLabel = ({variant,text,bgColor,textColor}) => {
	// console.log(variant);

	const rootClassName = cn(
		`absolute top-4 left-4 font-semibold text-sm px-3 py-2 rounded-md ${bgColor} ${textColor}`,
    {
      "!-bottom-4 !top-auto !-left-2.5 rounded-r-full rounded-b-full  rounded-tl-full w-24 h-24 text-left pt-8 pl-6":
      variant=="rounded"
    },
	);
  return (
		<div className={rootClassName}>
        <p>{text}</p>
    </div>
 );
};

export default OverlayLabel;