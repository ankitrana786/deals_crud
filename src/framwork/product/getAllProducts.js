import axios from "axios";
import { QueryOptionsType, Product } from "@framework/types";
// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
// import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
import { getHash } from "@framework/utils/get-hash";
import { format, parseISO  } from 'date-fns';

const fetchProducts = async ({ queryKey }: any) => {
	//console.log(queryKey);
	const [_key, _params] = queryKey;
	const timeVals = Math.round(new Date().getTime()/1000);
    const URI = process.env.NEXT_PUBLIC_API_ENDPOINT+"admin/getschedules";
    let stDate;
	let endDate;
    const selectedDate = _params?.drange
		? (_params?.drange as any).split("-")
		: [];
	if(selectedDate.length > 0){
		const sval = new Date(selectedDate[0]);
		const enVal = new Date(selectedDate[1]);
		if(sval != undefined){
			stDate = format(sval, 'MMMM d, yyyy');
		}
		if(selectedDate.length > 1){
			endDate = format(enVal, 'MMMM d, yyyy');
			
		}
	}
    // console.log(body);
    const requestOptions = {
        method: 'POST',
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	    withCredentials: false,
        main_group: process.env.NEXT_PUBLIC_MAIN_GROUP,
        timeExp: '10',
        time:  timeVals,
        hash: getHash,
        pf_id:(_params.portfolio != undefined) ? _params.portfolio : '0',
        categ_id:(_params.category != undefined) ? _params.category : '0',
        prrange:(_params.price != undefined) ? _params.price : "0-0",
        date_min:(stDate != undefined) ? stDate : "0",
        date_max:(endDate != undefined) ? endDate : "0",
        price_order:(_params.sort_by != undefined && _params.sort_by == "low-high") ? "1" : "-1",
        name_order:(_params.sort_by_name != undefined && _params.sort_by_name == "ascending") ? "1" : "-1",
        weekend:(_params.w === "weekend") ? "1" : (_params.w === "weekday") ? '0' : "-1",
        month:(_params.month != undefined) ? _params.month : "0",
        timezone:(_params.tz != undefined) ? _params.tz : "0"
    };
    const data = await axios.post(URI,requestOptions);
    //console.log(data);
	// const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
	return {
		data: data.data,
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>(
		["", options],
		fetchProducts,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	);
};

export { useProductsQuery, fetchProducts };
