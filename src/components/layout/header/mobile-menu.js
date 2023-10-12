import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowDown from '../../../images/arrow-down.svg';
import MenuIcon from "../../Ui/icons/menu-icon";
import HomeIcon from "../../Ui/icons/home-icon";
import UserIcon from "../../Ui/icons/user-icon";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import Logo from '../../Ui/Logo';
import Close from '../../../images/close.svg';
import MenuMenuItems from "./mobile-menu-items";
import { IoIosArrowDown } from "react-icons/io";
import { ROUTES } from "../../../utils/routes";
import getStorageData from '../../../hooks/useLocalStorage';
import CustomerLogoutAPI from "../../../API/customerLogout.php";


const MobileMenu = ({menuArray, isOpen, setIsOpen}) => {
    // console.log(menuArray);
    const userData = getStorageData("token", null);
    const [isActive, setIsActive] = useState('');

const handleToggle = (index) => {
    // console.log(index);
    setIsActive(index);
    if(isActive == index){
        setIsActive('');
    }
    // console.log(menuArray);
};

  const logout = async ()=>{
    const requestOptions = {
      customerId:(userData[0]?.CUSTOMER) ? userData[0]?.CUSTOMER : "",
      cust_level: (userData[0]?.LEVEL) ? userData[0]?.LEVEL : "",
      countryCode: (userData[0]?.COUNTRY) ? userData[0]?.COUNTRY : "",
      cname: (userData[0]?.CUSTNAME) ? userData[0]?.CUSTNAME : "",
      session: (userData[0]?.SESSION) ? userData[0]?.SESSION : ""
    } 
    
    // let url = "https://dev.ceramicarts.com/API/ClearCustomer.php";
    //CustomerLogoutAPI
      await axios.post(CustomerLogoutAPI, requestOptions)
          .then(res => {
            console.log(res);
            
      })
    localStorage.removeItem("token");
    window.location.href = ROUTES.LOGINPAGE;
  }
  return (
    <>
        {menuArray != undefined && (
            <div className="flex flex-col justify-between w-full h-full">
                <div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
                        <Logo />
                    <button
                        className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        aria-label="close"
                    >
                        <img src={Close} className="text-black mt-1 md:mt-0.5" />
                    </button>
                </div>
                <div className="flex flex-col py-7 px-0 lg:px-2 text-heading">
                    <Router>
                        {Object.keys(menuArray).map((menukey, menuValue) => (
                            <div key={menuValue} className="menuItem group cursor-pointer py-3 relative">
                                <div
                                    key={menuValue}
                                    className="flex items-center justify-between relative"
                                    onClick={() => handleToggle(menuArray[menukey].PRD_DESC)}
                                >

                                    <span className="block w-full">
                                       {menuArray[menukey].PRD_DESC}
                                    </span>

                                   {(menuArray[menukey]?.subMenu && menuArray[menukey].subMenu[0].length >0) &&(
                                        <IoIosArrowDown
                                          className={`absolute right-0 transition duration-200 ease-in-out transform text-heading ${(isActive === menuArray[menukey].PRD_DESC) && '-rotate-180'}`}
                                        />
                                    )}
                                </div>  
                                 {(menuArray[menukey]?.subMenu && menuArray[menukey].subMenu[0].length >0) && (
                                    <div className={(isActive == '' || isActive != menuArray[menukey].PRD_DESC) ? 'transition-opacity ease-in-out hidden w-full megaMenu px-2 pt-2 opacity-0' : 'transition-opacity ease-in-out block w-full megaMenu px-2 pt-2 opacity-100'}>
                                         <div>
                                            {menuArray[menukey].subMenu[0].map((subMenuObject, index) => {
                                                return(
                                                    <MenuMenuItems items={subMenuObject} key={index} />
                                                )
                                            })}
                                        </div>   
                                    </div>
                                )}
                            </div>
                        ))}
                        {userData[0] != null && (
                            <button className="bg-loginbtnBase px-4 py-1 text-white mr-2" type="button" onClick={logout}>Logout</button>
                        )}
                    </Router>

                </div>
            </div>
        )}
    </>
 );
};

export default MobileMenu;