import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import { ShopFilters } from "../../components/shop/filters";
import { SearchTopBar } from "../../components/shop/searchTopBar";
import { ProductGrid } from "../../components/products/ProductGrid";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
import { TextWithImage } from "../../components/common/TextWithImage";
// import textImg from '../../images/text-img.png';
// import ProductGridLoader from "../../components/Ui/loaders/product-grid-loader";
import  Breadcrumb  from "../../components/common/breadcrumb";
import  TabBlock  from "../../components/Ui/tab/tabBlock";
import axios from "axios";
// import BannerInfoAPI from "../../API/getBannerCategoryInfo.php";

const BannerInfoAPI = "https://dev.ceramicarts.com/fetch_ceramics.php";
// console.log(breadCrumbArr);
const CollectionPage = () => {
	const params = useParams();
	const [itemCount,setItemCount] = useState(0);
	const [gridView,setGridView] =useState("0");
	const [categoryInfo, setCategoryInfo] = useState(null);
	const [breadCrumbArr, setBreadcrumb] = useState([]);
	const [pTabs, setTabsArray] = useState(null);
	useEffect(() => {
		const fetchCategoryIntro = async () =>{
			// let obj = {				    
			// }
			// setCategoryInfo(obj);
   //      	setBreadcrumb(JSON.parse(obj.subCategCodes))
   //      	setTabsArray(JSON.parse(obj.tabs_data))

	            	
			const requestOptions = {
	          slug :params.slug,
	          action: "CATEGDATA"
	        }
	        // BannerInfoAPI
	        await axios.post(BannerInfoAPI, requestOptions)
	          .then(res => {
	            // console.log(res);
	            const obj = res.data;
	            // console.log(obj);
	            if(obj.length != 0){
	            	if(obj?.subCategCodes != undefined){
	            		setCategoryInfo(obj);
		            	setBreadcrumb(JSON.parse(obj.subCategCodes))
		            	setTabsArray(obj.tabs_data)	
	            	}else{
	            		setCategoryInfo([]);
	            		setTabsArray([])	
	            	}
	            	
	            }else{
	            	setCategoryInfo([]);
	            	setTabsArray([])
	            }

	        })
		// if(categoryInfo == null){
		// 	// listArray();
		// } 
		}
		fetchCategoryIntro();      
	}, [params])
	const getGridVariant=(variant)=>{
		setGridView(variant);
	}
	
	const getItemCounts = (value)=>{
		// console.log(value);
		setItemCount(value);
	}
	
	// console.log(pTabs);
	// console.log(breadCrumbArr);
	// console.log(categoryInfo);
  return (
  	<div>
  		<div className="bg-purple-50">
  			<div className="container mx-auto">
  				<div className="flex items-center pt-7">
					<Breadcrumb breadcrumbs={breadCrumbArr} />
				</div>
	  			{categoryInfo != null && (<TextWithImage  data={categoryInfo}/>)}
	  		</div>
	  	</div>
	  	<div className="container mx-auto">
		  	<div className="block flex flex-col lg:flex-row py-10 space-y-8 lg:space-y-0 lg:space-x-8 justify-between">
				<div className="text-center w-full lg:w-full">
					{pTabs != null && pTabs.length > 0 && pTabs[0]?.tabtitle != '' && (
						<TabBlock dataArray={pTabs} />
					)}
				</div>


			</div>
		</div>
	    <div className="container mx-auto">
	    	<div className={`flex pt-8 pb-16 lg:pt-[30px] lg:pb-20`}>
				<div className="flex-shrink-0 pe-24 hidden lg:hidden w-72">
					<ShopFilters />
				</div>
				<div className="w-full lg:-ms-14">
					<SearchTopBar cardView={getGridVariant} itemCount={itemCount} />
					<ProductGrid variant={gridView=="1"?"list":"default"} itemCount={getItemCounts} />
				</div>
			</div>
	    </div>
    </div>
  );
};

export default CollectionPage;
