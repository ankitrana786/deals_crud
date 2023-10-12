import React, {useEffect,useState} from "react";
//import AdminLayout from "../../components/Layout/admin-layout";
import PageHeader from "../components/Ui/page-header";
import { ROUTES } from "../utils/routes";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/Ui/loaders/loadingSpinner";
const apiUrl = "https://dev.ceramicarts.com/";

const Pages = () => {
	const params = useParams();
	//console.log('myurl',params.slug);
	const [aboutusArr,setAboutUsArr] = useState(null);
	const [isLoading, setLoading] = React.useState(false)
	React.useEffect(() => {
		
		listArray();
		
        
	}, [])
	const listArray = async () =>{
      setLoading(true);
        const formData = new FormData();
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	        withCredentials: false,
	        action: "GETPAGEDETAILS",
	        slug:params.slug,
    	};
		const res  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
		//console.log(res);
		if(res.data){
			setAboutUsArr(res.data);
         	setLoading(false);
		}else{
			setAboutUsArr(null);
            setLoading(false);
		}
	}
	//console.log('frufoh',aboutusArr);
	return (
		<>
			<div className="">
				{isLoading && (<LoadingSpinner />)}
				<PageHeader JsonData={aboutusArr!=null && aboutusArr}/>
				<div className="px-4 md:px-10 lg:px-20 py-10">
					{aboutusArr!=null &&(
						<div
					      dangerouslySetInnerHTML={{__html: aboutusArr.description}}
					    />
					)}
					
				</div>
			</div>
			
		</>
	);
};

export default Pages;



