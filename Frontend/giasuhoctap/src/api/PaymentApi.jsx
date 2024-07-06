// Base Url for API
const baseUrl = import.meta.env.VITE_API_HOST;
export const PaymentVnPay = async (value) => {
    try {
        const response = await fetch(`${baseUrl}/api/Payment/create-request-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
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

export const ResponsePayment = async (value) => {
    try {
        const response = await fetch(`${baseUrl}/api/Payment/handle-response-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
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