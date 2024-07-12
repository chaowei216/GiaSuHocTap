const baseUrl = import.meta.env.VITE_API_HOST;

export const GetAllTopTutor = async () => {
    try {
        const url = `${baseUrl}/api/User/get-top-tutor`;
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
        console.log(err);
        return { error: err.message };
    }
}
