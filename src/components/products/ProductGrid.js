import React, {useState, useEffect} from 'react';
import cn from "classnames";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import image1 from '../../images/img1.png';
import PrimaryButton  from "../Ui/buttons/button"
import OverlayLabel  from "../Ui/labels/overlaylabel";
import {ProductGridCard} from "./ProductGridCard";
import {ProductList} from "./ProductList";
import axios from "axios";
import GETALLPRODUCTS from "../../API/getAllProducts.php";
import { ROUTES } from "../../utils/routes"
import ProductGridLoader from "../Ui/loaders/product-grid-loader";
import { useSearchParams, createSearchParams} from "react-router-dom";
import getStorageData from '../../hooks/useLocalStorage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const ProductGrid = ({variant, itemCount}) => {
  const params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(params);
  let sortValue = searchParams.get("sort_price");
  // console.log(sortValue);
  let sortbyName = searchParams.get("sort_by_name");
  // let sortValue = name.value;
  // console.log(sortValue)
  const [productList, setProductList] = useState(null);
  const userData = getStorageData("token", null);
  // console.log(userData);
  
  useEffect(() => {
    const requestOptions = {
      categId :params.slug,
      customerId: (userData[0]?.CUSTOMER) ? userData[0]?.CUSTOMER : "",
      cust_level: (userData[0]?.LEVEL) ? userData[0]?.LEVEL : "",
      countryCode: (userData[0]?.COUNTRY) ? userData[0]?.COUNTRY : "",
      cname: (userData[0]?.CUSTNAME) ? userData[0]?.CUSTNAME : "",
      session: (userData[0]?.SESSION) ? userData[0]?.SESSION : ""
    }  
   // console.log(requestOptions);
    const fetchProducts = async () =>{

        // let URL = 'https://dev.ceramicarts.com/API/LoadProductItems.php';
        // GETALLPRODUCTS
        await axios.post(GETALLPRODUCTS, requestOptions)
          .then(res => {
            // console.log(res);
            const obj = res.data;
            // console.log(menuArray[0]);
            if(obj.ITEMS != undefined && obj.ITEMS.length > 0){
              setProductList(obj.ITEMS);
              itemCount(obj.ITEMS.length);
            }else{
              setProductList([]);
            }

        })
    }
    fetchProducts()
  }, [])
    if(productList!=null){
      if(sortValue == "high-low" ){
        productList.sort((a, b) => {
          return (a.RETAILCDN > b.RETAILCDN ? 1 : -1);
        })
      }
      if(sortValue == "low-high"){
        productList.sort((a, b) => {
          return (a.RETAILCDN > b.RETAILCDN ? -1 : 1);
        })
      }
      if(sortbyName == "ascending" ){
        productList.sort((a, b) => {
          return (a.Description > b.Description ? 1 : -1);
        })
      }
      if(sortbyName == "descending"){
        productList.sort((a, b) => {
          return (a.Description > b.Description ? -1 : 1);
        })
      }
    }
      
  const ItemAddedToCart = ()=>{
    // console.log("jhakkass")
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
    
  
  // console.log(productList);
  return (
    <>
    <ToastContainer />
    {variant == "list" ? (
        <div
            className={`grid grid-cols-1 gap-y-8 gap-x-3 lg:gap-x-5}`}
          >
            {productList!=null && productList.map((items,index)=>(
              
                <ProductList key={index} data={items} ItemAddedToCart={ItemAddedToCart} />
              
            ))}
        </div>
       ) : (
        <div
            className={` grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 }`}
          >
            {productList!=null && productList.map((items,index)=>( 
                  <ProductGridCard  key={index} data={items} ItemAddedToCart={ItemAddedToCart} /> 
              ))
            }
            {productList == null && (
              <>
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
                <ProductGridLoader width="100%" height="500" />
              </>
            )}
        </div>
    )}
    </>
 );
};