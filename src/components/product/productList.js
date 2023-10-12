import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams  
} from 'react-router-dom';
import axios from "axios";
import { ROUTES } from "../../utils/routes";
import LoadingSpinner from "../../components/Ui/loaders/loadingSpinner";
// import NavigationAPI from "../../API/LoadMenuItems.php";

const apiUrl = "https://dev.ceramicarts.com/"; 
let searchText='';
const ProductList = () => {
	const [productListArray, setProductList] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false)
	const text = useParams ();
    const findQuery = window.location.search;
   // console.log(findQuery);
  	const splitQuery = findQuery.split('=');
  //	console.log(splitQuery[1]);
  	searchText= splitQuery[1];


	React.useEffect(() => {
		
		if(productListArray == null){
			// console.log("entered");
			listArray();
		} 
		if(productListArray != null){
			//console.log("entered");
			//setLoading(false);
			setProductList(null);
			if(searchText!=undefined){
				//console.log('searchText=',searchText);
				let filterArr= productListArray.length>0 && productListArray.filter((x)=>x.item_code.indexOf(searchText) > -1);

				//console.log('filterdata',filterArr);
			//console.log(isLoading);
			//	setLoading(false);
				setProductList(filterArr);
				
			}
		}
		     
	}, [searchText])

	const listArray = async () =>{
		setLoading(true);
        const formData = new FormData();
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	        withCredentials: false,
	        action: "GETPRODUCTLIST"
    	};
		const res  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
		  console.log(res.data);
		  console.log(res.data.length);
		if(res.data.length > 0){
			//console.log(isLoading);
			
			setLoading(false);
			setProductList(res.data);
			
		}else{
			setProductList([]);
			setLoading(false);
		}
	}
	// console.log(productListArray);
	const deleteCategory = async (id)=>{
		console.log(id);
		let text = "Are you sure you want to delete this?";
		if (window.confirm(text) == true) {
		    // text = "You pressed OK!";
		  	const requestOptions = {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		        withCredentials: false,
		        itemId:id,
		        action: "DELETEPRODUCTITEM"
			};
			const res  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
			console.log(res);  
			if(res.data.status == true){
				alert(res.data.message);
				window.location.reload();
			}
		} 
	}
	return(
		<div>
			{isLoading && (<LoadingSpinner />)}
			<table className="w-full text-heading font-semibold text-sm lg:text-base">
				<thead>
					<tr>
						<th className="bg-gray-300 p-4 text-start first:rounded-ts-md w-24">
							S.No.
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Product Code
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Product Name
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
				{productListArray!=null && productListArray.map((items,index)=>{
					return(
						<tr className="odd:bg-gray-150" key={index}>
							<td className="p-4 ">{index+1}</td>
							<td className="p-4 ">{items.item_code}</td>
							<td className="p-4 ">{items.item_name}</td>
							<td className="p-4 flex items-center justify-start">
								<a
									className={
										 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24 mr-4"
									}
									href={ROUTES.ADD_PRODUCT+"/"+items.item_code}
								>
									Edit
								</a>
								<button
									className={
										 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24"}
									
									onClick={()=>deleteCategory(items.item_code)}
								>
									Delete
								</button>
							</td>
						</tr>
					)
				})}
					
					
				</tbody>
			</table>
		</div>
	);
}
export default ProductList;