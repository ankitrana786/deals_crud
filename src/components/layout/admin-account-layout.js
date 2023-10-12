import AdminNav from "./admin-nav";

const AdminAccountLayout=({children}) =>{
	return (
		<>
			<div className="px-0 flex  md:flex-row w-full">
				<div className="flex flex-col md:flex-row w-full">
					<AdminNav />
					<div className="md:w-full mt-4 md:mt-0 px-10 py-10 bg-gray-50">{children}</div>
				</div>
			</div>
		</>
	);
};

export default AdminAccountLayout;
