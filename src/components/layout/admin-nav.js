
import {
	IoListSharp,
	IoHomeOutline,
	IoCartOutline,
	IoPersonOutline,
	IoSettingsOutline,
	IoLogOutOutline,
} from "react-icons/io5";
import Logo from '../Ui/Logo';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { ROUTES } from "../../utils/routes";
import { useLocation } from "react-router-dom";

const tokenString = sessionStorage.getItem('token');
const userToken = JSON.parse(tokenString);
const accountMenu = [
	{
		slug: ROUTES.ADS_LIST,
		name: "Ads List",
		icon: <IoHomeOutline className="w-5 h-5" />,
	},
	{
		slug: ROUTES.CONTACTUS_FORM,
		name: "Contact Us",
		icon: <IoHomeOutline className="w-5 h-5" />,
	},

];


export default function AccountNav() {

	const location = window.location.href;
	// const { pathname } = location;
	const splitLocation = location.split("/").pop();
	const logout = ()=>{
		 window.location.href = ROUTES.LOGIN;
	}
	return (
		<nav className="md:min-h-screen w-full py-5 bg-gray-500 px-4 flex flex-col md:w-1/4  md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
			<Logo/>
			<div className="border-t border-gray-400 py-4 h-full">
				{accountMenu.map((item, index) => {
					return (
						
							<a
								className={`font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 ${item.slug.indexOf(splitLocation) > -1 && "bg-gray-300"}`}
								href={item.slug}
								key={index}
							>
								
								<span className="ps-2">{item.name}</span>
							</a>
					);
				})}
				
				<a
					className={`font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2`} href="#" onClick={logout}
				>
					
					<span className="ps-2">Logout</span>
				</a>
			</div>
		</nav>
	);
}
