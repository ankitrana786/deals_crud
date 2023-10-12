import React from 'react';
import SearchIcon from "../../Ui/icons/search-icon";
import MenuIcon from "../../Ui/icons/menu-icon";
import HomeIcon from "../../Ui/icons/home-icon";
import UserIcon from "../../Ui/icons/user-icon";
import Drawer from "../../common/drawer/drawer";
import MobileMenu from "../header/mobile-menu";
import { ROUTES } from "../../../utils/routes";
import CartButton from "../../Ui/buttons/cartButton";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import getStorageData from '../../../hooks/useLocalStorage';

const BottomNavigation = ({ menuData }) => {
    // console.log(menuData);
    const [isOpen, setIsOpen] = React.useState(false);
    const userData = getStorageData("token", null);
    
  return (
    <>
        <div className="lg:hidden fixed z-20 bottom-0 flex items-center justify-between text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4">
            <button
                aria-label="Menu"
                className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
                onClick={() => setIsOpen(true)}
            >
                    <MenuIcon />
            </button>
            <button
                className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
                onClick=""
                aria-label="search-button"
            >
                    <SearchIcon />
            </button>
            <a href="/" className="flex-shrink-0">
                <HomeIcon />
            </a>
            {userData[0] != null ? (
                <>
                <a href="/CustomerPortal" className="flex-shrink-0">
                    <UserIcon/>
                </a>
                <CartButton varient="mobile" />
                </>
            ):(
                <a href={ROUTES.LOGINPAGE} className="flex-shrink-0">
                    <UserIcon/>
                </a>
            )}
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <MobileMenu menuArray={menuData} isOpen={isOpen} setIsOpen={setIsOpen} />
        </Drawer>
    </>
 );
};

export default BottomNavigation;