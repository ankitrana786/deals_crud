import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";

import  ProductSingleDetail  from "../../components/products/ProductSingleDetail";
import axios from "axios";
// import BannerInfoAPI from "../../API/getBannerCategoryInfo.php";

// console.log(breadCrumbArr);
const ProductDetailPage = () => {
	const params = useParams();
	
  return (
  	<div>
  		<ProductSingleDetail />
    </div>
  );
};

export default ProductDetailPage;
