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

export const RegisterParent = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/api/Auth/register-parent`, {
            method: "POST",
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
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

export const RegisterTutor = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/api/Auth/register-tutor`, {
            method: "POST",
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
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
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                throw new Error('Failed to refresh token');
            }
            return response.json();
        })
        .catch(err => {
            console.error(err);
            return;
        });
};

//ham test GetUser mot co api cua prj thi thay doi
export const GetUserByEmail = async (email) => {
    try {
        const url = `${baseUrl}/api/User/get-by-email?email=${email}`;
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
export const SendVerifyEmail = (email) => {
    const url = `${baseUrl}/api/Auth/send-verify-email`;
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    };

    return fetch(url, request)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed');
            }
            return response.json();
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

export const VerifyUser = (otp, email) => {
    const url = `${baseUrl}/api/Auth/verify-email`;
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpCode: otp, email: email })
    };

    return fetch(url, request)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed');
            }
            return response.json();
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

export const ForgotPasswordApi = async (email) => {
    try {
        const url = `${baseUrl}/api/Auth/forgot-password`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const GetUserByToken = (refreshToken) => {
    const url = `${baseUrl}/api/Auth/user-by-token?refreshToken=${refreshToken}`;
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return fetch(url, request)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed');
            }
            return response.json();
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};