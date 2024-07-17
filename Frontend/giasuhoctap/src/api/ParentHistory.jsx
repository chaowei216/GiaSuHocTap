const baseUrl = import.meta.env.VITE_API_HOST;

export const GetParentRequest = async (userId, requestType, status, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Request/get-user-request/${userId}?RequestType=${requestType}&Status=${status}&PageNumber=${page}&PageSize=${pageSize}`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const HireTutorMore = async (value) => {
    try {
        const url = `${baseUrl}/api/Request/extend-more-request`;
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
        console.log(err);
    }
}

export const FeedbackTutor = async (value) => {
    try {
        const url = `${baseUrl}/api/Feedback/create-feedback`;
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
        console.log(err);
    }
}

export const ReportTutor = async (value) => {
    try {
        const url = `${baseUrl}/api/Report/create-new-report`;
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
        console.log(err);
    }
}