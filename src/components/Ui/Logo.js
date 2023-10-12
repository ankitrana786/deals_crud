import React from 'react';
import logo from '../../images/logo.png';
import { ROUTES } from "../../utils/routes";

const Logo =() =>{
	
	return (
		<a href={ROUTES.HOME}><img src={logo} alt="Ceramic Arts" title="Ceramic Arts" className="w-32 md:w-40 lg:w-72" border="0" /></a>
	);
};

export default Logo;