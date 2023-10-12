import React, {useRef, useMemo} from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { useForm } from "react-hook-form";
import NavigationAPI from "../../API/LoadMenuItems.php";
import axios from "axios";
import { useParams } from "react-router-dom";
import ListDropdown from "../Ui/list-dropdown";

const apiUrl = "https://dev.ceramicarts.com/"; 

const AddNewDeal = ({ placeholder }) => {
  const params = useParams();
  const [content, setContent] = React.useState('');
  
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [type, setType] = React.useState('');
  const [target,setTarget] = React.useState('');
  const { register, handleSubmit,setValue } = useForm({ shouldUseNativeValidation: true });
 
    
  const onSubmit = async (data) => { 
       console.log(data);
        // return;    
        // const res  = await axios.post(apiUrl+"add_deals.php", formData, {headers: { "Content-Type": "multipart/form-data" }});
        // // console.log(res);
        // if(res.data.status == true){
        //     setStatus('1');
        //     setMessage(res.data.message);
        // }else{
        //     setStatus('0');    
        //     setMessage(res.data.message);
        // }                

  };
  
 
  return (
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
             <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Deal Name</label>
                  <input
                    type="text"
                    placeholder="Deal Name"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("name", { required: "Please enter name." })} 
                  />
              </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2 text-gray-600">Deal Type</label>
              <select {...register("type", {required: "Please Select Type "})} className="w-full outline-none border border-gray-400 rounded p-2 mb-6" defaultValue={type}>
                <option value="">Select Deal Type</option>
                <option value="normal">Normal</option>
                <option value="addOn">Add On</option>
                <option value="flash">Flash</option>
              </select>

            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2 text-gray-600">Target</label>
              <select {...register("target", {required: "Please Select Target "})} className="w-full outline-none border border-gray-400 rounded p-2 mb-6" defaultValue={target}>
                <option value="">Select Target</option>
                <option value="products">Products</option>
                <option value="Categories">Categories</option>
                <option value="Cart-value">Cart-value</option>
                <option value="Category-value">Category-value</option>
              </select>

            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2 text-gray-600">Category</label>
              <select {...register("categories", {required: "Please Select Category"})} className="w-full outline-none border border-gray-400 rounded p-2 mb-6" defaultValue={target}>
                <option value="">Select Category</option>
                <option value="Category1">Category 1</option>
                <option value="Category2">Category 2</option>
                <option value="Category3">Category 3</option>
              </select>
            </div>
          </div>
          <div>
             <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">SKU</label>
                  <input
                    type="text"
                    placeholder="SKU"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("skus", { required: "Please enter skus." })} 
                  />
              </div>
          </div>
          <div className="flex justify-between">
             <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Min value</label>
                  <input
                    type="number"
                    placeholder="Enter min value"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("min_value", { required: "Please enter min value." })} 
                  />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Discount Rate</label>
                  <input
                    type="number"
                    placeholder="Discount Rate"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("discount_rate", { required: "Please enter discount rate." })} 
                  />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Discount in value</label>
                  <input
                    type="number"
                    placeholder="Discount in value"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("discount_in_value", { required: "Please enter discount in value." })} 
                  />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Max Discount Allowed</label>
                  <input
                    type="number"
                    placeholder="Max Discount Allowed"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("max_discount_allowed", { required: "Please enter max discount allowed." })} 
                  />
              </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg mb-2 text-gray-600">Priority</label>
              <input
                type="number"
                placeholder="Priority"
                //defaultValue={(content.title != '') ? content.title : ""}
                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                {...register("priority", { required: "Please enter priority." })} 
              />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Creation Date</label>
                  <input
                    type="date"
                    placeholder="Choose Creation Date"
                    //defaultValue={(content.start_date != '') ? content.start_date : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("date", { required: "Please enter Creation Date." })} 
                  />
              </div>
            </div>
            <div className="">
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Expiry Date</label>
                  <input
                    type="date"
                    placeholder="Choose expiry date"
                    //defaultValue={(content.end_date != '') ? content.end_date : ""}
                    className="px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("expiry", { required: "Please enter expiry date." })} 
                  />
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <label className="font-semibold text-lg mb-2 text-gray-600">Show On Home</label>
            <div className="flex justify-start gap-10">
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">No
                  <input
                    type="radio"
                    value="0"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="ml-2 px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("show_on_home", { required: "Please enter show on home." })} 
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Yes
                  <input
                    type="radio"
                    value="1"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="ml-2 px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("show_on_home", { required: "Please enter show on home." })} 
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <label className="font-semibold text-lg mb-2 text-gray-600">Show as Banner</label>
            <div className="flex justify-start gap-10">
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">No
                  <input
                    type="radio"
                    value="0"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="ml-2 px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("show_as_banner", { required: "Please enter show as banner." })} 
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">Yes
                  <input
                    type="radio"
                    value="1"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="ml-2 px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("show_as_banner", { required: "Please enter show as banner." })} 
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-10">
            <label className="font-semibold text-lg mb-2 text-gray-600">Status</label>
            <div className="flex justify-start gap-10">
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">OK
                  <input
                    type="radio"
                    value="ok"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="ml-2 px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("status", { required: "Please enter status." })} 
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg mb-2 text-gray-600">HIDE
                  <input
                    type="radio"
                    value="hide"
                    //defaultValue={(content.title != '') ? content.title : ""}
                    className="ml-2 px-3 py-2 outline-none border border-gray-400 mb-4"
                    {...register("status", { required: "Please enter status." })} 
                  />
                </label>
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

export default AddNewDeal;