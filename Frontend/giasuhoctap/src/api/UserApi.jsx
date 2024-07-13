const baseUrl = import.meta.env.VITE_API_HOST;

export const CreateModerator = async (value) => {
    try {
        const url = `${baseUrl}/api/User/add-new-moderator`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(value)
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.error('Failed');
        throw err;
    }
}