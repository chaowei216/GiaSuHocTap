// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;

export const GetAllReport = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Report/get-all-reports?PageNumber=${page}&PageSize=${pageSize}`;
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

export const AcceptOrDenyReport = async (reportId, value) => {
    try {
        const url = `${baseUrl}/api/Report/handle-report/${reportId}`;
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
}

export const GetAllReportByCondition = async (from, to, status, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Report/get-all-reports?FromEmail=${from}&ToEmail=${to}&Status=${status}&PageNumber=${page}&PageSize=${pageSize}`;
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