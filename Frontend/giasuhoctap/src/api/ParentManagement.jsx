const baseUrl = import.meta.env.VITE_API_HOST;

export const UpdateUser = async (userId, value) => {
    try {
        const url = `${baseUrl}/api/User/update-user/${userId}`;
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
        console.error('Error updating user:', err);
        throw err; // Re-throw the error for handling at a higher level
    }
};