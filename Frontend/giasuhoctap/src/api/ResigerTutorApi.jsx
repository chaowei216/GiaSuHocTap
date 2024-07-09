export const GetAllClass = async () => {
    try {
        const url = 'https://localhost:7019/api/Class/get-all-classes';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        });

        // Kiểm tra mã trạng thái HTTP
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Chuyển đổi phản hồi thành JSON
        const data = await response.json();

        // Trả về dữ liệu
        return data;
    } catch (err) {
        // Ghi lỗi ra console và có thể trả về lỗi hoặc thông báo lỗi
        console.log(err);
        return { error: err.message };
    }
};

export const GetAllCourse = async () => {
    try {
        const url = 'https://localhost:7019/api/Course/get-all-courses';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
        return { error: err.message };
    }
};


// //api test
// export const GetAllClass = async () => {
//     try {
//         const url = 'https://universityadmission.onrender.com/api/v1/major';
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         // Kiểm tra mã trạng thái HTTP
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         // Chuyển đổi phản hồi thành JSON
//         const data = await response.json();

//         // Trả về dữ liệu
//         return data;
//     } catch (err) {
//         // Ghi lỗi ra console và có thể trả về lỗi hoặc thông báo lỗi
//         console.log(err);
//         return { error: err.message };
//     }
// };