import React, { useState } from "react";
import {
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
        <li className="text-gray-900 text-sm leading-1 font-medium ml-4">
          <MenuItems items={hasSubMenu} key={menuIndex} dept={dept} />
        </li>
    ):(

      <li className={`text-black text-sm leading-1 py-1 ${dept < 2 ? "font-bold" : "py-0"}`}>
        <a href={`/collection/${hasSubMenu.CODE}`} className="leading-1 block"> {dept > 1 ? "- " + hasSubMenu.PRD_DESC : hasSubMenu.PRD_DESC}</a>
      </li>
    )}
    </>
  );

const MenuItems = ({items, key, dept }) => {
  const [activeMenus, setActiveMenus] = useState([]);
  // console.log(items);
  if(dept !== undefined){
    // console.log("jhakkass");
    dept = dept +1
  }
  return (
   <div className={"pr-2"}>
   {items.subMenu && items.subMenu[0].length > 0 ? (
    <>
      {dept === undefined ? (
        <div className="">
           <a
                href={`/collection/${items.CODE}`}
                className={"menu-style py-1"}
            >
              {items.PRD_DESC}
                  
          </a>
        </div>
      ):(
        <div className="mt-1">
           <Link
                to="#"
                className={"menu-style py-1 text-black font-bold"}
            >
              {items.PRD_DESC}
            
          </Link>
        </div>
      )}
      <ul className={"ml-4 mt-1 inherit-menu"}>
        {items.subMenu[0].map((subItems, indexVal)=>{
          const dept = 1;
          return (
            <ListMenu
              key={"subItem_"+indexVal}
              dept={dept}
              data={subItems}
              hasSubMenu={subItems}
              menuIndex={indexVal}
              
            />
          )
        })}
      </ul>
    </>
    ) : (
      <div className="w-44 pr-2 break-inside mb-0 mt-0">
         <a
              href={`/collection/${items.CODE}`}
              className="menu-style py-1 leading-1 block"
          >
            {dept > 1 ? "- " + items.PRD_DESC : items.PRD_DESC}
          
        </a>
      </div>
    )}
  </div>
 );
};

export default MenuItems;