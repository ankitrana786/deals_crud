import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineSelector, HiCheck } from "react-icons/hi";
import { useSearchParams, createSearchParams} from "react-router-dom";

export default function ListBox({ options }) {
	let [searchParams, setSearchParams] = useSearchParams();
	// searchParams.get("sort_by_name");
	let name = searchParams.get("sort_by_name");
	// console.log(name);
	const currentSelectedItem = (name != null) ? options.find((o) => o.value === name)
		: options[0];
	const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

	useEffect(() => {
		// console.log(selectedItem);
		setSelectedItem(selectedItem);
	}, []);
	function handleItemClick(values) {	
		// console.log(values);
		if(values.value == ''){
			// console.log("jhakkass");
			const param = searchParams.get('sort_by_name');
			// console.log(param);
			if (param) {
				param.delete('sort_by_name');
				setSearchParams(searchParams);
			}
		}
		const sortname= {sort_by_name:values.value};
		setSelectedItem(values);
		setSearchParams(sortname);
		// const { sort_by_name, ...restQuery } = query;
		// router.push(
		// 	{
		// 		pathname,
		// 		query: {
		// 			...restQuery,
		// 			...(values.value !== options[0].value
		// 				? { sort_by_name: values.value }
		// 				: {}),
		// 		},
		// 	},
		// 	undefined,
		// 	{ scroll: false }
		// );
	}

	return (
		<Listbox value={selectedItem} onChange={handleItemClick}>
			{({ open }) => (
				<div className="relative ms-2 lg:ms-0 z-10 w-[140px]">
					<Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer">
						<span className="block truncate pl-2">{selectedItem.name}</span>
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
							className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 min-w-[170px] ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
						>
							{options?.map((option, personIdx) => (
								<Listbox.Option
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
												{option.name}
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
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
}
