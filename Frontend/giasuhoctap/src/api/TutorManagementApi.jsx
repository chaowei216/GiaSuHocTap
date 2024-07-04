import { toast } from "react-toastify";

// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;

export const GetAllTutor = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/User?PageNumber=${page}&PageSize=${pageSize}`;
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

export const GetPendingTutor = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/User/get-pending-tutor?PageNumber=${page}&PageSize=${pageSize}`;
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

export const GetActiveTutor = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/User/get-active-users?PageNumber=${page}&PageSize=${pageSize}`;
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

export const GetAllPendingTutor = async () => {
    try {
        const url = `${baseUrl}/api/User/get-pending-tutor`;
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

export const AcceptTutor = async (email) => {
    try {
        const url = `${baseUrl}/api/Auth/accept-tutor`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ email: email })
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const RejectTutor = async (email, reason) => {
    try {
        const url = `${baseUrl}/api/Auth/reject-tutor`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ email: email, reason: reason })
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const GetTutorTeachOnline = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/User/get-tutor-teach-online?PageNumber=${page}&PageSize=${pageSize}`;
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

export const GetTutorTeachOffline = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/User/get-tutor-teach-offline?PageNumber=${page}&PageSize=${pageSize}`;
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

export const GetTutorByEmail = async (email) => {
    try {
        const url = `${baseUrl}/api/User/get-user-by-email?email=${email}`;
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