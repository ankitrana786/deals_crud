import React, { Fragment, useState, useRef, useContext } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Logo from '../../Ui/Logo';
import HeaderMenu from './header-menu';
import TopBar from './top-bar';
import AuthMenu from './auth-menu';
import Drawer from "../../common/drawer/drawer";
import Search from "./search";
import logoIcon from "../../../images/logo_icon.png"
import CartButton from "../../Ui/buttons/cartButton";
import getStorageData from '../../../hooks/useLocalStorage';
import { useForm } from "react-hook-form";
import { IoIosArrowDown,IoIosArrowUp, IoIosClose } from "react-icons/io";
import ADDTOCARTAPI from "../../../API/addToCart.php";
import { CartContext } from '../../../context/cart/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Header =({data}) =>{
	const { addToCart, fetchUpdatedCart } = useContext(CartContext);
	const userData = getStorageData("token", null);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	let [isOpen, setIsOpen] = useState(false);
	const { register, handleSubmit,setValue } = useForm({ shouldUseNativeValidation: true });
	const [message, setMessage] = React.useState('');
  	const [status, setStatus] = React.useState('');
  	const [count, setCount] = useState(1);
  	const [isLoading, setLoading] = useState(false);
	React.useEffect(() => {
		// console.log(windowSize.current[0]);
		window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };	
        
    });
    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.pageYOffset;
        scrollTop > 40 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };
    function closeModal() {
	    setIsOpen(false);
	  }

	  function openModal() {
	    setIsOpen(true);
	  }

	const onSubmit = async (data) => { 
		// console.log(data)
		if(data.itemCode !== "" && count > 0){
			setLoading(true)
			data.count = count;
			const obj = {
			    "Item_Code": data.itemCode,
			    "count": count
			}	
			addToCart(obj)
		    const requestOptions = {
		      customerId: userData[0]?.CUSTOMER,
		      cust_level: userData[0]?.LEVEL,
		      countryCode: userData[0]?.COUNTRY,
		      cname: userData[0]?.primaryName,
		      session: userData[0]?.SESSION,
		      primaryEmail: userData[0]?.primaryEmail,
		      totalCount: obj.count,
		      cart: obj
		    }  
		    // console.log(requestOptions)
		    // let URL = 'https://dev.ceramicarts.com/API/AddToCart.php';
		    // ADDTOCARTAPI
		    await axios.post(ADDTOCARTAPI, requestOptions)
		      .then(res => {
		        // console.log(res);
		        const obj = res.data;
		        if(obj){
		          fetchUpdatedCart();
		          // setIsOpen(false);
		          setStatus("1")
		          setMessage("Item added to cart")
		          setLoading(false)
		           setTimeout(
					  () => {
					  	setStatus("")
					  	setMessage("")
					  }, 
					  3000
					);
		          // ItemAddedToCart();
		        }

		    })
		}else{
			// InvalidItemCart();
			  setStatus("0")
	          setMessage("Invalid Item")
	          setLoading(false)
		}
		
	    
	}
	const handleIncrement = () => {
      // data.count = count;
      setCount(prevCount => prevCount + 1);
    };
	const handleDecrement = () => {
	    setCount(prevCount => prevCount - 1);
	};
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
	const InvalidItemCart = ()=>{
	    // console.log("jhakkass")
	    toast.error('Invalid Item', {
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
	// console.log(window.location.pathname.includes('cart'));
	return (
		<>
		 <ToastContainer />
		<header
			id="siteHeader"
			className="w-full relative z-20 pb-2 lg:pb-0"
		>
			<TopBar/>
			<div className="flex container mx-auto pt-4 justify-between items-center">
				<Logo />
				<Search />
				<AuthMenu/>
			</div>
			<div className={`bg-white ${windowSize.current[0] > 1024 ? "header-section" : ""}`}>
				<div className="container mx-auto lg:flex">
					<div className="stick-logo hidden pt-4">
						<img src={logoIcon} width="40" />
					</div>
					<HeaderMenu data={data} />
					{userData[0] != null && (
						<div className="sticky-cart hidden pt-4">
							<CartButton />
						</div>
					)}
				</div>
			</div>
			{userData[0] != null && window.location.pathname.includes('cart') == false && (
				<div className="fixed right-0 top-1/2 group cursor-pointer py-4 bg-green-250 border-l-4 border-yellow">
	                <a
	                    href={void(0)}
	                    onClick={openModal}
	                    className="inline-flex items-center text-white text-sm lg:font-bold xl:text-xl px-2 xl:px-2 py-2 font-normal relative"
	                >
	                   <span className="pr-1.5" style={{writingMode:"vertical-rl", textOrientation: "mixed"}}>Quick Order</span>

	                </a> 
	            </div>			
	        )}
		</header>
		<Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto bg-transaprentBg"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Quick Order
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
			          <div>
			             <div className="flex flex-col">
			                <label className="font-semibold text-sm text-gray-800 mb-2">Product Code</label>
			                  <input
			                    type="text"
			                    placeholder="Enter Product Code"
			                    // defaultValue={(content.title != '') ? content.title : ""}
			                    className="px-3 py-2 outline-none border border-gray-400 mb-4 rounded"
			                    {...register("itemCode", { required: "Please enter product Code." })} 
			                  />
			              </div>
			          </div>
			           <div className="flex flex-wrap flex-row py-1 items-center ">
	                    <h1 className="text-sm text-gray-800 pr-2">QTY:</h1>
	                    <div className="flex items-center border border-gray-250 pl-2 rounded h-[32px]">
	                        <h5 className="text-white-100 text-xs">{count}</h5>
	                        <div className="flex flex-col space-y-1">
	                          <button type="button" onClick={handleIncrement}  className={"px-2 text-sm text-white-100"}><IoIosArrowUp className="w-2 h-2" /></button>
	                          <button type="button" onClick={handleDecrement} disabled={count > 1 ? false:true}  className="px-2 text-sm text-white-100"><IoIosArrowDown className="w-2 h-2"/></button>
	                        </div>
	                    </div>
	                  </div>
			          <div className="flex items-center gap-10">
			              <button className="w-32 bg-green-250 rounded-none px-4 py-2 text-white rounded mt-4" disabled={(isLoading === true) && true}>{isLoading === false ? "Add to Cart" : "Loading..."} </button>
			                {message !='' && (
			                    <div className={status=='0'?"text-red-100":"text-greenBase "}>{message}</div>
			                )}
			           </div>
			        </form>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-black absolute top-4 right-4 duration-300"
                    onClick={closeModal}
                  >
                    <IoIosClose className="w-8 h-8"/>
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
		</>
	);
};

export default Header;