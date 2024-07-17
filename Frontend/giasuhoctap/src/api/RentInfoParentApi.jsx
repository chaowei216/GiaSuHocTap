const baseUrl = import.meta.env.VITE_API_HOST;

export const GetRentInfoParent = async (userId) => {
    try {
        const url = `${baseUrl}/api/User/rent-info-parents/${userId}`;
        console.log('Fetching URL:', url); // Log URL để kiểm tra
        const request = {
            method: "GET", // Đảm bảo phương thức GET
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        };
        const response = await fetch(url, request);
        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Error details:', errorDetails);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Failed to fetch rent info for parent:', err);
        throw err;
    }
};