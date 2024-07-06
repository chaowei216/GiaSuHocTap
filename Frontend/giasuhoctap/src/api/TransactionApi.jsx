// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;

export const GetAllTransaction = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Transaction/get-all-transactions?PageNumber=${page}&PageSize=${pageSize}`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
}