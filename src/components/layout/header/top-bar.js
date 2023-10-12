import React from "react";
import getDeals from '../../../framwork/adminAPI'

const TopBar = () => {
  const pathname = window.location.pathname;
  const [dealText, setdealText] = React.useState('');
  React.useEffect(()=>{
    const pagename =  (pathname === "/") ? "homepage" : (pathname.indexOf("/collection") > -1) ? "collection" : (pathname.indexOf("productdetail") > -1) ? "productdetail" : (pathname.indexOf("cart") > -1) ? "cart" :"";
    const fetchDeal = async ()=>{
      if(pagename !== ""){
        getDeals(pagename).then((data)=>{
          // console.log(data);
          if(data.length > 0){
            setdealText(data[0]?.title)
          }else{
            setdealText("")
          }
        })  
      }
      
    }
    fetchDeal();
  }, [])
  
  // font-family: Poppins;
		// font-weight: normal;
		// font-size: 12px;
		// line-height: 18px;
		// color: #FFFFFF;
  
  return (
   <>
    {dealText !== "" && (
     <div className="top-bar py-3 w-full hidden md:block">
       <p className="text-center text-white text-xs">{dealText}</p>
      </div>
    )}
   </>
 );
};

export default TopBar;