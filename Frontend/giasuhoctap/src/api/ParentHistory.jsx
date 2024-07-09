const baseUrl = import.meta.env.VITE_API_HOST;

export const GetParentRequest = async (requestType, status, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Request/get-user-request/6?RequestType=${requestType}&Status=${status}&PageNumber=${page}&PageSize=${pageSize}`;
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