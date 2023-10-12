import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import axios from "axios";
import image1 from '../../images/img1.png';
import { IoIosSearch } from "react-icons/io";
import OverlayLabel  from "../Ui/labels/overlaylabel";
import getStorageData from '../../hooks/useLocalStorage';
import {ProductList} from "../products/ProductList";
import GETORDERINFO from "../../API/getOrderInfo.php";


const ThankYou = (props) => {
	const userData = getStorageData("token", null);
  const {orderdata} = props;
  const [orderList, setOrderListItem]= React.useState(null)
  console.log(orderdata)
  React.useEffect(()=>{
    const getOrderdata = async()=>{
      // let URL = 'https://dev.ceramicarts.com/API/GetOrderInfo.php';
      // GETORDERINFO
      const requestOptions = {
        customerId: (userData[0]?.CUSTOMER) ? userData[0]?.CUSTOMER : "",
        cust_level: (userData[0]?.LEVEL) ? userData[0]?.LEVEL : "",
        countryCode: (userData[0]?.COUNTRY) ? userData[0]?.COUNTRY : "",
        cname: (userData[0]?.CUSTNAME) ? userData[0]?.CUSTNAME : "",
        usname: (userData[0]?.primaryName) ? userData[0]?.primaryName : "",
        session: (userData[0]?.SESSION) ? userData[0]?.SESSION : "",
        USEREMAIL: (userData[0]?.primaryEmail) ? userData[0]?.primaryEmail : "",
        order_id: orderdata.orderId
      }
      await axios.post(GETORDERINFO,requestOptions)
        .then(res => {
          // console.log(res.data.ORDERED_ITEMS);
          if(res.data.ORDERED_ITEMS.length > 0){
            setOrderListItem(res.data.ORDERED_ITEMS)
          }else{
            setOrderListItem([])
          }

      },err=> {
        console.log(err)
      })   
    }
    if(orderdata.status === "Success"){
      getOrderdata()  
    }
    
  }, [])
  return (
      <div className="py-20">
      	  <h4 className="text-black text-center font-bold text-2xl mb-6">Hey {userData[0]?.primaryName},</h4>
          <h2 className={`${orderdata.status === "Success" ? "text-success" : "text-red-300" } text-center font-bold text-4xl mb-6`}> {orderdata.status === "Success" ? "Thank You For Your Order!" : "Opps, Order Failed."}</h2>
          {orderdata.status === "Success" && (<p className="text-black text-center font-bold text-3xl">Order Id :- {orderdata.orderId}</p>)}
           {orderList !== null && (
             <div className="max-w-[600px] mt-2 mx-auto text-center">
             <h4 className="text-black text-center font-bold text-2xl mb-6">Order Summery</h4>
             {orderList.map((items,index)=>(
                 <ProductList key={index} data={items} varient="order" />
              ))}
              <a
                href="/"
              >
                 <button className="bg-loginbtnBase rounded-full px-8 py-1 text-white" >Continue Shopping</button>
              </a>
           </div>
          )}
          
      </div>
 );
};

export default ThankYou;