const baseUrl = import.meta.env.VITE_API_HOST;

export const GetUserNotification = async (userId) => {
    try {
        const url = `${baseUrl}/api/Notification/get-user-notification/${userId}`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        };
        const response = await fetch(url, request);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Failed to fetch notifications:', err);
        throw err;
    }
}

export const UpdateNotificationStatus = async (notificationId) => {
    try {
      const url = `${baseUrl}/api/Notification/get-user-notification/${notificationId}`;
      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ status: true }) // Assuming you update the status here
      };
      const response = await fetch(url, request);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Failed to update notification status for ID ${notificationId}:`, err);
      throw err;
    }
  };