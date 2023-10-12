import React from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../../hooks/useLocalStorage';
import getStorageData from '../../hooks/useLocalStorage';
import axios from "axios";
import GETCARTDETAILS from '../../API/getCartDetails.php';


export const CartContext = React.createContext();
let initCount=0;
export const CartProvider = (props) => {
  // const [value, setValue] = React.useState([]);
  const cartData = getStorageData("ceramics-cart", null);
  const userData = getStorageData("token", null);
  const [value, setValue] = useLocalStorage("ceramics-cart", null);
  const [isDataLoading, setDataLoading] = useLocalStorage(false);
  const [state, setState] = React.useState({
    cart:(cartData !== null && cartData[0] !== null) ? cartData[0] : []
  });
  const queryString =window.location.href;
  // console.log(userData)
  React.useEffect(() => {
    const mainurl = queryString.indexOf("/admin")>-1;
    if(mainurl != true && (initCount === 0 && userData[0] !== null)){
      fetchUpdatedCart();
    }
    setValue(state.cart);
  }, [state, setState, isDataLoading]);
  const fetchUpdatedCart = async ()=>{
    setDataLoading(true)
    const requestOptions = {
        customerId: (userData[0]?.CUSTOMER) ? userData[0]?.CUSTOMER : "",
        cust_level: (userData[0]?.LEVEL) ? userData[0]?.LEVEL : "",
        countryCode: (userData[0]?.COUNTRY) ? userData[0]?.COUNTRY : "",
        cname: (userData[0]?.CUSTNAME) ? userData[0]?.CUSTNAME : "",
        usname: (userData[0]?.primaryName) ? userData[0]?.primaryName : "",
        session: (userData[0]?.SESSION) ? userData[0]?.SESSION : "",
        USEREMAIL: (userData[0]?.primaryEmail) ? userData[0]?.primaryEmail : ""
      }  
      // let URL = 'https://dev.ceramicarts.com/API/GetCartData.php';
      // GETCARTDETAILS
      await axios.post(GETCARTDETAILS, requestOptions)
        .then(res => {
          // console.log(res);
          const obj = res.data;
          if(obj.length > 1){
           setState({cart:obj});
           setValue(obj)
           initCount =1;
           setDataLoading(false)
          }else{
            setState({cart:[]});
            setValue(obj)
            initCount = 1;
            setDataLoading(false)
          }
      }, err=>{
        setDataLoading(false)
      })
  }
  // console.log(state.cart);
  const addToCart = (item) => {
    setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.ITEM_CODE === item.Item_Code)
        ? state.cart.map((cartItem) =>
            cartItem.ITEM_CODE === item.Item_Code
              ? { ...cartItem, count: cartItem.count + item.count}
              : cartItem
          )
        : [...state.cart, { ...item, QTY: item.count }],
    });

  };

  const increase = (item) => {
    // console.log(item);
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.ITEM_CODE === item.ITEM_CODE
          ? { ...cartItem, QTY: parseInt(cartItem.QTY) + 1 }
          : cartItem
      ),
    });
  };
  // console.log(state)
  const decrease = (item) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.ITEM_CODE === item.ITEM_CODE
          ? { ...cartItem, QTY: parseInt(cartItem.QTY) > 1 ? parseInt(cartItem.QTY) - 1 : 1 }
          : cartItem
      ),
    });
  };

  const removeItem = (id) => {
    setState({
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.ITEM_CODE !== id),
    });
  };

  const deselectAll = () =>{
    setState({
      ...state,
      cart: state.cart.map((cartItem) => 
        cartItem.SELECTED === '1'
          ? { ...cartItem, SELECTED: '0' }
          : cartItem
        ),
    });
  };
  const toggleSelectProduct = (id, isChecked) =>{
    setState({
      ...state,
      cart: state.cart.map((cartItem) => 
        cartItem.ITEM_CODE === id
          ? { ...cartItem, SELECTED: isChecked }
          : cartItem
        ),
    });
  };
  const defaultSelectAll = () =>{
    setState({
      ...state,
      cart: state.cart.map((cartItem) => 
        cartItem.SELECTED === '0'
          ? { ...cartItem, SELECTED: '1' }
          : cartItem
        ),
    });
  };

  const cartItemCount = state.cart.length; //state.cart.reduce((acc, data) => (acc += (data.QTY !== undefined) ? parseInt(data.QTY) : 1),0)
  const cartTotal = state.cart.reduce((acc, data) => (acc += (data.SELECTED === '1') && parseFloat(data.ITEM_PRICE)*parseInt(data.QTY)),0)

  // console.log(userData)
  const cartPayAmount = (userData[0] !== null) ? cartTotal + ((userData[0]?.TAXRATE) ? cartTotal*(parseFloat(userData[0].TAXRATE)/100).toFixed(2) : cartTotal) : 0;

  // console.log(cartTotal)
  // const cartItemCount = state.cart.reduce(
  //   (acc, data) => (acc += parseInt(data.QTY)),0
  // );
  // const cartTotal = state.cart.reduce(
  //   (acc, data) => (acc += parseFloat(data.ITEM_PRICE).toFixed(2)),0
  // );
  // const getCartData = state.cart;
  


  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        increase,
        decrease,
        removeItem,
        cartItemCount,
        cartTotal,
        cartPayAmount,
        fetchUpdatedCart,
        deselectAll,
        defaultSelectAll,
        toggleSelectProduct,
        isDataLoading
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}


