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

export const GetRequestOnlineApi = async (tutorId, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Request/get-all-tutor-online-requests/${tutorId}?PageNumber=${page}&PageSize=${pageSize}`;
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

export const AcceptOrDenyRequestOnline = async (value) => {
    try {
        const url = `${baseUrl}/api/Request/update-online-request`;
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

export const GetPendingOnlineApi = async (tutorId, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Request/get-pending-tutor-requests/${tutorId}?PageNumber=${page}&PageSize=${pageSize}`;
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

export const GetRequestById = async (tutorId, type, status, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Request/get-user-request/${tutorId}?RequestType=${type}&Status=${status}&PageNumber=${page}&PageSize=${pageSize}`;
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

export const CompleteTeaching = async (value) => {
    try {
        const url = `${baseUrl}/api/Request/update-done-online-request`;
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