// import { useRouter } from "next/router";
import React from "react";

const colorFilterItems = [
	{
		id: "1",
		name: "Black",
		slug: "black",
		hexColor: "#000",
	},
	{
		id: "2",
		name: "Blue",
		slug: "blue",
		hexColor: "#3310ce",
	},
	{
		id: "3",
		name: "Olive",
		slug: "olive",
		hexColor: "#0c7448",
	},
	{
		id: "4",
		name: "Maroon",
		slug: "maroon",
		hexColor: "#5f0e0e",
	},
	{
		id: "5",
		name: "Brown",
		slug: "brown",
		hexColor: "#362727",
	},
	{
		id: "6",
		name: "White",
		slug: "white",
		hexColor: "#fff",
	},
	{
		id: "7",
		name: "Gray",
		slug: "gray",
		hexColor: "#e1e1e1",
	},
];
export const ColorFilter = () => {
	// const { t } = useTranslation("common");
	// const router = useRouter();
	// const { pathname, query } = router;
	// const selectedColors = query?.color ? (query.color as string).split(",") : [];
	// const [formState, setFormState] = React.useState<string[]>(selectedColors);
	// React.useEffect(() => {
	// 	setFormState(selectedColors);
	// }, [query?.color]);
	function handleItemClick(e) {

	}
	// function handleItemClick(e) {
	// 	const { value } = e.currentTarget;
	// 	let currentFormState = formState.includes(value)
	// 		? formState.filter((i) => i !== value)
	// 		: [...formState, value];
	// 	// setFormState(currentFormState);
	// 	const { color, ...restQuery } = query;
	// 	router.push(
	// 		{
	// 			pathname,
	// 			query: {
	// 				...restQuery,
	// 				...(!!currentFormState.length
	// 					? { color: currentFormState.join(",") }
	// 					: {}),
	// 			},
	// 		},
	// 		undefined,
	// 		{ scroll: false }
	// 	);
	// }
	const items = colorFilterItems;

	return (
		<div>
			<h3 className="text-heading text-sm md:text-lg uppercase font-semibold text-black mb-5">
				Color
			</h3>
			<div className="flex flex-col">
				<ul className="text-base leading-8">
				{items?.map((item) => (
					<li onClick={handleItemClick}>{item.slug}</li>
				))}
				</ul>
			</div>
		</div>
	);
};
