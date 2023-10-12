import React from 'react';
import GETCARTCOUNT from "../../../API/GetCartCount.php";
import axios from "axios";
import getStorageData from '../../../hooks/useLocalStorage';
import CartIcon from '../../../images/bag_icon.svg';
import { ROUTES } from "../../../utils/routes";
import { CartContext } from '../../../context/cart/CartContext.js';


const CartButton =(props) =>{
	const userData = getStorageData("token", null);
	const { cartItemCount } = React.useContext(CartContext);
	// console.log(cartItemCount);
	const[cartCount, setcartCount]= React.useState((cartItemCount !== undefined && cartItemCount.length > 0) ? cartItemCount : 0)
	// console.log(props);
	React.useEffect(()=>{

		const fetchCartCount = async ()=>{
		    const requestOptions = {
		        customerId: (userData[0]?.CUSTOMER) ? userData[0]?.CUSTOMER : "",
		        cust_level: (userData[0]?.LEVEL) ? userData[0]?.LEVEL : "",
		        countryCode: (userData[0]?.COUNTRY) ? userData[0]?.COUNTRY : "",
		        cname: (userData[0]?.CUSTNAME) ? userData[0]?.CUSTNAME : "",
		        usname: (userData[0]?.primaryName) ? userData[0]?.primaryName : "",
		        session: (userData[0]?.SESSION) ? userData[0]?.SESSION : "",
		        USEREMAIL: (userData[0]?.primaryEmail) ? userData[0]?.primaryEmail : ""
		      }  
		      // let URL = 'https://dev.ceramicarts.com/API/GetCartCount.php';
		      // GETCARTCOUNT
		      await axios.post(GETCARTCOUNT, requestOptions)
		        .then(res => {
		          console.log(res);
		          if(res.data > 0){
		          	setcartCount(res.data)
		          }else{
		          	setcartCount(0)
		          }
		          
		          
		      }, err=>{
		      	console.log()
		      })
		}
		fetchCartCount();
	}, [])
	return (
		<div className="cart-count-wrap">
			<a href={ROUTES.MYCART} className="block">
				<img src={CartIcon} alt="cart" className={`mx-auto ${(props.varient === 'mobile') ? "w-[21px]" : "w-8"}`} border="0" />
				{cartCount > 0 && (<span>{cartCount}</span>)}
			</a>
		</div>
		
	);
};

export default CartButton;