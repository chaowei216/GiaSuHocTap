const baseUrl = import.meta.env.VITE_API_HOST;

export const GetTimeTableByEmail = async (email, page, pageSize) => {
    try {
        const url = `${baseUrl}/api/TimeTable/get-timetable-by-email/${email}?PageNumber=${page}&PageSize=${pageSize}`;
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
        return response;
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}

export const GetAllTimeTableByEmail = async (email) => {
    try {
        const url = `${baseUrl}/api/TimeTable/get-timetable-by-email/${email}`;
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
        return response;
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
}

export const UpdateTimetable = async (timetableId, value) => {
    try {
        const url = `${baseUrl}/api/TimeTable/update-timetable/${timetableId}`;
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

export const DeActiveTimeTable = async (timetableId) => {
    try {
        const url = `${baseUrl}/api/TimeTable/delete-timetable/${timetableId}`;
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

export const ActiveTimeTable = async (timetableId) => {
    try {
        const url = `${baseUrl}/api/TimeTable/enable-timetable/${timetableId}`;
        const request = {
            method: "PUT",
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
