import React, {useEffect} from "react";
//import AdminLayout from "../../components/Layout/admin-layout";
import AdminAccountLayout from "../../../components/layout/admin-account-layout";
import AddnewDeal from "../../../components/deals/addNewDeal";
import { ROUTES } from "../../../utils/routes"
import { useParams } from "react-router-dom";

const AddDealPage = () => {
	const params = useParams();
	const goBack=()=>{
		window.history.back();
	}
	return (
		<>
			<div>
				<div className="flex justify-between">
					<h2 className="font-bold text-xl mb-10">{(params.id != undefined) ? "Update Deal" : "Create Deal"}</h2>
					<button
						className={
							 "bg-gray-300 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2"
						}
						onClick={goBack}
					>
						Back to list
					</button>
				</div>
				<AddnewDeal/>
			</div>
			
		</>
	);
};

export default AddDealPage;



