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

const DealsList = () => {
	const [dealsListArray, setDealsListArray] = React.useState(null);
	const [isLoading, setLoading] = React.useState(false)
	React.useEffect(() => {
		if(dealsListArray == null){
			listArray();
		}       
	}, [])

	const listArray = async () =>{
		setLoading(true);
        const formData = new FormData();
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	        withCredentials: false,
	        action: "GETDEALSLIST"
    	};
		const res  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
		// console.log(res);
		if(res.data.length > 0){
			setDealsListArray(res.data);
			setLoading(false);
		}else{
			setDealsListArray([]);
			setLoading(false);
		}
	}
	// console.log(dealsListArray);
	const deleteDeals = async (id)=>{
		console.log(id);
		let text = "Are you sure you want to delete this?";
		if (window.confirm(text) == true) {
		    // text = "You pressed OK!";
		  	const requestOptions = {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		        withCredentials: false,
		        itemId:id,
		        action: "DELETEDEALITEM"
			};
			const res  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
			// console.log(res);  
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
							Deal Name
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Deal Type
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Creation Date
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Status
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
				
				
						<tr className="odd:bg-gray-150" >
							<td className="p-4 ">1</td>
							<td className="p-4">Diwali Offer</td>
							<td className="p-4 ">Normal</td>
							<td className="p-4 ">13-10-2023</td>
							<td className="p-4 ">Ok</td>
							<td className="p-4 flex items-center justify-start">
								<a
									className={
										 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24 mr-4"
									}
									href={ROUTES.ADD_DEAL+"/"+1}
								>
									Edit
								</a>
								<button
									className={
										 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24"}
									
									onClick={()=>deleteDeals(1)}
								>
									Delete
								</button>
							</td>
						</tr>
					
					
					
				</tbody>
			</table>
		</div>
	);
}
export default DealsList;