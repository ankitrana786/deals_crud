import React from 'react';
import {
    Link, useNavigate
} from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
// import GetUserLogin from '../../API/customerLogin.php';
import { useForm } from "react-hook-form";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import getSessionData from '../../hooks/userSession';
import CUSTOMERLOGIN_API from "../../API/customerLogin.php";
import useLocalStorage from '../../hooks/useLocalStorage';
import uuid from 'react-uuid';


const LoginForm = ({variant}) => {
  // console.log(variant);
  // console.log(setToken);
  // const navigate = useNavigate();
  // const history = useHistory();
  const sessionId = uuid(); //getSessionData("sessionId", "");
  // console.log(sessionId[0]);
  // const [searchParams, setParams] =  useSearchParams();
  const findQuery = window.location.search;
  // console.log(findQuery);
  const searchParams = new URLSearchParams(findQuery);
  // console.log(searchParams);
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [userValues, setUserValues] = React.useState(null);
  const [emailConfirmation, setEmailConfirmation] = React.useState([]);
  const [value, setValue] = useLocalStorage("token", null);
  const queryString =window.location.href;
// console.log(searchParams.get("ref"))
  // React.useEffect(()=>{
  //   const [searchParams] =  []; //useSearchParams();
  // }, [searchParams])
 const onSubmit = async (data) => { 
      console.log(data);
      if(data.username=='admin@artamlabs.com' && data.password=='12345'){
        window.location.href = ROUTES.ADS_LIST;
        setMessage("Login Succesfull");
      }else{
        setMessage("Wrong Credential");
         window.location.href = ROUTES.LOGIN;
      }
  };
  const handleSelect = event =>{
    // console.log(event.target.value)
    // console.log(userValues)
    if(event.target.value !== ''){
      const splitValue = event.target.value.split('---');
      // console.log(splitValue);
      userValues.primaryEmail = splitValue[0];
      userValues.primaryName = (splitValue[1] !== "undefined") ? splitValue[1] : userValues.CUSTNAME;
      setValue(userValues);
      setStatus('1');
      setMessage("Login successful");
      if(searchParams.get("ref") !== null && searchParams.get("ref") !== undefined){
        window.location.href = "/"+searchParams.get("ref");  
      }else{
        window.location.href = "/";    
      }
      // window.location.href = "/";  
    }
    
  }
 return (
      <div className="max-w-[360px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="">
                      <div className="flex flex-col">
                        <label className="font-semibold text-lg mb-2 text-gray-600">Username</label>
                            <input
                                  placeholder="Enter username"
                                  className="px-3 py-2 outline-none border border-gray-400 mb-4"
                              {...register("username", { required: "Please enter customer username." })} 
                            />    
                      </div>
                </div>
                <div className="">
                      <div className="flex flex-col">
                        <label className="font-semibold text-lg mb-2 text-gray-600">Password</label>
                            <input
                                  type="password"
                                  placeholder="Enter your password"
                                  className="px-3 py-2 outline-none border border-gray-400 mb-4"
                              {...register("password", { required: "Please enter your password." })} 
                            />    
                      </div>
                </div>
              </div>
            <div className="flex items-center justify-center">
               <button className="w-full bg-gray-600 px-4 py-2 text-white rounded">Submit</button>
            </div>
            {message !=='' && (
                      <div className={status==='0'?"text-red-100 text-center":"text-greenBase text-center"}>{message}</div>
                  )}
          </form>
      </div>
 );
}

export default LoginForm;