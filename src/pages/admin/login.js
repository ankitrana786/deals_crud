import React, {useEffect} from "react";
//import AdminLayout from "../../components/Layout/admin-layout";
import AdminAccountLayout from "../../components/layout/admin-account-layout";
import LoginForm from "../../components/auth/loginForm";
import { ROUTES } from "../../utils/routes";
import logo from '../../images/logo.png';


const LoginPage = () => {
	
	return (
		<>
			<div className="text-center py-5">
				<img src={logo} alt="Ceramic Arts" title="Ceramic Arts" className="w-32 mx-auto md:w-40 lg:w-72" border="0" />
			</div>
			<div className="px-10">
				<div className="bg-gray-100 max-w-[560px] mx-auto p-10 rounded-md">
					<h2 className="font-bold text-xl mb-10 text-center">Login with your Credentials</h2>
					<LoginForm variant="admin" />
				</div>
				
			</div>
			
		</>
	);
};

export default LoginPage;



