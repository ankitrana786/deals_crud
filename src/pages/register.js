import React, {useEffect} from "react";
//import AdminLayout from "../../components/Layout/admin-layout";
import RegisterForm from "../components/auth/registerForm";
import { ROUTES } from "../utils/routes";


const LoginPage = () => {
	
	return (
		<>
			<div className="px-10 mt-6">
				<div className="bg-gray-100 w-full mx-auto p-10 rounded-md">
					<h2 className="font-bold text-2xl mb-10 text-center">Create an account</h2>
					<RegisterForm />
				</div>
				
			</div>
			
		</>
	);
};

export default LoginPage;



