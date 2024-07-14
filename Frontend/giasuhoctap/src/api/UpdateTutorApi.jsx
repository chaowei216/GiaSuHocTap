const baseUrl = import.meta.env.VITE_API_HOST;

export const UpdateTutor = async (value) => {
    try {
        const url = `${baseUrl}/api/User/update-tutor-detail`;
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(value)
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};
