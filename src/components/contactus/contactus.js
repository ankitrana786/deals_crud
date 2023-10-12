import React, {useRef, useMemo} from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import image1 from '../../images/img1.png';
import { IoIosSearch } from "react-icons/io";
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavigationAPI from "../../API/LoadMenuItems.php";
import axios from "axios";
import {
  IoAddCircleOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import ListDropdown from "../Ui/list-dropdown";
import { Combobox } from '@headlessui/react'
import JoditEditor from 'jodit-react';
import SeoForm from '../common/seoform';

let tabInfoPrefill;
let intialArray = {CODE:'', PRD_DESC:'', subMenu:[]};
let initData = '0';
const apiUrl = "https://dev.ceramicarts.com/"; 

const tinymceKey = 'rw6onzpo63rc8a6ow34a9bi70erjp1ff9g2tczwiiwx4s4cd';
const ContactUs = ({ placeholder }) => {
  const imgPath = apiUrl+"categoryBanners/";

  const params = useParams();
  const editor = useRef(null);
  const [content, setContent] = React.useState('');
  const [htmlText, setHtmlText] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('');
  const { register, handleSubmit,setValue } = useForm({ shouldUseNativeValidation: true });
  const [activeData, setActiveData] = React.useState([]);
  const [rowId,setRowId] = React.useState(null);

    
  const config = useMemo(() => (
    {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: placeholder || 'Start typings...',
      uploader: {
        "insertImageAsBase64URI": true
      }
    }),
    [placeholder]
  );


  React.useEffect(() => {
    const fetchAllData =  async ()=>{
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: false,
          type:'contact',
          action: "FETCHPAGELIST"
      };
      const fetchContact  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
     // console.log(fetchContact.data);
      if(fetchContact.data.length>0){
        let rId= parseInt(fetchContact.data[0].id);
        setHtmlText(fetchContact.data[0].description);
       // console.log(rId);
        setRowId(rId);
      }else{
        setRowId(null);
      }
      
    }
    if(rowId==null){
      fetchAllData(); 
    }
    
    
  }, []);
  const onSubmit = async (data) => { 
      //console.log(rowId);
      //return;
       let requestOptions ={};
       const formData = new FormData();
      if(rowId!=null){
          formData.append("title", '');
          formData.append("description", htmlText);
          formData.append("slug", '');
          formData.append("filename", '');
          formData.append("action", "EDIT");
          formData.append("rowId",rowId);
          formData.append("seo_title", '');
          formData.append("seo_desc", '');
          formData.append("showon", 'contact');
      }else{
          formData.append("title", '');
          formData.append("description", htmlText);
          formData.append("slug", '');
          formData.append("filename", '');
          formData.append("action", "ADD");
          formData.append("rowId", 0);
          formData.append("seo_title", '');
          formData.append("seo_desc", '');
          formData.append("showon", 'contact');
      
      }   
        const res  = await axios.post(apiUrl+"add_pages.php", formData, {headers: { "Content-Type": "multipart/form-data" }});
       // console.log(res);
        if(res.data.status == true){
            setStatus('1');
            setMessage(res.data.message);
        }else{
            setStatus('0');    
            setMessage(res.data.message);
        }                

  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'code'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ]

  
  
  const handleChangeContent = (event)=>{
   // console.log(event);
    setHtmlText(event);
  }
   
   
  return (
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4 ">
             
               <JoditEditor
                  config={config}
                  value={htmlText}
                  // tabIndex of textarea
                  onChange={(e)=>handleChangeContent(e)}
                />
              
            </div>
          </div>
          <div className="flex items-center gap-10">
              <button className="w-32 bg-gray-600 px-4 py-2 text-white rounded">Submit</button>
                {message !='' && (
                    <div className={status=='0'?"text-red-100":"text-greenBase "}>{message}</div>
                )}
           </div>
        </form>
      </div>
 );
};

export default ContactUs;