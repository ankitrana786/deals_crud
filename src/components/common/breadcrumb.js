import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { ROUTES } from "../../utils/routes"
// import useBreadcrumb, { convertBreadcrumbTitle } from "@utils/use-breadcrumb";

interface Props {
	children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
	return (
		<li
			className="text-sm text-body px-1 transition duration-200 ease-in first:ps-0 last:pe-0 hover:text-heading"
			{...props}
		>
			{children}
		</li>
	);
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
	return (
		<li className="text-base text-body mt-0.5" {...props}>
			{children}
		</li>
	);
};

export const BreadcrumbItems = (props: any) => {
	// console.log(props);

	
	let children: any = React.Children.toArray(props.children);

	children = children.map((child: string, index: number) => (
		<BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
	));

	const lastIndex = children.length - 1;

	children = children.reduce((acc: any, child: string, index: number) => {
		const notLast = index < lastIndex;
		if (notLast) {
			acc.push(
				child,
				<BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
					{props.separator}
				</BreadcrumbSeparator>
			);
		} else {
			acc.push(child);
		}
		return acc;
	}, []);

	return (
		<div className="chawkbazarBreadcrumb flex items-center">
			<ol className="flex flex-wrap items-center w-full overflow-hidden list-none mx-0 px-0">{children}</ol>
		</div>
	);
};

const Breadcrumb: React.FC<{ separator?: string }> = ({ breadcrumbs,separator = "/" }) => {
	return (
		<BreadcrumbItems separator={separator} >
			<Link
				to={ROUTES.HOME}
				className={0+1==breadcrumbs.length?"activeClass":"underline font-normal"}
				key={0}
			>
				<span className=" capitalize">
					Home
				</span>
			</Link>
			{breadcrumbs?.map((items: any,index:number) => {
				return(
				<Link
					to={ROUTES.COLLECTION+"/"+items.CODE}
					className={index+1==breadcrumbs.length?"activeClass":"underline font-normal"}
					key={index+1}
				>
					<span className=" capitalize">
						{items.PRD_DESC}
					</span>
				</Link>
			)})}
		</BreadcrumbItems>
	);
};

export default Breadcrumb;
