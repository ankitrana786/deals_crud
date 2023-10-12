import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import axios from "axios";
// import { Context } from "../../context/";
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import defaultImage from '../../images/p_defaultImage.png';
import PrimaryButton  from "../Ui/buttons/button"
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { ROUTES } from "../../utils/routes"
import { LazyLoadImage } from "react-lazy-load-image-component";
import getStorageData from '../../hooks/useLocalStorage';
import ADDTOCARTAPI from "../../API/addToCart.php";
import NOTIFYAPI from "../../API/NotifyItem.php";


export const ProductGridCard = ({data, ItemAddedToCart}) => {
   // console.log(CartContext);
   const { addToCart, state, cartItemCount } = useContext(CartContext);
   // console.log(state);
  //  const [show, setShow] = useState('hidden');
   const userData = getStorageData("token", null);
   // console.log(userData);
   const [showStatus, setShowStatus] = useState('hidden');
   const [message, setMessage] = useState('');
   const [stoctCTA, setstoctCTA] = useState('block');
   const [count, setCount] = useState(1);

   const statusHandler = async ()=>{
      data.count = count;
      const requestOptions = {
        customerId: userData[0]?.CUSTOMER,
        cust_level: userData[0]?.LEVEL,
        countryCode: userData[0]?.COUNTRY,
        cname: userData[0]?.primaryName,
        session: userData[0]?.SESSION,
        primaryEmail: userData[0]?.primaryEmail,
        totalCount: data.count,
        cart: data
      }  
      // console.log(requestOptions)
      // let URL = 'https://dev.ceramicarts.com/API/NotifyItem.php';
      // NOTIFYAPI
      await axios.post(NOTIFYAPI, requestOptions)
        .then(res => {
          console.log(res);
          if(res.data){
            if(res.data.NOTIFY === 1){
              setShowStatus('block');
              setstoctCTA('hidden');
              setMessage("You already marked this item as notification.")
            }else{
              setShowStatus('block');
              setstoctCTA('hidden');
              setMessage("We will notify you when available.")
            }
          }
      })
      // setShowStatus('block');
      // setstoctCTA('hidden');
  }

  //  const showPopupHandler = () => {
  //    console.log("I m ere");
  //   return (
  //     show === 'hidden' ? setShow('block') : setShow('hidden')
  //   )
  // }
  
  // const  { dispatch } = useContext(Context);
  const handleIncrement = () => {
      // data.count = count;
      setCount(prevCount => prevCount + 1);
    };
  const handleDecrement = () => {
      setCount(prevCount => prevCount - 1);
  };
  const truncate = (str)=>{
      return str?.length > 38 ? str.substring(0, 38) + "..." : str;
  }
  const sendToCart = async () =>{
    // console.log(data);
    data.count = count;
    addToCart(data)
    const requestOptions = {
      customerId: userData[0]?.CUSTOMER,
      cust_level: userData[0]?.LEVEL,
      countryCode: userData[0]?.COUNTRY,
      cname: userData[0]?.primaryName,
      session: userData[0]?.SESSION,
      primaryEmail: userData[0]?.primaryEmail,
      totalCount: data.count,
      cart: data
    }  
    // console.log(requestOptions)
    // let URL = 'https://dev.ceramicarts.com/API/AddToCart.php';
    // ADDTOCARTAPI
    await axios.post(ADDTOCARTAPI, requestOptions)
      .then(res => {
        // console.log(res);
        const obj = res.data;
        if(obj){
          ItemAddedToCart();
          
        }

    })
  }
  // dynamic button code
  
  // <PrimaryButton btnText="ADD TO CART " variant="primary" className="absolute bottom-0 text-white font-bold lg:opacity-0 transition ease-in-out group-hover:opacity-100 duration-300 w-full hidden" handleClick={() => {dispatch({type: "ADD_TO_CART", payload: data})}} />
  return (
    <>
      {/* <NotifyPopup nameClass={show} close={showPopupHandler} content={data} />  */}
       <div className="group cardHover transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product cursor-pointer">
         <div className="mb-4 md:mb-0 relative">
           <div className="">
           	  <div className="w-full sm:h-[300px] md:h-[234px] lg:h-full relative">
               <Link
                  to={ROUTES.PRODUCT+"/"+data.Item_Code}>
                  <LazyLoadImage src={(data.ImageFile != '') ? process.env.REACT_APP_IMAGE_URL+data.ImageFile : defaultImage} alt={data?.Item_Desc} className="w-full h-full object-fill bg-gray-300"  />
              	</Link>
                {parseInt(data?.MODIFY_STATUS) !== 0 && parseInt(data?.ONHAND) < 1 && (
                  <div className="uppercase text-sm absolute top-0 right-0 bg-transaprentBg p-1 text-white">
                    Special Order
                  </div>
                )}
                {parseInt(data?.MODIFY_STATUS) === 0 && parseInt(data?.ONHAND) === 0 && (
                  <div className="uppercase text-sm absolute top-0 right-0 bg-transaprentBg p-1 text-white">
                    Sold Out
                  </div>
                )}
              </div>
            </div>
         </div>
          <div className="w-full md:w-[232px] p-2.5 text-left">
              <p className="leading-6 text-sm text-gray-400 font-normal">Item: {data?.Item_Code}</p>
              <h1 className="font-bold h-[40px] capitalize leading-[21px] text-black text-base  mb-2"><Link
                  to={ROUTES.PRODUCT+"/"+data.Item_Code}>{truncate(data?.Item_Desc)}</Link></h1>
             {userData[0] != null && (parseInt(data?.MODIFY_STATUS) !== 0 || parseInt(data?.ONHAND) > 0) && (
               <>
                  <div className="flex flex-wrap flex-row py-1 items-center ">
                    <h1 className="text-sm text-gray-800 pr-2">QTY:</h1>
                    <div className="flex items-center border border-gray-250 pl-2 rounded h-[32px]">
                        <h5 className="text-white-100 text-xs">{count}</h5>
                        <div className="flex flex-col space-y-1">
                          <button onClick={handleIncrement}  className={"disabled px-2 text-sm text-white-100"}><IoIosArrowUp className="w-2 h-2" /></button>
                          <button onClick={handleDecrement} disabled={count > 1 ? false:true}  className="px-2 text-sm text-white-100"><IoIosArrowDown className="w-2 h-2"/></button>
                        </div>
                    </div>
                  </div>
                
                  <h3 className="text-green-200 mb-5  leading-6 font-semibold text-sm">
                    ${parseFloat(data?.ITEM_PRICE).toFixed(2)} 
                      {parseFloat(data?.ITEM_PRICE).toFixed(2) < parseFloat(data?.ITEM_RETAIL_PRICE).toFixed(2) && (
                        <span className="line-through text-sm text-gray-400 font-normal pl-1">${parseFloat(data?.ITEM_RETAIL_PRICE).toFixed(2)}  </span>
                      )} 
                      <span className="text-sm text-gray-400 ">/{data?.SellUoM} </span>
                    
                  </h3>
                </>
              )}
              {userData[0] != null ? (
                <>
                  {parseInt(data?.ONHAND) > 0 ? (
                    <PrimaryButton btnText="ADD TO CART" variant="primary" className="text-white font-bold w-full" handleClick={sendToCart} /> 
                  ) : (parseInt(data?.MODIFY_STATUS) === 0) ? (
                     <PrimaryButton type="button" handleClick={statusHandler} btnText="NOT AVAILABLE : Notify Me" variant="error" className={`${stoctCTA} font-bold w-full`} />
                  ) : (
                      <PrimaryButton btnText="ADD TO CART" variant="tooltip" className="text-white font-bold w-full" orderDt={data?.vOrdByDt} arrivalDt={data?.vDueDate} handleClick={sendToCart} />
                  )}
                </>
              ) : (
                <a href={ROUTES.LOGINPAGE}>
                  <PrimaryButton type="button" btnText="Login to view price" variant="error" className={`font-bold w-full`} />
                </a>
              )}
            <div className={`${showStatus} px-1 py-2 text-sm text-center bg-green-800 text-[13px] text-white font-normal`}>{message}</div>
              {data?.Dimension && (<p className="leading-6 text-sm text-gray-400 font-normal mb-2">Dimension:<br/>{data?.Dimension}</p>)}
          </div>
       </div>
    </>
 );
};