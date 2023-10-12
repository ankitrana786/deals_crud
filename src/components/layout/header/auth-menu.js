import React from 'react';
import flag from '../../../images/flag.svg';
import axios from "axios";
import usflag from '../../../images/usflag.svg';
import phone from '../../../images/phone-icon.svg';
import { ROUTES } from "../../../utils/routes";
import getStorageData from '../../../hooks/useLocalStorage';
import { CartContext } from '../../../context/cart/CartContext.js';
import CustomerLogoutAPI from "../../../API/customerLogout.php";
import CartButton from "../../Ui/buttons/cartButton";


const AuthMenu = () => {
  const userData = getStorageData("token", null);
  const { cartItemCount } = React.useContext(CartContext);
  // console.log(userData);

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
    localStorage.removeItem("ceramics-cart");
    window.location.href = ROUTES.LOGINPAGE;
  }
  return (
   <div className="">
     <div className="flex justify-end md:mb-3 w-full items-center">
	     <div>
	     	{(userData[0] === null || userData[0]?.COUNTRY === 'CDN') ? (
          <img src={flag} alt="flag" className="w-6 lg:w-12 mr-4 lg:mr-6" border="0" />
        ) : (
          <img src={usflag} alt="flag" className="w-6 lg:w-12 mr-4 lg:mr-6" border="0" />
        )}
	     </div>
	     <div className="flex items-center">
	     	<span className="rounded-full w-6 h-6 lg:w-10 lg:h-10 text-center bg-gray-300 inline-block"><img src={phone} alt="phone" className="w-3 lg:w-auto mx-auto py-1 lg:py-2" border="0"/></span>
	     	<p className="font-semibold text-xs lg:text-sm ml-2">1-800-265-3232</p>
        {userData[0] != null && (
          <div className="ml-2 hidden lg:block"> 
            <CartButton />
          </div>
        )}
     	</div>
       
     </div>
     {userData[0] != null && (
       <div className="flex items-start gap-4 font-semibold mt-1 mb-1 justify-center">
         <h2 className="text-sm md:text-base">{userData[0].CUSTOMER}</h2>
         <h2 className="text-xs md:text-base text-right">{userData[0].CUSTNAME}<br/><span className="text-sm">User: {userData[0].primaryName}</span></h2>
       </div>
     )}
     {userData[0] != null ? (
       <div className="hidden lg:block">
          <button className="bg-loginbtnBase rounded-full px-8 py-1 text-white mr-2" type="button" onClick={logout}>Logout</button>
          <a href="/CustomerPortal" className="bg-red-100 rounded-full px-8 py-1 text-white">My Account</a>
       </div>
      ) : (
        <div className="hidden md:block">
          <a
            href={ROUTES.LOGINPAGE}
          >
             <button className="bg-loginbtnBase rounded-full px-8 py-1 text-white" >Login</button>
          </a>
             <a
                href="https://dev.ceramicarts.com/Registration"
                target="_blank"
             >
              <button className="bg-createbtnBase rounded-full px-2 py-1 text-white ml-4">Create an Account</button>
            </a>
       </div>
      )}
  </div>
 );
};

export default AuthMenu;