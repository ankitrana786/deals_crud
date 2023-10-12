import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import PrimaryButton  from "../Ui/buttons/button"
import axios from "axios";
import  Breadcrumb  from "../../components/common/breadcrumb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultImage from '../../images/p_defaultImage.png';
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import NavigationAPI from "../../API/getAllProducts.php";
import ProductDetailAPI from "../../API/getProductDetail.php";
import ProductGridLoader from "../Ui/loaders/product-grid-loader";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { CartContext } from '../../context/cart/CartContext';
import {ProductList} from "./ProductList";
import {SimilarProduct} from "./SimilarProduct";
import product1 from '../../images/p1.png';
import facebook from '../../images/facebook.png';
import insta from '../../images/insta.png';
import twitter from '../../images/twitter.png';
import {RelatedProduct} from "./RelatedProduct";
import pinterest from '../../images/pinterest.png';
import pList from '../../images/pList.png';
import  TabBlock  from "../../components/Ui/tab/tabBlock";
import { ROUTES } from "../../utils/routes";
import { LazyLoadImage } from "react-lazy-load-image-component";
import getStorageData from '../../hooks/useLocalStorage';
import useLocalStorage from '../../hooks/useLocalStorage';
import ADDTOCARTAPI from "../../API/addToCart.php";
import NOTIFYAPI from "../../API/NotifyItem.php";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BannerInfoAPI = "https://dev.ceramicarts.com/fetch_ceramics.php";


