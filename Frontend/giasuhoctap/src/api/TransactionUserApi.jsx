const baseUrl = import.meta.env.VITE_API_HOST;

export const GetAllTransaction = async (userId, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Transaction/get-trans-user/${userId}?PageNumber=${page}&PageSize=${pageSize}`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        };
        const response = await fetch(url, request);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}