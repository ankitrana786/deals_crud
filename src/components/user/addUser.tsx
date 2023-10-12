import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import { IoIosSearch } from "react-icons/io";
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {
  IoAddCircleOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
let tabInfoPrefill;
const AddUser = () => {
  const params = useParams();
  const { register, handleSubmit,setValue, reset } = useForm({ shouldUseNativeValidation: true });
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [userData, setUserData] = React.useState(null);
 React.useEffect(() => {
    if(params.id != undefined){
        fetchPrefillData();    
    }
 },[])
 const fetchPrefillData =  async ()=>{
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: false,
          userId:params.id,
          action: "GETUSER"
      };
      // const formData = new FormData();
      // formData.append('File', selectedFile);
      
      const fetchInfo  = await axios.post("https://dev.ceramicarts.com/userCrud_API.php", requestOptions);
      console.log(fetchInfo.data);
      if(fetchInfo != undefined && fetchInfo.data){
         setUserData(fetchInfo.data);
         setValue("name", fetchInfo.data?.name);
         setValue("username", fetchInfo.data?.email);
         setValue("password", fetchInfo.data?.password);
         setValue("usertype", fetchInfo.data?.user_type);
      }
  }
 const onSubmit = async (data:any) => { 
     console.log(data);
     const formData = new FormData();
     let requestOptions ={};
      if(params.id !=undefined){
         requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: false,
            name: data.name,
            password: data.password,
            usertype:data.usertype,
            action: "UPDATEUSER",
            rowId:params.id
        };
      }else{
        requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: false,
            name: data.name,
            username:data.username,
            password: data.password,
            usertype:data.usertype,
            action: "ADDUSER",
            rowId:'0'
        };
         // formData.append("name", data.name);
         // formData.append("password", data.password);
         // formData.append("username", data.username);
         // formData.append("usertype", data.usertype);
         // formData.append("action", "ADDUSER");
         // formData.append("rowId", "0");
      }
      const res  = await axios.post("https://dev.ceramicarts.com/userCrud_API.php", requestOptions);
      console.log(res);
      if(res.data.status == true){
          setStatus('1');
          setMessage(res.data.message);
      }else{
          setStatus('0');    
          setMessage(res.data.message);
      } 
      reset();  
  };

 
 

  
  return (
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
                  <div className="flex flex-col">
                    <label className="font-semibold text-lg mb-2 text-gray-600">Name</label>
                        <input
                              placeholder="Enter Title"
                              className="px-3 py-2 outline-none border border-gray-400 mb-4"
                          {...register("name", { required: "Please enter name." })} 
                        />   
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-lg mb-2 text-gray-600">Email</label>
                        <input
                              placeholder="Enter Username" readOnly={(params.id != undefined) && true}
                              className="px-3 py-2 outline-none border border-gray-400 mb-4"
                          {...register("username", { required: "Please enter username." })} 
                        />   
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-lg mb-2 text-gray-600">Password</label>
                        <input
                              placeholder="Enter Password"
                              className="px-3 py-2 outline-none border border-gray-400 mb-4"
                          {...register("password", { required: "Please enter password." })} 
                        />   
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold text-lg mb-2 text-gray-600">User Type</label>
                    <select {...register("usertype", { required: "Please Select User Type" })} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6">
                        <option value="">Select User Type</option>
                        <option value="editor">Editor</option>
                        <option value="subadmin">Sub Admin</option>
                    </select>  
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

export default AddUser;