import React, {useEffect} from "react";
//import AdminLayout from "../../components/Layout/admin-layout";
import AdminAccountLayout from "../../../components/layout/admin-account-layout";
import ContactUs from "../../../components/contactus/contactus";
import { ROUTES } from "../../../utils/routes"


const ContactUsPage = () => {
	
	return (
		<>
			<div>
				<div className="flex justify-between">
					<h2 className="font-bold text-xl mb-10">Contact Us</h2>
				</div>
				<ContactUs />
			</div>
			
		</>
	);
};

export default ContactUsPage;



