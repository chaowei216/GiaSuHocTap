const baseUrl = import.meta.env.VITE_API_HOST;

export const GetRequestOfflineApi = async (tutorId, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Request/get-tutor-offline-requests/${tutorId}?PageNumber=${page}&PageSize=${pageSize}`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const AcceptOrDenyRequestOFfline = async (value) => {
    try {
        const url = `${baseUrl}/api/Request/update-offline-request`;
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value)
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
}