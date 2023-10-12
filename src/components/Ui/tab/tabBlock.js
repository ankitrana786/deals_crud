import React, { useState ,useEffect} from "react";
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TabBlock = ({dataArray}) => {
	// console.log(dataArray);
	const [tabIndex, setTabIndex] = useState(0);
	const [infoIndex,setInfoTabIndex] = useState(0);
	const getContevertedHTML = (htmlString)=>{
		console.log(htmlString);
		let replaceQuote = htmlString.replace(/&quot;&quot;|&quot;/g, "'");
		let ltreplaceTxt = replaceQuote.replace(/&lt;/g, "<");
		// console.log(ltreplaceTxt);
		let gtreplaceTxt = ltreplaceTxt.replace(/&gt;/g, ">");
		// console.log(gtreplaceTxt);
		return gtreplaceTxt;
	}
  return (
		<Tabs className="text-center customTabs" selectedIndex={infoIndex}>
			<TabList className="flex space-x-1 items-center list-none mx-0 px-0">
				{dataArray.map((tabItem:any, tabIndex:number)=>{
					return(
						<>
						{tabItem.tabcontent !== null && (
							<Tab key={"tabtitle_"+ tabIndex} className={`cursor-pointer px-2 lg:px-5 py-2 !border-b-0 ${infoIndex == tabIndex ? "outline-none !text-darkPurple  !border-b-0 !border !border-gray-500 !rounded-none bg-white -mb-[1px]":"!border-0 !text-gray-550"}`} onClick={() => setInfoTabIndex(tabIndex)}>{tabItem.tabtitle}</Tab>
						)}
						</>
				)})}
		    </TabList>
		    {dataArray.map((tabContentItem:any, tabCIndex:any)=>(
		    	<>
			    	{tabContentItem.tabcontent !== null && (
				    	<TabPanel className={`w-full h-auto align-top !text-black font-medium leading-5 text-sm pt-6 pl-2.5 pb-4 pr-16 border border-gray-500  ${infoIndex == tabCIndex ? "block":"hidden"}`}>
				    		<div className="text-left" dangerouslySetInnerHTML={{__html:getContevertedHTML(tabContentItem?.tabcontent)}}>
					      	</div>
				    	</TabPanel>
				    )}
		    	</>
		    ))}
		</Tabs>
 );
};

export default TabBlock;