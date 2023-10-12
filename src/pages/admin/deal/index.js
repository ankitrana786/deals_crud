import React, {useEffect} from "react";
//import AdminLayout from "../../components/Layout/admin-layout";
import AdminAccountLayout from "../../../components/layout/admin-account-layout";
import DealsList from "../../../components/deals/dealsList";
import { ROUTES } from "../../../utils/routes"


const DealPage = () => {
	
	
	return (
		<>
			<div>
				<div className="flex justify-between">
					<h2 className="font-bold text-xl mb-10">Deals List</h2>
					<a
						className={
							 "bg-gray-300 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2"
						}
						href={ROUTES.ADD_DEAL}
					>
						Create New Deal
					</a>
				</div>
				<DealsList />
			</div>
			
		</>
	);
};

export default DealPage;



