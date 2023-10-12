import React from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import axios from "axios";
import { ROUTES } from "../../utils/routes";
import NavigationAPI from "../../API/LoadMenuItems.php";
import LoadingSpinner from "../../components/Ui/loaders/loadingSpinner";
const apiUrl = "https://dev.ceramicarts.com/"; 

const PageList = () => {
	const [pageListArray, setPageListArray] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false)
	React.useEffect(() => {
        listArray()
	}, [])

	const listArray = async () =>{
		setLoading(true);
        const formData = new FormData();
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	        withCredentials: false,
	        action: "PAGESLIST"
    	};
		const res  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
		if(res.data.length > 0){
			let filterData= res.data.filter((f)=>f.showon!='' && f.showon!='contact');
			//console.log(filterData);
			setPageListArray(filterData);
			setLoading(false);
		}else{
			setPageListArray([]);
			setLoading(false);
		}
	}
	// console.log(pageListArray);
	const deletePage = async (id)=>{
		//console.log(id);
		let text = "Are you sure you want to delete this?";
		if (window.confirm(text) == true) {
		    // text = "You pressed OK!";
		  	const requestOptions = {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		        withCredentials: false,
		        itemId:id,
		        action: "DELETEPAGE"
			};
			const res  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
			console.log(res);  
			if(res.data.status == true){
				alert(res.data.message);
				window.location.reload();
			}
		} 
	}
	const getCategoryName = (categArray)=>{
		// console.log(categArray);
		const arrayList = JSON.parse(categArray.subCategCodes);
		// console.log(arrayList);
		let arryStr = "";
		for(let m=0; m < arrayList.length; m++){
			// console.log(arrayList.length);
			// console.log(m);
			if(m == arrayList.length -1){
				arryStr += arrayList[m].PRD_DESC;	
			}else{
				arryStr += arrayList[m].PRD_DESC + " > ";
			}
			
		}
		// console.log(arryStr);
		return arryStr;
	}
	// console.log(pageListArray);
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
							Title
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Slug
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Quick Link
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
				{pageListArray!=null && pageListArray.map((items,index)=>{
					return(
						<tr className="odd:bg-gray-150">
							<td className="p-4 ">{index+1}</td>
							<td className="p-4">{items.title}</td>
							<td className="p-4 ">{items.slug}</td>
							<td className="p-4 ">
								{items.showon}
							</td>
							<td className="p-4 flex items-center justify-start">
								<a
									className={
										 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24 mr-4"
									}
									href={ROUTES.ADD_PAGE+"/"+items.id}
								>
									Edit
								</a>
								<button
									className={
										 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24"}
									
									onClick={()=>deletePage(items.id)}
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
export default PageList;