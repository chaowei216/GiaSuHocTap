const baseUrl = import.meta.env.VITE_API_HOST;

export const GetStatisticGeneral = async () => {
    try {
        const url = `${baseUrl}/api/Statistic/general-data`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        };
        const response = await fetch(url, request);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Add this line to check the API response

        return data;
    } catch (err) {
        console.error("Fetch error:", err);
        return { error: err.message };
    }
}