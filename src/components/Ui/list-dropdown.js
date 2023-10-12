import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector, HiCheck } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useSearchParams, createSearchParams, useLocation} from "react-router-dom";

// let dept = 0;
let dataArray =[];
export default function ListDropdown({ options, dept, sendDataToParent, selectedData }) {
	// console.log(dept);
	// console.log(selectedData);
	// console.log(options);
	const params = useParams();
	let [searchParams, setSearchParams] = useSearchParams();
	const [selectedItem, setSelectedItem] = useState(null);
	
	// console.log(selectedItem);
	useEffect(()=>{
		if(params.id != undefined && selectedData[dept] != undefined){
			const findObject = options.filter(x=>x.CODE == selectedData[dept].CODE);
			// console.log(findObject);
			if(dataArray.length > 0 && dataArray[dept] != undefined){
				// console.log(dataArray);
				dataArray = dataArray.slice(0, dept);
				dataArray[dept] = {CODE:findObject[0].CODE, PRD_DESC:findObject[0].PRD_DESC}
			}else{
				dataArray.push({CODE:findObject[0].CODE, PRD_DESC:findObject[0].PRD_DESC});
			}
			sendDataToParent(dataArray);
			setSelectedItem(findObject[0]);
			
			
		}
		// const findExisting = options.filter((x)=>x.CODE == selectedItem);
		// console.log(findExisting);
		// if(findExisting.length < 1 && dept == 0){
		// 	setSelectedItem(null);
		// }
	},[])
	function handleItemClick(values) {	
		// console.log(values);

		if(dataArray.length > 0 && dataArray[dept] != undefined){
			// console.log(dataArray);
			dataArray = dataArray.slice(0, dept);
			dataArray[dept] = {CODE:values.CODE, PRD_DESC:values.PRD_DESC}
		}else{
			dataArray.push({CODE:values.CODE, PRD_DESC:values.PRD_DESC});
		}
		// console.log(dataArray);
		setSelectedItem(values);
		// const sortname= {sort_price:values.value};
		// setSelectedItem(values);
		// setSearchParams(createSearchParams(sortname));
		sendDataToParent(dataArray);
	}
	return (
		<>
		<Listbox value={selectedItem} onChange={handleItemClick}>
			{({ open }) => (
			<div className="relative ms-2 lg:ms-0 z-10 w-[180px] mr-2">
						<Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer">
							<span className="block truncate pl-2">{(selectedItem == null) ? "Choose Sub Category" : selectedItem.PRD_DESC}</span>
							<span className="absolute inset-y-0 right-0 flex items-center pe-2 pointer-events-none">
								<HiOutlineSelector
									className="w-5 h-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>
						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options
								static
								className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 min-w-[170px] ring-1 ring-black ring-opacity-5 focus:outline-none text-sm list-none p-0"
							>
								{options?.map((option, personIdx) => {
									return (<Listbox.Option
										key={personIdx}
										className={({ active }) =>
											`${active ? "text-amber-900 bg-gray-100" : "text-gray-900"}
	                          				cursor-default select-none relative py-2 ps-10 pe-4`
										}
										value={option}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`${
														selected ? "font-medium" : "font-normal"
													} block truncate pl-7`}
												>
													{option.PRD_DESC}
												</span>
												{selected ? (
													<span
														className={`${active ? "text-amber-600" : ""}
	                                					check-icon absolute inset-y-0 end-0 flex items-center ps-3`}
													>
														<HiCheck className="w-5 h-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>)
								})}
							</Listbox.Options>
						</Transition>
			</div>
			)}
		</Listbox>
		{ selectedItem?.subMenu && selectedItem?.subMenu[0].length > 0 && (
			<>
				<ListDropdown options={selectedItem?.subMenu[0]} dept={dept+1} sendDataToParent={sendDataToParent} selectedData={(params.id != undefined) && selectedData}  />
			</>
        )}
       	</>
	);
}
