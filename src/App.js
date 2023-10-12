import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import AdminAccountLayout from './components/layout/admin-account-layout';

// import Home from "./pages/Home";
import ThankyouPage from "./pages/orderstatus";
import Pages from "./pages/[slug]";
import MyAccount from "./pages/myaccount";
import MyCart from "./pages/cart/";
import Registerpage from "./pages/register";
import Page2 from "./pages/Page1";
import Collection from "./pages/collection/";
import Admin from "./pages/admin/";
import ContactUs from "./pages/admin/contactus/";
import DealPage from "./pages/admin/deal/";
import AddDealInfo from "./pages/admin/deal/adddeal";
import ProductDetail from "./pages/productdetail/";
import LoginPage from "./pages/admin/login";
import { ROUTES } from "./utils/routes"
// import { useParams } from "react-router-dom";
import useSessionStorage from './hooks/userSession';
import getStorageData from './hooks/useLocalStorage';
import { AuthContext } from './context/AuthContext';
import { CartContext } from './context/cart/CartContext';
import { useAuth } from './hooks/useAuth';
// import { Provider } from "./context/"
const Layout = React.lazy(() => import('./components/layout/Layout'))
// import Layout from './components/layout/Layout';

const Home = React.lazy(() => import('./pages/admin/login'))


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}
export default function App() {
  const { user, setUser, isLoggedIn } = useAuth();
  // sessionStorage.clear();
  const queryString =window.location.href;
// console.log(queryString);
 const mainurl = queryString.indexOf("/admin")>-1;
 const token = getToken();;
 const userData = getStorageData("token", null);

   if(queryString.indexOf("/admin/login")>-1) {
    return <LoginPage  />
  }
  return (
    <>
      {mainurl==true ?(
        <AdminAccountLayout>
          <Router>
            <Routes> 
              <Route path={ROUTES.DASHBOARD} element={<Admin />} />
              <Route path={ROUTES.CONTACTUS_FORM} element={<ContactUs/>} /> 
              <Route path={ROUTES.ADS_LIST} element={<DealPage />} />
              <Route path={ROUTES.ADD_DEAL} element={<AddDealInfo/>} />
              <Route path={ROUTES.ADD_DEAL+"/:id"} element={<AddDealInfo/>} />
            </Routes> 
          </Router>
        </AdminAccountLayout>
      ):(
        <>
          <Router>
            <Routes> 
              <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
            </Routes> 
          </Router>
        </>
      )}
        
    </>
  );
}

