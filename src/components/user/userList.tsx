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
import LoadingSpinner from "../../components/Ui/loaders/loadingSpinner";
const UserList = () => {
	const [userListArray, setUserList] = React.useState<any>(null);
	const [isLoading, setLoading] = React.useState(false)
	React.useEffect(() => {
		// console.log(userListArray);
		if(userListArray == null){
			listArray();
		}       
	})
	const listArray = async () =>{
		setLoading(true);
		let requestOptions ={};
        requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: false,
            action: "GETUSERLIST"
        };
		const res  = await axios.post("https://dev.ceramicarts.com/userCrud_API.php", requestOptions);
		// console.log(res);
		if(res.data.length > 0){
			setUserList(res.data);
			setLoading(false);
		}else{
			setUserList([]);
			setLoading(false);
		}
	}
	// console.log(userListArray);
	const deleteCategory = async (id:any)=>{
		console.log(id);
		let text = "Are you sure you want to delete this?";
		if (window.confirm(text) == true) {
		    // text = "You pressed OK!";
		  	const requestOptions = {
		        method: 'POST',
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		        withCredentials: false,
		        userId:id,
		        action: "DELETEUSER"
			};
			const res  = await axios.post("https://dev.ceramicarts.com/userCrud_API.php", requestOptions);
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
							UserId
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Name
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Username
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Type
						</th>
						<th className="bg-gray-300 p-4 text-start last:rounded-te-md w-24">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{userListArray!=null && userListArray.map((items:any,index:number)=>{
						return(
							<tr className="odd:bg-gray-150" key={"us_"+index}>
								<td className="p-4 ">{items.id}</td>
								<td className="p-4">{items.name}</td>
								<td className="p-4 ">{items.email}</td>
								<td className="p-4 ">{items.user_type}</td>
								<td className="p-4 flex items-center justify-start">
									{items.user_type != 'admin' && (
										<>
											<a
												className={
													 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24 mr-4"
												}
												href={ROUTES.ADD_USER+"/"+items.id}
											>
												Edit
											</a>
											<button
												className={
													 "bg-gray-300 font-semibold flex items-middle cursor-pointer text-sm lg:text-base text-heading py-2 px-4 lg:px-5 rounded mb-2 mt-2 w-24"}
												
												onClick={()=>deleteCategory(items.id)}
											>
												Delete
											</button>
										</>
									)}
								</td>
							</tr>
						)
					})}
					
				</tbody>
			</table>
		</div>
	);
}
export default UserList;