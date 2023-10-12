import React,{useEffect,useState} from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { IoLogoTwitter,IoLogoInstagram,IoLogoFacebook,IoLogoYoutube,IoLogoPinterest,IoMdMail} from "react-icons/io";
import {FaBloggerB} from 'react-icons/fa';
import PrimaryButton from "../Ui/buttons/button";
import CopyRight from "./copyright";
import {footerJson} from "../../framwork/quickLinks";
import axios from "axios";

const apiUrl = "https://dev.ceramicarts.com/";

const Footer = () => {
  const [quickLinksArr,setQuickLinks] = useState([]);
  const [contactData,setContactData]= useState([]);

  useEffect(() => {
    const fetchPrefillData =  async ()=>{
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: false,
          type:'links',
          action: "FETCHPAGELIST"
      };
      const fetchFooter  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
     // console.log(fetchFooter.data);
      if(fetchFooter.data.length>0){
        setQuickLinks(fetchFooter.data);
      }else{
        setQuickLinks([]);
      }
      
    }
    const fetchContactPrefillData =  async ()=>{
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: false,
          type:'contact',
          action: "FETCHPAGELIST"
      };
      const fetchFooterContact  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
     // console.log(fetchFooterContact.data);
      if(fetchFooterContact.data.length>0){
        setContactData(fetchFooterContact.data);
      }else{
        setContactData([]);
      }
      
    }
    fetchContactPrefillData();
    fetchPrefillData(); 
  }, []);
 

  return (
    <div className="bg-zblack pb-16" id="ceramic-footer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zblack px-20 justify-items-center bg-darkBlack text-white text-center md:text-left py-12">
          <div className="">
              <h1 className="text-base font-semibold pb-7">CONTACT US</h1>
              {(contactData && contactData.length>0) &&(
                <div dangerouslySetInnerHTML={{__html: contactData[0].description}}></div>
              )}
          </div> 
          <div className="">
              <h1 className="text-base font-semibold pb-7 pt-6 md:pt-0">QUICK LINKS</h1>
              <ul className=" text-sm leading-9 list-none p-0">
              {(quickLinksArr && quickLinksArr.length>0) && quickLinksArr.map((items)=>{
                return(
                  <li><a href={items.slug}>{items.title}</a></li>
                )
              })}
              </ul>
          </div>

          <div className="hidden">
              <h1 className="text-base font-semibold pb-7 pt-6 md:pt-0">SHOPPING</h1>
              <ul className=" text-sm leading-8 list-none p-0">
                <li><a href="#">Bisque</a></li>
                <li><a href="#">Paint/Glaze</a></li>
                <li><a href="#">Kilns</a></li>
                <li><a href="#">Glass</a></li>
                <li><a href="#">Clay/Pottery</a></li>
                <li><a href="#">Brushes</a></li>
                <li><a href="#">Ceramic Supplies</a></li>
              </ul>
          </div> 
          <div className="">
                <h1 className="text-base font-semibold pb-7 pt-6 md:pt-0">STAY CONNECTED</h1>
                <div className="flex flex-wrap items-center w-36 justify-center">
                  <div className="w-8 h-8 bg-black rounded-full text-center mr-1 p-2"> <a className="" target="_blank" href="https://www.facebook.com/ceramicartsandpotterssupply"><IoLogoFacebook className=""/></a></div>
                  <div className="w-8 h-8 bg-black rounded-full text-center mr-1 p-2"> <a href="https://twitter.com/potterycanada" target="_blank"><IoLogoTwitter /></a></div>
                  <div className="w-8 h-8 bg-black rounded-full text-center mr-1 p-2"> <a href="http://www.youtube.com/ceramicarts" target="_blank"><IoLogoYoutube /></a></div>
                  <div className="w-8 h-8 bg-black rounded-full text-center mr-1 p-2"> <a href="http://www.pinterest.ca/ceramicarts/" target="_blank"><IoLogoPinterest className=""/></a></div>
                  <div className="w-8 h-8 bg-black rounded-full text-center mr-1 mt-1 p-2"> <a href="https://www.instagram.com/ceramicartscanada/" target="_blank"><IoLogoInstagram /></a></div>
                  <div className="w-8 h-8 bg-black rounded-full text-center mr-1 mt-1 p-2"> <a href="https://ceramicartsblog.blogspot.com/" target="_blank"><FaBloggerB /></a></div>
                  <div className="w-8 h-8 bg-black rounded-full text-center mt-1 p-2"> <a href="http://visitor.r20.constantcontact.com/manage/optin?v=001wHcMLujjwHJ25DmWXE5d5xzM3BJiYi0i" target="_blank"><IoMdMail /></a></div>
                </div>
            </div> 
        </div>    
        <div className="">
          <CopyRight />  
        </div>  
      </div>
  );
};

export default Footer ;