import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { ROUTES } from "../../../utils/routes";


const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuIndex,
    className = "",
  }) => 
  hasSubMenu != undefined && (
    <>
    {hasSubMenu.subMenu && hasSubMenu.subMenu[0].length > 0 ? (
        <li className="text-gray-900 text-sm leading-7 font-medium">
          <MobileMenuItems items={hasSubMenu} key={menuIndex} dept={dept} />
        </li>
    ):(

      <li className={`text-gray-900 text-sm leading-7 ${dept < 2 ? "py-1 font-medium" : "py-0"}`}>
        <a href={`/collection/${hasSubMenu.CODE}`} className="leading-4 block"> {dept > 1 ? "- " + hasSubMenu.PRD_DESC : hasSubMenu.PRD_DESC}</a>
      </li>
    )}
    </>
  );

const MobileMenuItems = ({items, key, dept }) => {
  const [activeMenus, setActiveMenus] = useState('');
  // console.log(items);
  if(dept != undefined){
    // console.log("jhakkass");
    dept = dept +1
  }
  const handleSubToggle = (index) => {
      // console.log(index);
      setActiveMenus(index);
      if(activeMenus == index){
          setActiveMenus('');
      }
  };
  return (
   <div className={"w-full pr-2 break-inside"}>
   {items.subMenu && items.subMenu[0].length > 0 ? (
    <>
      {dept == undefined ? (
        <div className="mb-1.5">
           <div
                className={"menu-style py-1.5 flex "}
                onClick={() => handleSubToggle(items.PRD_DESC)}
            >
               {items.PRD_DESC}
                <IoIosArrowDown
                  className={`absolute right-0 transition duration-200 ease-in-out transform text-heading ${(activeMenus === items.PRD_DESC) ? '-rotate-180' : '-rotate-90'}`}
                />
          </div>

        </div>
      ):(
        <div className="mb-1.5">
           <Link
                to={`/collection/${items.CODE}`}
                className={"menu-style py-1 text-gray-900 font-medium"}
            >
              {items.PRD_DESC}
            
          </Link>
        </div>
      )}
      {dept > 1 ? (
          <ul className={"ml-4 mb-2 inherit-menu w-full"}>
          {items.subMenu[0].map((subItems, indexVal)=>{
            const dept = 1;
            return (
              <ListMenu
                dept={dept}
                data={subItems}
                hasSubMenu={subItems}
                menuIndex={indexVal}
                
              />
            )
          })}
        </ul>
      ) : (
        <ul className={(activeMenus == '' || activeMenus != items.PRD_DESC) ? 'transition-opacity ease-in-out hidden w-full megaMenu px-2 pt-2 opacity-0' : 'transition-opacity ease-in-out block w-full megaMenu px-2 pt-2 opacity-100'}>
          {items.subMenu[0].map((subItems, indexVal)=>{
            const dept = 1;
            return (
              <ListMenu
                dept={dept}
                data={subItems}
                hasSubMenu={subItems}
                menuIndex={indexVal}
                
              />
            )
          })}
        </ul>
      )}
    </>
    ) : (
      <div className="w-full pr-2 break-inside mb-1.5 mt-2">
         <Link
              to={`/collection/${items.CODE}`}
              className="menu-style py-1.5"
          >
            {items.PRD_DESC}
          
        </Link>
      </div>
    )}
  </div>
 );
};

export default MobileMenuItems;