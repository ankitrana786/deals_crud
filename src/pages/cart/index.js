import React from "react";
import axios from "axios";
import { ROUTES } from "../../utils/routes";
import {ProductList} from "../../components/products/ProductList";
import { CartContext } from '../../context/cart/CartContext.js';
import CartIcon from '../../images/bag_icon.svg';
import getStorageData from '../../hooks/useLocalStorage';
import PrimaryButton  from "../../components/Ui/buttons/button"
import UPDATECARTAPI from "../../API/UpdateCart.php";
import CLEARCARTAPI from "../../API/clearCart.php";
import CHECKOUTAPI from "../../API/Checkout.php";
import GETPAYMENTINFO from "../../API/getPaymentInfo.php";
import GETSHIPPINGINFO from "../../API/getShippingInfo.php";
import LoadingSpinner from "../../components/Ui/loaders/loadingSpinner";
import { useForm } from "react-hook-form";
import { 
  useNavigate
} from 'react-router-dom';
// import useLocalStorage from '../../hooks/useLocalStorage';


const MyCartPage = () => {
  const navigate = useNavigate();
  const userData = getStorageData("token", null);
  // console.log(userData);
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const { state, cartTotal,cartPayAmount, fetchUpdatedCart, deselectAll, defaultSelectAll, isDataLoading } = React.useContext(CartContext);
  const checkState = state.cart.filter((p)=>p.SELECTED === '0')
  // console.log(state.cart)
  const [isUpdate, setCartUpdate] = React.useState(0)
  const [note,setNote] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false)
  const [paymentMode, setPaymentMode] = React.useState(null)
  const [defaultPayment, setDefaultPayment] = React.useState(null)
  const [shippingMode, setShippingMode] = React.useState(null)
  const [defaultShipping, setDefaultShipping] = React.useState(null)
  // const [selectPaymentMode, setselectPaymentMode]=React.useState((userData[0]?.TERM_CODE !== undefined) ? userData[0]?.TERM_CODE : "")
  const [selectPaymentMode, setselectPaymentMode]=React.useState("")
  // const [selectShipMode, setselectShipMode]=React.useState((userData[0]?.SHIP_CODE !== undefined) ? userData[0]?.SHIP_CODE : "")
  const [selectShipMode, setselectShipMode]=React.useState("")
  const [checkAll, setCheckAll] = React.useState((checkState.length > 0) ? false : true)
  const [errorMsg, seterrorMsg] = React.useState("")
  const [pErr,setPaymentErr] = React.useState('0');
  const [shipErr,setShipErr] = React.useState('0');
  // const [value, setValue] = useLocalStorage("ceramics-cart", null);
  const notifyCartUpdate = (isUpdate)=>{
      setCartUpdate(isUpdate)
  }
  React.useEffect(()=>{
    const getPaymentMethod = async()=>{
       let URL = 'https://dev.ceramicarts.com/API/GetPaymentInfo.php';
      // GETPAYMENTINFO
      await axios.get(GETPAYMENTINFO)
        .then(res => {
          // console.log(res);
          // return res;
          if(res.data){
            const filterDefaultPmt = (userData[0]?.TERM_CODE !== undefined && userData[0]?.TERM_CODE !== "") ? res.data.find((sh)=>sh.BVTERMSINFOCODE === userData[0]?.TERM_CODE) : null;
            // console.log(filterDefaultPmt)
            if(filterDefaultPmt !== null){
              setDefaultPayment(filterDefaultPmt)
            }
            setPaymentMode(res.data)
          }else{
            setPaymentMode([])
          }

      },err=> {
        console.log(err)
      })   
    }
    const getShippingMethod = async()=>{
       let URL = 'https://dev.ceramicarts.com/API/GetShippingInfo.php';
      // GETSHIPPINGINFO
      await axios.get(GETSHIPPINGINFO)
        .then(res => {
          // console.log(res);
          // return res;

          if(res.data){
            const filterDefaultSh = (userData[0]?.SHIP_CODE !== undefined && userData[0]?.SHIP_CODE !== "") ? res.data.find((sh)=>sh.CODE === userData[0]?.SHIP_CODE) : null;
            // console.log(filterDefaultSh)
            if(filterDefaultSh !== null){
              setDefaultShipping(filterDefaultSh)
            }
            setShippingMode(res.data)
          }else{
            setShippingMode([])
          }

      },err=> {
        console.log(err)
      })   
    }
    getPaymentMethod();
    getShippingMethod();
  },[])
  React.useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    if(userData[0] === null){
      const checkurl = window.location.href.split("/").pop();
      // console.log(checkurl);
      window.location.replace("/login?ref="+checkurl);
    }
    // console.log(windowSize.current[0]);
    window.addEventListener('scroll', isSticky);
    // $(window).scroll(function() {
    //       if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    //         alert("Near bottom!");
    //       }
    //     });

    if (isUpdate !== 0) {
      window.addEventListener("beforeunload", handler);
      // clean it up, if the dirty state changes
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }
    // since this is not dirty, don't do anything
    return () => {
        window.removeEventListener('scroll', isSticky);
    };  
    
  }, [state, checkAll]);
  const isSticky = (e) => {
      const header = document.querySelector('.breakup-card');
      const scrollTop = window.pageYOffset;
      // console.log(scrollTop)
      // const footerheight = document.getElementById('ceramic-footer').clientHeight;
      // const cartHeight = document.getElementById('cartInfo').clientHeight;
      // console.log("Scroll ", footerheight)
      // console.log("innderHeight ", cartHeight)
      // const isBottom = (cartHeight - footerheight) +300;
      // console.log(isBottom)
      // scrollTop > 150 && scrollTop < isBottom ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
      scrollTop > 150 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };
  const saveCart = async ()=>{
    // console.log("save")
    setLoading(true)
    const requestOptions = {
      customerId: userData[0]?.CUSTOMER,
      cust_level: userData[0]?.LEVEL,
      countryCode: userData[0]?.COUNTRY,
      cname: userData[0]?.primaryName,
      session: userData[0]?.SESSION,
      primaryEmail: userData[0]?.primaryEmail,
      cart: state.cart
    }  
    // console.log(requestOptions)
     let URL = 'https://dev.ceramicarts.com/API/UpdateCart.php';
    // UPDATECARTAPI
    await axios.post(UPDATECARTAPI, requestOptions)
      .then(res => {
        // console.log(res);
        // return res;
        if(res.data.ITEM_COUNT){
          // window.location.reload();
          fetchUpdatedCart();
          setCartUpdate(0)
          setLoading(false)
        }else{
          setLoading(false)
        }

    },err=> {
      setLoading(false)
    }) 
  }
  const clearCart = async()=>{
    setLoading(true)
    const requestOptions = {
      customerId: userData[0]?.CUSTOMER,
      cust_level: userData[0]?.LEVEL,
      countryCode: userData[0]?.COUNTRY,
      cname: userData[0]?.primaryName,
      session: userData[0]?.SESSION,
      primaryEmail: userData[0]?.primaryEmail
    }  
    // console.log(requestOptions)
     let URL = 'https://dev.ceramicarts.com/API/ClearCart.php';
    // CLEARCARTAPI  
    await axios.post(CLEARCARTAPI, requestOptions)
      .then(res => {
        // console.log(res);
        // return res;
        if(res){
          // window.location.reload();
          fetchUpdatedCart();
          setLoading(false)
          // setCartUpdate(0)
        }else{
          setLoading(false)
        }

    }, err=>{
      setLoading(false)
    }) 
  }
  const handleSelectAll = (event)=>{
    // console.log(event.currentTarget.checked)
    const isChecked = (!event.currentTarget.checked) ? '0' : '1';
    // console.log(isChecked)
    setCartUpdate(1)
    setCheckAll(event.currentTarget.checked)
    if(isChecked === '0'){
      deselectAll()
    }else{
      defaultSelectAll()
    }
  }
  
  const FinalCheckout = async()=>{
    // console.log(selectPaymentMode)
    // console.log(selectShipMode)
    if(selectPaymentMode===""){
      setPaymentErr('1');
    }
    if(selectShipMode===""){
      setShipErr('1');
    }
    if(selectPaymentMode === "" || selectShipMode === ""){
      seterrorMsg("Please select payment term and shipping method to checkout")
      return;
    }
    setLoading(true)
    const requestOptions = {
      customerId: userData[0]?.CUSTOMER,
      cust_level: userData[0]?.LEVEL,
      countryCode: userData[0]?.COUNTRY,
      cname: userData[0]?.CUSTNAME,
      usname:userData[0]?.primaryName,
      session: userData[0]?.SESSION,
      USEREMAIL: userData[0]?.primaryEmail,
      taxes: userData[0]?.TAXRATE,
      TERM_CODE:selectPaymentMode,
      SHIP_CODE: selectShipMode,
      note:note
    }  
    // console.log(requestOptions)
    let URL = 'https://dev.ceramicarts.com/API/Checkout.php';
    // CHECKOUTAPI
    await axios.post(URL, requestOptions)
      .then(res => {
        // console.log("fcheckout ", res);
        setLoading(false)
        navigate(ROUTES.THANKYOU, {state:{orderId:res.data?.OrderID, status:res.data?.Status}});
        
        // // return res;
        // if(res.data.ITEM_COUNT){
        //   // window.location.reload();
        //   fetchUpdatedCart();
        //   setCartUpdate(0)
        //   setLoading(false)
        // }else{
        //   setLoading(false)
        // }

    },err=> {
      setLoading(false)
    })  
  }
  const handleSelectChange = (event, mode)=>{
    // console.log(event.currentTarget.value)
    if(mode==="pmode"){
      setPaymentErr('0');
      setselectPaymentMode(event.currentTarget.value)  
    }else{
      setShipErr('0');
      setselectShipMode(event.currentTarget.value)
    }
    seterrorMsg('');
  }
  // console.log(errorMsg);
	const notetext=(event)=>{
    // console.log(event.currentTarget.value)
    setNote(event.currentTarget.value);
  } 
  return (
    <>
      {isLoading || isDataLoading && (<LoadingSpinner />)}
      <div className="container mx-auto" id="cartInfo">
        {state.cart.length > 0 && isDataLoading === false && (
          <div className="flex flex-col lg:flex-row lg:items-start gap-5 w-full relative">
            <div className="w-full lg:w-3/5">
              <div className="mb-4 flex text-right justify-end">
                <div className="mr-4">
                  <input type="checkbox" id="selectAll" onChange={handleSelectAll} checked={checkState.length === 0} /> <label for="selectAll">Select All</label>
                </div>
                <PrimaryButton btnText="Clear Cart" variant={"greybutton"} className="text-white font-bold w-32" handleClick={clearCart} />
              </div>
              {state.cart.map((items,index)=>(
                 <ProductList key={index} data={items} varient="cart" updateCart={notifyCartUpdate} />
              ))}
            </div>
            <div className="text-left w-full lg:w-2/5 lg:left-[60%] top-[58px] breakup-card">
              <div className="border border-gray-300 w-full mb-[100px] md:mb-[150px] lg:mb-0 p-4 bg-white">
                <div className="flex justify-between mb-2">
                  <label className="font-semibold">Subtotal :</label>
                  <div className="font-semibold text-right">$ {cartTotal.toFixed(2)}</div>
                </div>
                {userData !== null && userData[0].TAXNAME && (
                  <div className="flex justify-between mb-2">
                    <label className="">{userData[0].TAXNAME} :</label>
                    <div className=" text-right">{parseFloat(userData[0].TAXRATE).toFixed(2)} %</div>
                  </div>
                )}
                <div className="border-t border-gray-300 flex justify-between mt-4 pt-4">
                  <label className="font-semibold">Total :</label>
                  <div className="font-semibold text-right">${cartPayAmount.toFixed(2)}</div>
                </div>
                <div className="border-t border-gray-300 flex justify-between mt-4 pt-4">
                  <label className="font-semibold">Additional Details :</label>
                </div>
                <div className="w-full mt-4">
                  <label className={pErr=='1' ? "mb-1 text-red-300":"mb-1"}>Payment Term<span className="text-red-300">*</span></label>
                  <select {...register("termcode")} className="px-3 py-2 outline-none border border-gray-400 mb-4 w-full border-gray-400 rounded p-2 mb-6" onChange={(e)=>handleSelectChange(e, "pmode")}>
                    <option value="">Choose Payment Term</option>
                    {defaultPayment !== null && (
                        <option value={defaultPayment.BVTERMSINFOCODE}>{defaultPayment.BVTERMSINFODESC}</option>
                    )}
                    {paymentMode !== null && paymentMode.map((pmode, pindex)=>(
                      <>
                      {pmode.BVTERMSINFOCODE !== defaultPayment.BVTERMSINFOCODE && (
                      <option key={pindex} value={pmode.BVTERMSINFOCODE}>{pmode.BVTERMSINFODESC}</option>
                      )}
                      </>
                    ))}
                  </select> 
                </div>
                <div className="w-full">
                  <label className={shipErr=='1' ? "mb-1 text-red-300":"mb-1"}>Shipping Method<span className="text-red-300">*</span></label>
                  <select {...register("shipmethod")} className="px-3 py-2 outline-none border border-gray-400 mb-4 w-full border-gray-400 rounded p-2 mb-6" onChange={(e)=>handleSelectChange(e, "shipmode")}>
                    <option value="">Choose Shipping Method</option>
                    {defaultShipping !== null && (
                        <option value={defaultShipping.CODE}>{defaultShipping.SHIP_VIA_DESC}</option>
                    )}
                    {shippingMode !== null && shippingMode.map((shipmode, shiindex)=>(
                      <>
                      {shipmode.CODE !== defaultShipping.CODE && (
                        <option key={shiindex} value={shipmode.CODE}>{shipmode.SHIP_VIA_DESC}</option>
                      )}
                      </>
                    ))}
                    
                  </select>
                </div>
                <div className="w-full">
                  <label className="mb-1">Write Note (if any):</label>
                  <textarea placeholder="" className="resize-none w-full p-4 border border-gray-550" onChange={notetext}></textarea>
                </div>
                
                {(cartPayAmount.toFixed(2) < 100) && (<div className="text-sm text-red-800 mt-4">Minimum Order Value is $100</div>)}
                {(errorMsg !== "") && (<div className="text-sm text-red-800 mt-4">{errorMsg}</div>)}
                <div className="hidden lg:block">
                {isUpdate === 1 ?(
                  <PrimaryButton btnText="Save Cart" variant={"action"} className={`text-white font-bold w-full mt-4`} handleClick={saveCart} />
                ) : (
                  <PrimaryButton type="button" btnText="Checkout" variant={(cartPayAmount.toFixed(2) > 100) ? "primary" : "error"} className={`text-white font-bold w-full mt-4 ${(cartPayAmount.toFixed(2) < 100) && "cursor-not-allowed"}`} handleClick={(cartPayAmount.toFixed(2) > 100) && FinalCheckout} />
                )}
                </div>
                <div className="block fixed bottom-[56px] md:bottom-[64px] w-full left-0 lg:hidden">
                {isUpdate === 1 ?(
                  <PrimaryButton btnText="Save Cart" variant={"action"} className="text-white font-bold w-full mt-4" handleClick={saveCart} />
                ) : (
                  <PrimaryButton type="button" btnText="Checkout" variant={(cartPayAmount.toFixed(2) > 100) ? "primary" : "error"} className={`text-white font-bold w-full mt-4 ${(cartPayAmount.toFixed(2) < 100) && "cursor-not-allowed"}`} handleClick={(cartPayAmount.toFixed(2) > 100) && FinalCheckout} />
                )}
                </div>
              </div>
            </div>
          </div>
        )} 
        {state.cart.length < 1 && isDataLoading == false && (
          <div className="text-center">
            <img src={CartIcon} className="w-16 mx-auto" alt="Ceramic Cart Image" />
            <h2 className="text-2xl mt-2">Your cart is empty</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCartPage;
