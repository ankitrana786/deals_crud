import axios from "axios"

const apiPath = process.env.REACT_APP_LOCAL_FETCH_API
// console.log(apiPath)

async function getDeals(pageName){
    // console.log(userData)
    // console.log(mode)
    const url = apiPath;
    // console.log(apiPath)
    const body ={
        action: "FECTCHPAGEDEAL",
        pagename: pageName
    }
    const result = await axios.post(url, body);
    // console.log(result);
    return result.data
}
// const apiUtilities = {
//     getDeals
// }

export default getDeals;