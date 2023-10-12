import React from 'react';
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import ReactDOM from 'react-dom';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from "./context/cart/CartContext"

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
  	<QueryClientProvider client={queryClient}>
      <CartProvider>
    	  <App />
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
