import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_HOST;

export const GetNewsPaging = async (page, pageSize) => {
  try {
    const url = `${baseUrl}/api/News/get-news-paging?PageNumber=${page}&PageSize=${pageSize}`;
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

export const GetNewsById = async (newsId) => {
  try {
    const url = `${baseUrl}/api/News/get-news-paging`; // Đổi endpoint để lấy danh sách tin tức
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      },
    };
    const response = await fetch(url, request);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    const responseData = await response.json();
    // Tìm tin tức với newsId từ danh sách tin tức đã tải về
    const foundNews = responseData.data.data.find(item => item.newsId === parseInt(newsId));
    if (!foundNews) {
      throw new Error('News not found');
    }
    return foundNews;
  } catch (error) {
    console.error('Error fetching news detail:', error);
    toast.error('Failed to fetch news detail');
    throw error; // Rethrow để xử lý lỗi ở phía component
  }
};

export const CreateNewByModerator = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/api/News/create-news`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: formData,
    });
    if (!response.ok) {
      console.error('There was a problem with API')
    }
    return response;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
