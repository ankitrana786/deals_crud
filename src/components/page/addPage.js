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


const typeArr=[
  {
    name:'Quick Link',
    value:'links'
  },
  {
    name:'Resources',
    value:'resources'
  }
];
let tabInfoPrefill;
let intialArray = {CODE:'', PRD_DESC:'', subMenu:[]};
let initData = '0';
const apiUrl = "https://dev.ceramicarts.com/"; 

const tinymceKey = 'rw6onzpo63rc8a6ow34a9bi70erjp1ff9g2tczwiiwx4s4cd';
const AddPage = ({ placeholder }) => {
  const imgPath = apiUrl+"categoryBanners/";

  const params = useParams();
  const editor = useRef(null);
  const [content, setContent] = React.useState('');
  const [seojson,setSeoJson] = React.useState(null);
  // const editorRef = useRef(null);
  const [htmlText, setHtmlText] = React.useState('');
  const [bannerImage, setBannerImage] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [categChain, setCategChain] = React.useState([]);
  const [subCategList, setSubCategList] = React.useState(null);
  const { register, handleSubmit,setValue } = useForm({ shouldUseNativeValidation: true });
  const [selectedFile, setSelectedFile] = React.useState();
  const [fileType, setFileType] = React.useState();
  const [imgSRC, setImageSrc] = React.useState('');

  const [categoryList, setCategoryList] = React.useState(null);
  const [activeData, setActiveData] = React.useState([]);
  const [type,setType] = React.useState('');
    
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
    
    const fetchPrefillData =  async ()=>{

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: false,
            itemId:params.id,
            action: "EDITPAGEINFO"
        };
        // const formData = new FormData();
        // formData.append('File', selectedFile);
        
        const fetchInfo  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
       //console.log(fetchInfo.data);
        if(fetchInfo != undefined && fetchInfo.data){
            // const filtered =  Object.keys(categoryList).find(key => categoryList[key].indexOf(fetchInfo.data.category_code) > -1);
            // console.log("jhakkakaassssssss");
            setValue('title',fetchInfo.data?.title);
            setValue('slug',fetchInfo.data?.slug);
            setSeoJson({title:fetchInfo.data?.seo_title, desc:fetchInfo.data?.seo_des});
            // setValue('category_list',fetchInfo.data?.category_name);
            setHtmlText(fetchInfo.data?.description);
            const filterType=typeArr.filter((t)=>t.value==fetchInfo.data?.showon);
           // console.log(filterType);
            setType(filterType[0].value);
            
            setImageSrc(fetchInfo.data?.filename)
            // console.log(parseTabs);
           
        }
    }
    if(params.id != undefined){
        fetchPrefillData();   
    }
  }, []);
  const onSubmit = async (data) => { 
      // console.log(data);
       let newSlug='';
      // console.log(subCategList);
      if(data.title==''){
        setMessage("Please enter title");
        setStatus('0');
       return;
      }
      if(data.slug==''){
        setMessage("Please enter slug");
        setStatus('0');
       return;
      }
      if(data.slug){
       newSlug = data.slug.replace(/\s/g, '')
      // console.log(newSlug);
      }
     /* if(selectedFile == undefined && imgSRC == ''){
          setMessage("Kindly upload an image or video file");
          setStatus('0');
          return;
      }*/
      
      // const URI = "https://localhost:8080:3000/API/add_categoryInfo.php";
       let requestOptions ={};
       const formData = new FormData();
      
       // console.log(subCategList);
       // console.log(subCategs);
       // return;
      if(params.id!=undefined){
          formData.append("title", data.title);
          formData.append("description", htmlText);
          formData.append("slug", newSlug);
          formData.append("myfile", (selectedFile == undefined) ? imgSRC : selectedFile);
          formData.append("action", "EDIT");
          formData.append("rowId",params.id);
          formData.append("seo_title", seojson?.title);
          formData.append("seo_desc", seojson?.desc);
          formData.append("showon", type!='' ? type : '');

         
        // requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     withCredentials: false,
        //     pageTitle: data.pageTitle,
        //     htmlContent:htmlText,
        //     slug: parentCategName,
        //     fileType:fileType,
        //     fileUrl:"",
        //     categoryCode:"",
        //     tabsArray:tabDataArray,
        //     action: "EDIT",
        //     selectedFile
        // };
      }else{
          formData.append("title", data.title);
          formData.append("description", htmlText);
          formData.append("slug", newSlug);
          formData.append("myfile", selectedFile);
          formData.append("action", "ADD");
          formData.append("rowId", 0);
          formData.append("seo_title", seojson?.title);
          formData.append("seo_desc", seojson?.desc);
          formData.append("showon", type!='' ? type : '');
        // requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     withCredentials: false,
        //     pageTitle: data.pageTitle,
        //     description:htmlText,
        //     slug: data.category_list,
        //     fileType:fileType,
        //     fileUrl:"",
        //     categoryCode:"",
        //     tabsArray:tabDataArray,
        //     action: "ADD"
        // }; 
      }
     // console.log(formData);
         
         
        // console.log(formData);
        // return;    
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
    const changeHandler = (event) => {
        let file = event.target.files[0];
        // console.log(file);
        setMessage("");
        setStatus('');
        const size = file.size // it's in bytes
        //console.log(size)
         var reader = new FileReader();
        reader.readAsDataURL(file);
            reader.onload = function (e) {
                //Initiate the JavaScript Image object.
                var image = new Image();
 
                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;
                       
                //Validate the File Height and Width.
                image.onload = function () {
                    var height = this.height;
                    var width = this.width;
                    console.log('width==',width);
                    console.log('height==',height);
                    if (height > 600 || width > 1920) {
 
                       //show width and height to user
                        /*document.getElementById("width").innerHTML=width;
                        document.getElementById("height").innerHTML=height;*/
                        alert("file dimensions must be 1920 X 600");
                        return false;
                    }
                };
        }
        //added a max file size limit of 100Kb
        if (size/1024 > 150) {
          alert("file size must not be greater than to 150Kb")
          setSelectedFile();
          return;
        }
        const fileExt = file.name.split('.').pop().toLowerCase();
        // console.log(fileExt);
        if ( /\.(jpeg|png|jpg)$/i.test(file.name) === false ) { 
          alert("Not an image file!");
          setSelectedFile();
          return;
        }else{
          setSelectedFile(file);
        }
        
    };
    const handleSeoData=(data)=>{
     // console.log(data);
      setSeoJson(data)
    }
  
    const selectType = (event)=>{
      console.log(event.target.value);
      setType(event.target.value);
       // const paresData = JSON.parse(event.target.value);
        // console.log(paresData);
        // console.log(categChain);
       // setCategChain([{CODE : paresData.CODE, PRD_DESC: paresData.PRD_DESC, subMenu: paresData.subMenu[0]}]);  
        
    }
  return (
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="">
                 <div className="flex flex-col">
                   <label className="font-semibold text-lg mb-2 text-gray-600">Page Title</label>
                  <input
                    placeholder="Enter Page Title"
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("title", { required: "Please enter page title." })} 
                  />
                  <label className="font-semibold text-lg mb-2 text-gray-600">Slug</label>
                  <input
                    placeholder="Enter Slug"
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("slug", { required: "Please slug." })} 
                  />
                  <div className="flex flex-col">
                    <label className="font-semibold text-lg mb-2 text-gray-600">Type</label>
                    <select {...register("showon")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" onChange={selectType} value={type!='' ?type:''}>
                      <option value="">Select Type</option>
                        {typeArr.map((obj, index) => {
                          return(
                            <option value={obj.value} key={"optionVal_"+index}>{obj.name}</option>  
                          )
                        })} 
                    </select>
                  </div>
                  <div className="">
                  <div className="flex flex-col">
                    <label className="font-semibold text-lg mb-2 text-gray-600">Choose Image</label>
                    <div className="mb-4 flex items-center gap-4">
                        <input
                            placeholder=""
                            type="file"
                            className="px-3 py-2 outline-none border border-gray-400 mb-4"
                              {...register("myfile", { 
                                  // required: "Please upload image/video." 
                              })}
                            onChange={changeHandler} 
                        />
                        {params.id != undefined && (
                          <div>
                            <img src={imgPath+imgSRC} className="w-full max-w-[230px]" />
                          </div>
                        )}
                    </div>
                    
                  </div>
                </div>
                <div className="mb-4 ">
                  <label className="font-semibold text-lg mb-4 text-gray-600">Html Content</label>
                   <JoditEditor
                      config={config}
                      value={htmlText}
                      // tabIndex of textarea
                      onChange={(e)=>handleChangeContent(e)}
                    />
                  
                </div>
                <div>
                  <SeoForm seoData={handleSeoData} preSeoData={seojson!=null && seojson}/>   
                </div>
              </div>
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

export default AddPage;