// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;

//ham test login mot co api cua prj thi thay doi
export const SignIn = async (value) => {
    try {
        const url = `${baseUrl}/api/Auth/login`;
        const request = {
            method: "POST",
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
};

export const RefreshToken = (accessToken, refreshToken) => {
    const url = `${baseUrl}/api/Auth/refresh-token`;
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken, refreshToken }) 
    };
    
    return fetch(url, request)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }
            return response;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

//ham test GetUser mot co api cua prj thi thay doi
export const GetUserByAccessToken = async (accessToken) => {
    try {
        const url = `${baseUrl}/api/Auth/GetUserByToken?accessToken=${accessToken}`;
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