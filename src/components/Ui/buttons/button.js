import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { IoInformationCircleSharp } from "react-icons/io5";

const PrimaryButton = ({btnText,variant,className,orderDt, arrivalDt, type='submit', handleClick}) => {
	 

	const rootClassName = cn(
		"px-2 py-2 text-sm text-center rounded-full",
		{
			"bg-green-250 rounded-none":
				variant === "primary",
		},
		{
			"border-green-800 rounded-none text-green-250":
				variant === "primaryOutline",
		},
		{
			"w-full border-2 border-green-800 rounded-none text-green-250":
				variant === "secondary",
		},
		{
			"w-full bg-orange-400 rounded-none justify-center flex items-center gap-3 tooltipWrap relative":
				variant === "tooltip",
		},
		{
			"w-full bg-red-800 rounded-none gap-3 text-white":
				variant === "error",
		},
		{
			"w-full bg-loginbtnBase rounded-none gap-3 text-white":
				variant === "action",
		},
		{
			"w-full bg-gray-450 rounded-none gap-3 text-black":
				variant === "greybutton",
		},
		className
	);
  return (
		<button type={type} className={rootClassName} onClick={handleClick}>
            {variant =='tooltip' && (<IoInformationCircleSharp className="w-[22px] h-[22px]" />)} {btnText}
            {variant =='tooltip' && ( <p className="tooltipInfo">Order by <span  className="text-orange-400 font-bold"> {orderDt}</span> and we expect it to arrive <span className="text-green-200 font-bold"> {arrivalDt}</span> </p>)}
      	</button>
 );
};

export default PrimaryButton;