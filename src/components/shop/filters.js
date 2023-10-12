import React,{useState,useEffect} from 'react';
import cn from "classnames";
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import { FiSearch} from "react-icons/fi";
import PrimaryButton from "../Ui/buttons/button";
import {ColorFilter} from "./color"

export const ShopFilters = () => {
  
  return (
    <div className="mr-5">
        <ColorFilter />
    </div>   
 );
};