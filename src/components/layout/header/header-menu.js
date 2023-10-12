import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import MenuItems from "./menuItem";
import { IoIosArrowDown } from "react-icons/io";
import HeaderLoader from "../../Ui/loaders/header-loader";

// console.log(menuArray);

const HeaderMenu = ({ data, className }) => {
   // const [loader, setLoader] = useState(false);
    // console.log(data);
    // <>
    //                                             <MenuItem depthLevel={depthLevel && depthLevel} menuTitle={subMenuObject.PRD_DESC} menuData={subMenuObject?.subMenu && subMenuObject?.subMenu[0]}/>
    //                                         </>
    return ( 
    <> 
        {data != undefined && (
            <Router>

                <nav className="headerMenu w-full hidden lg:block lg:flex">
                    {Object.keys(data).map((menukey, menuValue) => (
                        <div key={"cmenu_"+menuValue} className="menuItem group cursor-pointer py-4">
                            <Link
                                to="/"
                                key={menuValue}
                                className="inline-flex items-center text-lightBlack text-sm lg:font-bold xl:text-base text-heading px-3 xl:px-4 py-2 font-normal relative group-hover:text-purpleBase"
                            >
                               <span className="pr-1.5"> {data[menukey].PRD_DESC}</span>

                                {(data[menukey]?.subMenu && data[menukey].subMenu[0].length >0) &&(
                                    <IoIosArrowDown
                                      className={`transition duration-200 ease-in-out transform text-heading group-hover:-rotate-180 group-hover:text-purpleBase`}
                                    />
                                )}

                            </Link> 
                             {(data[menukey]?.subMenu && data[menukey].subMenu[0].length >0) && (
                                <div className="container mx-auto px-3 xl:px-4 bg-white megaMenu absolute h-min max-h-[75vh] pb-4 overflow-y-scroll pt-4 shadow-header left-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                                       <div className={`w-full gap-2 ${data[menukey].subMenu[0].length > 2 ? 'columns-6': 'columns-4 max-w-4xl'}`}>
                                        {data[menukey].subMenu[0].map((subMenuObject, index) => {
                                            return(
                                                <MenuItems items={subMenuObject} key={"mitems_"+index} />
                                            )
                                        })}
                                    </div>   
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </Router>
            )
        } 
    </>
    );
};

export default HeaderMenu;