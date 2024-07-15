const baseUrl = import.meta.env.VITE_API_HOST;

export const GetStatisticSystem = async () => {
    try {
        const url = `${baseUrl}/api/Statistic/statistic-system`;
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
        return data;
    } catch (err) {
        console.error("Fetch error:", err);
        return { error: err.message };
    }
}
