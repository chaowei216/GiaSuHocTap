const baseUrl = import.meta.env.VITE_API_HOST;

export const GetNotificationTypeSystem = async (page, pageSize) => {
    try {
        const url = `${baseUrl}/api/Notification/get-system-notifications?PageNumber=${page}&PageSize=${pageSize}`;
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

export const CreateNotification = async (value) => {
    try {
        const url = `${baseUrl}/api/Notification/create-system-notification`;
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
};

export const UpdateNotification = async (nontificationId, value) => {
    try {
        const url = `${baseUrl}/api/Notification/update-notification/${nontificationId}`;
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

export const DeleteNotification = async (nontificationId) => {
    try {
        const url = `${baseUrl}/api/Notification/${nontificationId}`;
        const request = {
            method: "DELETE",
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
};