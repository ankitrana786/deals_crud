import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CartContext } from '../../context/cart/CartContext';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import defaultImage from '../../images/p_defaultImage.png';
import PrimaryButton  from "../Ui/buttons/button"
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { ROUTES } from "../../utils/routes";
import { LazyLoadImage } from "react-lazy-load-image-component";
import getStorageData from '../../hooks/useLocalStorage';
import ADDTOCARTAPI from "../../API/addToCart.php";
import close_ic from '../../images/close_ic.svg';

export const ProductList = ({data, varient, ItemAddedToCart, updateCart}) => {
  // console.log(data)
  const { addToCart, state, removeItem, increase, decrease, toggleSelectProduct } = React.useContext(CartContext);
  // console.log(state)
  const [show, setShow] = useState('hidden');
  const userData = getStorageData("token", null);
  const [showStatus, setShowStatus] = useState('hidden');
  const [stoctCTA, setstoctCTA] = useState('block');
  const [count, setCount] = useState((varient === 'cart') ? parseInt(data.QTY) : 1);
  useEffect(()=>{
  }, [count, state, data])
  const statusHandler =()=>{
    setShowStatus('block');
    setstoctCTA('hidden');
  }

  const showPopupHandler = () => {
  return (
      show === 'hidden' ? setShow('block') : setShow('hidden')
    )
  };
  
  const handleIncrement = () => {
      if(updateCart !== undefined){
        updateCart(1)
      }
      setCount(prevCount => prevCount + 1);
      increase(data)
    };
  const handleDecrement = () => {
      if(updateCart !== undefined){
        updateCart(1)
      }
      setCount(prevCount => prevCount - 1);
      decrease(data)
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
        console.log(res);
        const obj = res.data;
        if(obj){
          ItemAddedToCart()
        }

    })
  }
  const deleteItem = (id)=>{
    // console.log(id);
    removeItem(id);
    updateCart(1)
  }
  const handeCheckboxChange =(event, id)=>{
    // console.log(id)
    const isChecked =  (!event.currentTarget.checked) ? "0" : "1";
    // console.log(isChecked)
    updateCart(1)
    toggleSelectProduct(id, isChecked)
  }
  return (
    <>
    {varient === 'cart' ? (
      <div className="cardHover flex flex-wrap flex-row border border-gray-300 w-full mb-4 relative">
        <div className="mb-4 md:mb-0 w-full md:w-1/5 lg:w-1/4">
          <div className="w-full md:w-[180px] md:h-[180px] relative">
            <LazyLoadImage src={(data.ITEM_IMAGE_FILE != '') ? process.env.REACT_APP_IMAGE_URL+data.ITEM_IMAGE_FILE : defaultImage} alt={data?.ITEM_DESCRIPTION} className="w-full max-h-[242px] lg:max-h-auto h-full object-fill bg-gray-300"  />
            <div className="text-sm absolute top-0 left-0 bg-transaprentBg p-1 text-white">
              <input type="checkbox" checked={data.SELECTED === '1'} onChange={(event)=>handeCheckboxChange(event, data.ITEM_CODE)} id={data.ITEM_CODE} /> <label for={data.ITEM_CODE}>Selected</label>
            </div>
          </div>
        </div>
        <div className="px-5 pt-4 text-left w-full md:w-4/5 lg:w-3/4">
          <div className="relative">
            <p className="text-gray-800 leading-8 font-normal">Item: {data?.ITEM_CODE}</p>
          </div>
          <h1 className="font-bold leading-6 text-black text-base pb-4"><Link to={ROUTES.PRODUCT+"/"+data.ITEM_CODE}>{data?.ITEM_DESCRIPTION}</Link></h1>
          <footer className="cart-footer border-gray-300 py-4 flex flex-wrap flex-row items-center w-full justify-between">
              <div className="flex flex-wrap items-center">
                <h1 className="text-base text-gray-800 pr-2">QTY:</h1>
                <div className="flex items-center border border-gray-250 pl-2 rounded h-[32px]">
                    <h5 className="text-white-100 text-xs">{count}</h5>
                    <div className="flex flex-col space-y-1">
                      <button onClick={handleIncrement}  className={"disabled px-2 text-sm text-white-100"}><IoIosArrowUp className="w-2 h-2" /></button>
                      <button onClick={handleDecrement} disabled={count > 1 ? false:true}  className="px-2 text-sm text-white-100"><IoIosArrowDown className="w-2 h-2"/></button>
                    </div>
                </div>
                <h3 className="text-black font-semibold text-sm ml-5 lg:mt-0">
                  ${parseFloat(data.ITEM_PRICE).toFixed(2)} 
                  <span className="text-sm text-gray-400 hidden">/{data?.ITEM_SELL_UOM} </span>
                </h3>
              </div>
              <h3 className="text-green-200 font-semibold text-sm ml-5 lg:mt-0 text-right">
                ${(parseFloat(data?.ITEM_PRICE).toFixed(2)*count).toFixed(2)}   
              </h3>
          </footer>
          <div className="text-right absolute top-0 right-0 width-auto flex"><button className="w-[77px] text-xs p-1" onClick={()=>deleteItem(data.ITEM_CODE)}>REMOVE <img src={close_ic} alt="close" className="w-3 inline-block" /></button></div>
        </div>
      </div>
    ) :(varient === 'order') ? (
      <div className="cardHover flex flex-wrap flex-row border border-gray-300 w-full mb-4 relative">
         <div className="mb-0 md:mb-0 ">
             <div className="">
               <Link
                  to={ROUTES.PRODUCT+"/"+data.CODE}
                  className="block"
                >
                   <div className="w-[146px] h-[146px] relative">
                    <LazyLoadImage src={(data.ImageFile != '') ? process.env.REACT_APP_IMAGE_URL+data.ImageFile : defaultImage} alt={data?.Item_Desc} className="w-full h-full object-fill bg-gray-300"  />
                    
                  </div>
                </Link>
              </div>
         </div>
        <div className="px-5 py-2 text-left w-1/2">
            <p  className="text-gray-800 leading-8 font-normal">Item: {data?.CODE}</p>
            <h1 className="font-bold leading-6 text-black text-base pb-4"><Link
              to={ROUTES.PRODUCT+"/"+data.CODE}>{data?.DESC}</Link></h1>
            
                <h3 className="text-green-200 mb-2  leading-6 font-semibold text-sm">
                  ${parseFloat(data?.BVUNITPRICE).toFixed(2)} 
                </h3>
                <h1 className="text-base text-gray-800 pr-2">QTY: {data?.BVORDQTY} </h1>
        </div>
       </div>
    ):(
       <div className="cardHover flex flex-wrap flex-row transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product">
         <div className="mb-4 md:mb-0 ">
             <div className="">
               <Link
                  to={ROUTES.PRODUCT+"/"+data.Item_Code}
                  className="block"
                >
                   <div className="w-[246px] h-[246px] relative">
                    <LazyLoadImage src={(data.ImageFile != '') ? process.env.REACT_APP_IMAGE_URL+data.ImageFile : defaultImage} alt={data?.Item_Desc} className="w-full h-full object-fill bg-gray-300"  />
                    
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
                </Link>
              </div>
         </div>
        <div className="px-5 pt-4 text-left w-1/2">
            <p  className="text-gray-800 leading-8 font-normal">Item: {data?.Item_Code}</p>
            <h1 className="font-bold leading-6 text-black text-base pb-9"><Link
              to={ROUTES.PRODUCT+"/"+data.Item_Code}>{data?.Item_Desc}</Link></h1>
            {data?.Dimension && (<p className="leading-6 text-sm text-gray-400 font-normal mb-2">Dimension: {data?.Dimension}</p>)}
            {userData[0] != null ? (
              <>
                <h3 className="text-green-200 mb-5  leading-6 font-semibold text-sm">
                  ${parseFloat(data?.ITEM_PRICE).toFixed(2)} 
                    {parseFloat(data?.ITEM_PRICE).toFixed(2) < parseFloat(data?.ITEM_RETAIL_PRICE).toFixed(2) && (
                      <span className="line-through text-sm text-gray-400 font-normal pl-1">${parseFloat(data?.ITEM_RETAIL_PRICE).toFixed(2)}  </span>
                    )} 
                    <span className="text-sm text-gray-400 ">/{data?.SellUoM} </span>
                </h3>
                <div className="flex flex-wrap flex-row">
                  {(parseInt(data?.MODIFY_STATUS) !== 0 || parseInt(data?.ONHAND) > 0) && (
                    <>
                      <h1 className="text-base text-gray-800 pr-2">QTY:</h1>

                      <div className="flex items-center border border-gray-250 pl-2 rounded h-[32px]">
                          <h5 className="text-white-100 text-xs">{count}</h5>
                          <div className="flex flex-col space-y-1">
                            <button onClick={handleIncrement}  className={"px-2 text-sm text-white-100"}><IoIosArrowUp className="w-2 h-2" /></button>
                            <button onClick={handleDecrement} disabled={count > 1 ? false:true}  className="px-2 text-sm text-white-100"><IoIosArrowDown className="w-2 h-2"/></button>
                          </div>
                      </div>
                    </>
                  )}
                    {parseInt(data?.ONHAND) > 0 ? (
                        <PrimaryButton btnText="ADD TO CART" variant="primary" className="mr-5 font-semibold delay-700 py-1.5 w-64 h-9 lg:ml-4 mt-4 lg:mt-0 text-white" handleClick={sendToCart} /> 
                      ) : (parseInt(data?.MODIFY_STATUS) === 0) ? (
                         <PrimaryButton type="button" handleClick={statusHandler} btnText="NOT AVAILABLE : Notify Me" variant="error" className={`${stoctCTA} mr-5 font-semibold delay-700 py-1.5 w-64 h-9 mt-4 lg:mt-0 font-bold w-full`} />
                      ) : (
                          <PrimaryButton btnText="ADD TO CART" variant="tooltip" className="mr-5 font-semibold delay-700 py-1.5 w-64 h-9 lg:ml-4 mt-4 lg:mt-0 text-white font-bold" orderDt={data?.vOrdByDt} arrivalDt={data?.vDueDate} handleClick={sendToCart} /> 
                      )}
                  </div>
              </>
            ) : (
                <a href={ROUTES.LOGINPAGE}>
                  <PrimaryButton type="button" btnText="Login to view price" variant="error" className={`mr-5 font-semibold delay-700 py-1.5 w-64 h-9 lg:ml-4 mt-4 lg:mt-0`} />
                </a>
            )}
            <div className={`${showStatus} px-1 py-2 text-sm text-center bg-green-800 text-[13px] text-white font-normal`}>We will notify you when available</div>
            
        </div>
       </div>
    )}
     
    </>
 );
};