const ProductSingleDetail = () => {
    const { addToCart } = React.useContext(CartContext);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const userData = getStorageData("token", null);
    const historicalData = getStorageData("ceramic_history", null);
    const [historyData, setHistory] = useLocalStorage("ceramic_history", []);
    const [lastViewed, setlastViewed] = useState(null);
    const [breadCrumbArr, setBreadcrumb] = useState([]);
    const [pTabs, setTabsArray] = useState(null);
    const [similarProductsList, setSimilarProductsList] = useState([]);
    const [productDetail,setProductDetail] = useState(null);
    const [count, setCount] = useState(1);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const [showStatus, setShowStatus] = useState('hidden');
    const [message, setMessage] = useState('');
    const [stoctCTA, setstoctCTA] = useState('block');
  const params = useParams();
  
 
 const lastViewdSlider ={
    slidesToShow: 2.5,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    dots: false,
    lazyLoad: 'progressive',
    infinite:false
  }
  const settingProduct ={
    slidesToShow: 5,
    slidesToScroll: 1,
   /* asNavFor: '.slider-for',*/
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
  }
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    centerMode: false,
    asNavFor: '.slider-nav',
    lazyLoad: 'progressive',
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px'
  };


  React.useEffect(() => {
    
    const fetchProducts = async () =>{
        const requestOptions = {
          productId :params.slug,
          customerId:(userData[0]?.CUSTOMER) ? userData[0]?.CUSTOMER : "",
          cust_level: (userData[0]?.LEVEL) ? userData[0]?.LEVEL : "",
          countryCode: (userData[0]?.COUNTRY) ? userData[0]?.COUNTRY : "",
          cname: (userData[0]?.CUSTNAME) ? userData[0]?.CUSTNAME : "",
          session: (userData[0]?.SESSION) ? userData[0]?.SESSION : ""
        } 
        
        // let url = "https://dev.ceramicarts.com/API/LoadProductDetails.php";
        //ProductDetailAPI
        await axios.post(ProductDetailAPI, requestOptions)
              .then(res => {
                // console.log("ankit");
                //  console.log(res);
                const obj = res.data;
                if(obj?.Item_Code != undefined){
                   setProductDetail(obj);
                   fetchtProductDetails(obj);
                   fetchtSimilarProducts(obj.BV_Code, obj.Item_Code);
                   setAndFetchHistory(obj)
                   // const bCrumb = [{PRD_DESC: obj.Item_Desc, CODE: obj.Item_Code},{PRD_DESC: obj.Item_Desc, CODE: obj.Item_Code}]
                   
                }else{
                   setProductDetail([]);
                   setAndFetchHistory()    
                }

            })
        }
    fetchProducts();
    
    setNav1(slider1);
    setNav2(slider2);     
  }, [])
  const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
    };
  const handleDecrement = () => {
      setCount(prevCount => prevCount - 1);
  };

  const setAndFetchHistory = (product) =>{
    let h_data=(historicalData !== null) ? historicalData[0] : [];
    // console.log(h_data);
    if(h_data.length > 0){
        // console.log("storage exists")
        let checkExist = h_data.filter(y=>y.Item_Code === params.slug); 
         // console.log(checkExist);
        if(checkExist.length > 0){
            checkExist[0].lastViewData = new Date().getTime();
            h_data.sort((a,b) => a.lastViewData - b.lastViewData);
            setHistory(h_data) 
            const filterHistory = h_data.filter((m)=>m.Item_Code !== params.slug)
            // console.log(filterHistory);   
            setlastViewed(filterHistory)
        }else{
            product.lastViewData = new Date().getTime();
            h_data.push(product);    
            setHistory(h_data);
            h_data.sort((a,b) => b.lastViewData - a.lastViewData);
            // console.log(h_data);
            const filterHistory = h_data.filter((m)=>m.Item_Code !== params.slug)
            // console.log(filterHistory);   
            setlastViewed(filterHistory)
        }      
    }else{
        product.lastViewData = new Date().getTime();
        h_data.push(product);    
        setHistory(h_data);
        h_data.sort((a,b) => a.lastViewData - b.lastViewData);
        // console.log(h_data);
        
        const filterHistory = h_data.filter((m)=>m.Item_Code !== params.slug)
        // console.log(filterHistory);   
        setlastViewed(filterHistory)
    }

  }

  const fetchtSimilarProducts = async (categSlug, pcode) =>{
    const requestOptions = {
      categId :categSlug,
      customerId: (userData[0]?.CUSTOMER) ? userData[0]?.CUSTOMER : "",
      cust_level: (userData[0]?.LEVEL) ? userData[0]?.LEVEL : "",
      countryCode: (userData[0]?.COUNTRY) ? userData[0]?.COUNTRY : "",
      cname: (userData[0]?.CUSTNAME) ? userData[0]?.CUSTNAME : "",
      session: (userData[0]?.SESSION) ? userData[0]?.SESSION : ""
    } 
    // let URL = 'https://dev.ceramicarts.com/API/LoadProductItems.php';
    // NavigationAPI
    await axios.post(NavigationAPI, requestOptions)
      .then(res => {
        // console.log(res);
        const obj = res.data;
        // console.log(obj);
        if(obj && obj?.ITEMS.length > 0){
            // console.log("array found");
          const limitItem = obj.ITEMS.slice(0, 50);
          const filterProducts = limitItem.filter(x=>x.Item_Code != pcode);
          // console.log(filterProducts);
          setSimilarProductsList(filterProducts);
        }else{
          setSimilarProductsList([]);
        }

    })
  }
  // console.log(similarProductsList)
  const fetchtProductDetails = async (product) =>{
    // console.log(params);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: false,
        itemId:params.slug,
        action: "PRODUCTIDINFO"
    }; 
    await axios.post(BannerInfoAPI, requestOptions)
      .then(res => {
        // console.log(res);
        const obj = res.data;
        // console.log(obj);
        if(obj.tabs_data != undefined && obj.tabs_data.length > 0){
          setTabsArray(obj.tabs_data);
          // fetchtSimilarProducts(product.BV_Code, product.ITEM_CODE);
        }else{
          setTabsArray([]);
          // fetchtSimilarProducts(product.BV_Code, product.ITEM_CODE);
        }

    })
  }
  
  const sendToCart = async () =>{
    // console.log(data);
    productDetail.count = count;
    addToCart(productDetail)
    const requestOptions = {
      customerId: userData[0]?.CUSTOMER,
      cust_level: userData[0]?.LEVEL,
      countryCode: userData[0]?.COUNTRY,
      cname: userData[0]?.primaryName,
      session: userData[0]?.SESSION,
      primaryEmail: userData[0]?.primaryEmail,
      totalCount: productDetail.count,
      cart: productDetail
    }  
    // console.log(requestOptions)
    // let URL = 'https://dev.ceramicarts.com/API/AddToCart.php';
    // ADDTOCARTAPI
    await axios.post(ADDTOCARTAPI, requestOptions)
      .then(res => {
        // console.log(res);
        const obj = res.data;
        if(obj){
          toast.success('Item added to cart', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        

    }, error=>{
      console.log(error);
    })
  }

  const statusHandler = async ()=>{
      productDetail.count = count;
      const requestOptions = {
        customerId: userData[0]?.CUSTOMER,
        cust_level: userData[0]?.LEVEL,
        countryCode: userData[0]?.COUNTRY,
        cname: userData[0]?.primaryName,
        session: userData[0]?.SESSION,
        primaryEmail: userData[0]?.primaryEmail,
        totalCount: productDetail.count,
        cart: productDetail
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

  return (
      <div>
       <ToastContainer />
       <div className="container mx-auto ">
           <div className="flex items-center pt-7 mb-9">
              <Breadcrumb breadcrumbs={breadCrumbArr} />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-start gap-5">
            <div className="w-full lg:w-3/5">
              {productDetail == null &&(<ProductGridLoader width="100%" height="400" />)}
              {productDetail != null &&(
                <>
                  <div className="w-full lg:h-[500px]">
                    <LazyLoadImage src={process.env.REACT_APP_IMAGE_URL+productDetail?.ImageFile} alt={productDetail.Item_Desc} className="w-full h-full object-contain"  />
                  </div>
                  <div className="text-center w-full lg:w-full mt-10">
                    {pTabs != null && pTabs.length > 0 && pTabs[0]?.tabtitle != '' && (
                      <TabBlock dataArray={pTabs} />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="text-left w-full lg:w-2/5">
              <div className="border-b border-gray-850 pb-3.5 mb-2.5">
                <h1 className="text-xl lg:text-3xl font-bold mb-1">{productDetail?.Item_Desc}</h1>
                <span className="text-gray-650 font-normal text-lg">{productDetail?.Dimension} <br/>Item: {productDetail?.Item_Code}</span>
              </div>
              <div className="border-b border-gray-850  pb-6 mb-5"> 
                {userData[0] != null && ( 
                <>
                    <div className="mb-3.5">
                      <h2 className="text-green-250 text-base lg:text-3xl font-bold">${parseFloat(productDetail?.ITEM_PRICE).toFixed(2)} &nbsp;
                           {parseFloat(productDetail?.ITEM_DISCOUNT) > 0 && (
                              <span className="line-through text-gray-650 font-normal">${parseFloat(productDetail?.ITEM_RETAIL_PRICE).toFixed(2)}</span> 
                            )}
                            <span className="text-black font-normal mr-1.5">/{productDetail?.UoM}</span>
                            {parseFloat(productDetail?.ITEM_DISCOUNT) > 0 && (
                                <span className="text-orange-250 text-lg lg:text-2xl font-medium">({parseFloat(productDetail?.ITEM_DISCOUNT)} OFF)</span>
                           )}
                      </h2>
                    </div>
                
                    {(parseInt(productDetail?.ONHAND) > 0 || parseInt(productDetail?.MODIFY_STATUS) !== 0) && (<div className="flex flex-wrap flex-row py-1 items-center mb-2">
                      <h1 className="text-base text-gray-650 pr-2">QTY:</h1>
                      <div className="flex items-center border border-gray-250 pl-2 rounded h-[32px]">
                          <h5 className="text-black text-xs">{count}</h5>
                          <div className="flex flex-col space-y-1">
                            <button onClick={handleIncrement}  className={"disabled px-2 text-sm text-black"}><IoIosArrowUp className="w-2 h-2" /></button>
                            <button onClick={handleDecrement} disabled={(count > 1 || count < productDetail?.ONHAND) ? false:true}  className="px-2 text-sm text-black"><IoIosArrowDown className="w-2 h-2"/></button>
                          </div>
                      </div>
                     
                    </div>
                    )}
                </>
                )}
                <div className="flex items-end gap-5 mb-7">
                  {userData[0] != null ? (
                    <>
                      {parseInt(productDetail?.ONHAND) > 0 ? (
                        <PrimaryButton btnText="ADD TO CART" variant="primary" className="w-full h-[48px] !bg-green-200 text-white !text-sm lg:!text-xl" handleClick={sendToCart} /> 
                           
                      ) : (parseInt(productDetail?.MODIFY_STATUS) === 0) ? (
                          <>
                           <PrimaryButton btnText="NOT AVAILABLE : Notify Me" variant="error" className={`${stoctCTA} w-full h-[48px] !text-sm lg:!text-[16px]`} handleClick={statusHandler} /> 
                           <div className={`${showStatus} px-1 py-2 text-sm text-center bg-green-800 text-[13px] text-white font-normal`}>{message}</div>
                          </>
                      ) : (
                           <PrimaryButton btnText="ADD TO CART" variant="tooltip" className="w-full h-[48px]  text-white text-lg font-bold lg:!text-xl" orderDt={productDetail?.vOrdByDt} arrivalDt={productDetail?.vDueDate} handleClick={sendToCart} />
                      )}
                    </>
                  ) : (
                    <a href={ROUTES.LOGINPAGE} className="w-full inline-block h-[48px]">
                      <PrimaryButton type="button" btnText="Login to view price" variant="error" className={` text-white text-lg lg:!text-xl w-full h-full`} />
                    </a>
                  )}
                  <PrimaryButton btnText="ADD TO WISHLIST" variant="primary" className="w-full h-[48px] !bg-gray-750 text-white !text-sm lg:!text-xl" />
                </div>
                <div className="flex items-center gap-3">
                  <Link
                      to="/"
                      className=""
                  >
                     <img className="" src={facebook} />
                  </Link> 
                  <Link
                      to="/"
                      className=""
                  >
                     <img className="" src={insta} />
                  </Link> 
                  <Link
                      to="/"
                      className=""
                  >
                     <img className="" src={twitter} />
                  </Link> 
                  <Link
                      to="/"
                      className=""
                  >
                     <img className="" src={pinterest} />
                  </Link> 
                </div>
              </div>
              {similarProductsList.length > 0 && (<SimilarProduct data={similarProductsList} />)}
               {lastViewed != null && lastViewed.length > 0  && (
                   <div className="mt-5 relative simpleSlider mb-10">
                    <h2 className="text-black text-2xl font-bold mb-5">Recently Viewed</h2>
                    <div className='slideWithArrow lastvisited'>
                        <Slider
                          {...lastViewdSlider}
                          className="m-0"
                            asNavFor={nav2}
                            ref={slider => (setSlider1(slider))}
                        >
                          {lastViewed.map((historyItem, index) =>(
                            <div className="slick-slide" key={index}>
                              <a href={ROUTES.PRODUCT+"/"+historyItem.Item_Code} className="block p-2">
                                  <img className="slick-slide-image w-full lg:w-[216px]" src={process.env.REACT_APP_IMAGE_URL+historyItem.ImageFile} />
                              </a>
                            </div>
                            
                          ))}
                        </Slider>
                    </div>
                  </div>
                )}
            </div>
          </div>
       </div>
       <div className="hidden">
         {similarProductsList.length > 0 && (<div className="container mx-auto">
           <h2 className="text-black text-2xl font-bold mb-6">Related Products</h2>
           <div className="thumbnail-slider-wrap productSliderStyle slideWithArrow">
              <Slider {...settingProduct}>
                {similarProductsList.map((items,index) =>
                  <div className="w-[120px] lg:w-[187px]">
                    <a
                      href={ROUTES.PRODUCT+"/"+items.Item_Code}
                      key={index}
                    >
                      <RelatedProduct data={items}/>
                    </a>
                  </div>
                )}
              </Slider>
            </div>
          </div>
          )}
        </div>
    </div>


 );
};
export default ProductSingleDetail;