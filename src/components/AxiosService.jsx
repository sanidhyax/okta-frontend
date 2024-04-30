import axios from "axios";


export const fetchSingleProduct = async (baseUrl, productId) => {
    const finalUrl = baseUrl + `/${productId}`
    try {
        const response = await axios.get(finalUrl);
        return response.data
    } catch (error) {
        console.log("Request failed to get single product. Status code: {}", error.response.status)
        return 0
    }
}