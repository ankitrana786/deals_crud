import React, {useEffect} from "react";
import {useLocation} from 'react-router-dom';

//import AdminLayout from "../../components/Layout/admin-layout";
import ThankyYou from "../components/thankyou/thankyou";
import { ROUTES } from "../utils/routes";


const ThankyouPage = () => {
	
	const location = useLocation();
	// console.log(location);
	return (
		<>
			<div className="px-10 mt-10">	
				<ThankyYou orderdata={location.state} />
			</div>
			
		</>
	);
};

export default ThankyouPage;



