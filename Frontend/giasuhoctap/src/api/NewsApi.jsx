const baseUrl = import.meta.env.VITE_API_HOST;

export const GetNewsPaging = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/News/get-news-paging?PageNumber=${page}&PageSize=${pageSize}`;
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