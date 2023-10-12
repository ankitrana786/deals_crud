import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate, useNavigate
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
import PropTypes from 'prop-types';
import { ROUTES } from "../../utils/routes";

let tabInfoPrefill;
const kins =[
  "0",
  "1",
  "2",
  "3+"
];
const countryList = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan (Province of China)",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];
let stateArr = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"];
// console.log(countryList);
const RegisterForm = ({variant}:any) => {
  // console.log(variant);
  // console.log(setToken);
  // let navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit,setValue } = useForm({ shouldUseNativeValidation: true });
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = React.useState('');

 const onSubmit = async (data:any) => { 
     // console.log(data);
     const formData = new FormData();
     let requestOptions ={};
      requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: false,
          email:data.username,
          password: data.password,
          action: "VERIFYCREDENTIALS",
      };
      const res  = await axios.post("https://dev.ceramicarts.com/userCrud_API.php", requestOptions);
      // console.log(res);
      if(res.data.status == true){
          setStatus('1');
          setMessage(res.data.message);
          const uData = res.data?.userDetails;

          const tokenVal = await {id:uData.id, email:uData.email, name:uData.name, user_type:uData.user_type};
          sessionStorage.setItem('token', JSON.stringify(tokenVal));
          window.location.href = ROUTES.CATEGORY_LIST;
          // setToken(tokenVal);
          // navigate(ROUTES.CATEGORY_LIST);
      }else{
          setStatus('0');    
          setMessage(res.data.message);
      }   
  };

  return (
      <div className="max-w-[1015px] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-bold mb-4">User Information</h2>
          <div className="flex items-start gap-4 justify-between mb-6 border-b border-gray-500 pb-2">
            <div className="w-1/2">
              <div className="">
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Username *</label>
                          <input
                                placeholder="Enter Username"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("username", { required: "Please enter username." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Email *</label>
                          <input
                                placeholder="Enter Email"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("username", { required: "Please enter email." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Password *</label>
                          <input
                                placeholder="Enter Password"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("password", { required: "Please enter password." })} 
                          />  
                      <p className="text-linkColor -mt-2 mb-2">Password is case sensitive</p> 
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Password Confirmation *</label>
                          <input
                                placeholder="Enter Password"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("password", { required: "Please enter password." })} 
                          />  
                    </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="">
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">First Name *</label>
                          <input
                                placeholder="Enter Username"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("username", { required: "Please enter username." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Last Name *</label>
                          <input
                                placeholder="Enter Email"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("username", { required: "Please enter email." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Company Name</label>
                          <input
                                placeholder="Enter Email"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("username", { required: "Please enter email." })} 
                          />   
                    </div>
                    
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-between border-b border-gray-500 pb-2">
            <div className="w-1/2">
              <h2 className="text-xl font-bold mb-4">Bill To Address</h2>
              <div className="">
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Address *</label>
                          <textarea
                                placeholder="Enter Address"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("username", { required: "Please enter username." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">City *</label>
                          <input
                                placeholder="Enter City"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("city", { required: "Please enter city." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Country *</label>
                      <select {...register("category_list")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" >
                        <option value="">Choose Country</option>
                        {countryList.map((items,index) => {
                          return(
                                <option key={index}>{items}</option>  
                          )})}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Province/State *</label>
                      <select {...register("category_list")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" >
                        <option value="">Choose Country</option>
                        {stateArr.map((items,index) => {
                          return(
                                <option key={index}>{items}</option>  
                          )})}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Postal/Zip Code *</label>
                          <input
                                placeholder="Enter Pin"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("pincode", { required: "Please enter pincode." })} 
                          />  
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Phone *</label>
                          <input
                                placeholder="Enter Phone"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("phone", { required: "Please enter phone." })} 
                          />  
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Fax</label>
                          <input
                                placeholder="Enter Fax"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("fax", { required: "Please enter fax." })} 
                          />  
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Website *</label>
                          <input
                                placeholder="Enter Website"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("website", { required: "Please enter website." })} 
                          />  
                    </div>
              </div>
            </div>
            <div className="w-1/2">
              <h2 className="text-xl font-bold mb-4">Ship To Address (Billing same as Shipping)</h2>
              <div className="">
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship Address </label>
                          <textarea
                                placeholder="Enter Ship Address"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("shipaddress", { required: "Please enter ship address." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship City </label>
                          <input
                                placeholder="Enter Ship City"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("shipcity", { required: "Please enter ship city." })} 
                          />   
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship Country </label>
                      <select {...register("shipcountry")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" >
                        <option value="">Choose Ship Country</option>
                        {countryList.map((items,index) => {
                          return(
                                <option key={index}>{items}</option>  
                          )})}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship Province/State *</label>
                      <select {...register("shipstate")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" >
                        <option value="">Choose Ship State</option>
                        {stateArr.map((items,index) => {
                          return(
                                <option key={index}>{items}</option>  
                          )})}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship Postal/Zip Code *</label>
                          <input
                                placeholder="Enter Pin"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("pincode", { required: "Please enter pincode." })} 
                          />  
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship Phone </label>
                          <input
                                placeholder="Enter Ship Phone"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("shipphone", { required: "Please enter ship phone." })} 
                          />  
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship Fax</label>
                          <input
                                placeholder="Enter Ship Fax"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("shipfax", { required: "Please enter ship fax." })} 
                          />  
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Ship Website *</label>
                          <input
                                placeholder="Enter Ship Website"
                                className="px-3 py-2 outline-none border border-gray-400 mb-4"
                            {...register("shipwebsite", { required: "Please enter ship website." })} 
                          />  
                    </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-between pb-2 mt-4">
            <div className="w-1/2">
              <h2 className="text-xl font-bold mb-4">Tell Us More About Yourself</h2>
              <div className="">
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg mb-2 text-gray-600">I am interested in opening a studio *</p>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="studio"
                               id="Yes"
                               /*checked={lo.selected}*/
                               value="Yes"
                               checked
                           />
                            <label className="ml-2">Yes </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="studio"
                               id="No"
                               /*checked={lo.selected}*/
                               value="No"
                           />
                            <label className="ml-2">No </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="studio"
                               id="business"
                               /*checked={lo.selected}*/
                               value="I have an existing business"
                           />
                            <label className="ml-2">I have an existing business </label>
                          </div>
                         
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="font-semibold text-lg mb-2 text-gray-600">What best describes you? *</p>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="describes"
                               id="Storefront"
                               /*checked={lo.selected}*/
                               value="Storefront"
                               checked
                           />
                            <label className="ml-2">Storefront </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="describes"
                               id="Home"
                               /*checked={lo.selected}*/
                               value="Home studio"
                           />
                            <label className="ml-2">Home studio </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="describes"
                               id="business"
                               /*checked={lo.selected}*/
                               value="Institution/School/Teacher"
                           />
                            <label className="ml-2">Institution/School/Teacher </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="describes"
                               id="business"
                               /*checked={lo.selected}*/
                               value="Institution/School/Teacher"
                           />
                            <label className="ml-2">Pottery/Clay artists </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="studio"
                               id="Hobbyist"
                               /*checked={lo.selected}*/
                               value="Hobbyist"
                           />
                            <label className="ml-2">Hobbyist </label>
                          </div>
                         
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="font-semibold text-lg mb-2 text-gray-600">How did you find out about us? </p>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="aboutus"
                               id="Internet"
                               /*checked={lo.selected}*/
                               value="Internet"
                               checked
                           />
                            <label className="ml-2">Internet </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="aboutus"
                               id="Friend"
                               /*checked={lo.selected}*/
                               value="Friend"
                           />
                            <label className="ml-2">Friend </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="aboutus"
                               id="Tradeshow"
                               /*checked={lo.selected}*/
                               value="Tradeshow"
                           />
                            <label className="ml-2">Tradeshow </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="aboutus"
                               id="business"
                               /*checked={lo.selected}*/
                               value="Advertising"
                           />
                            <label className="ml-2">Advertising </label>
                          </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="font-semibold text-lg mb-2 text-gray-600">What brand of glaze do you use? </p>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="brand"
                               id="Duncan"
                               /*checked={lo.selected}*/
                               value="Duncan"
                               checked
                           />
                            <label className="ml-2">Duncan </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="brand"
                               id="Gare"
                               /*checked={lo.selected}*/
                               value="Gare"
                           />
                            <label className="ml-2">Gare </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="brand"
                               id="Mayco"
                               /*checked={lo.selected}*/
                               value="Mayco"
                           />
                            <label className="ml-2">Mayco </label>
                          </div>
                          <div>
                            <input
                               /*className="default"*/
                               type="radio"
                               name="brand"
                               id="Other"
                               /*checked={lo.selected}*/
                               value="Other"
                           />
                            <label className="ml-2">Other </label>
                          </div>
                          <div className="flex flex-col mt-2">
                            <label className="font-semibold text-lg mb-2 text-gray-600">Please specify the other glaze brand</label>
                                <input
                                      placeholder="Enter Glaze Brand"
                                      className="px-3 py-2 outline-none border border-gray-400 mb-4"
                                  {...register("glazeBrand", { required: "Please enter glaze brand." })} 
                                />  
                          </div>
                          <div className="flex flex-col">
                            <label className="font-semibold text-lg mb-2 text-gray-600">How many kilns do you have? </label>
                            <select {...register("kins")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" >
                              <option value="0"> 0</option>
                              {kins.map((items,index) => {
                                return(
                                      <option key={index}>{items}</option>  
                                )})}
                            </select>
                          </div>
                    </div>
              </div>
            </div>
          </div>
          <div className="flex items-center w-[100px]">
             <button className="w-full bg-gray-600 px-4 py-2 text-white rounded">Register</button>

          </div>
          {message !='' && (
                    <div className={status=='0'?"text-red-100 text-center":"text-greenBase text-center"}>{message}</div>
                )}
        </form>
      </div>
 );
}

/*RegisterForm.propTypes = {
  setToken: PropTypes.func.isRequired
}*/
export default RegisterForm;