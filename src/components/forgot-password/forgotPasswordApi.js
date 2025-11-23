// API endpoints constants
export const API_ENDPOINTS = {
    FORGOT_PASSWORD: "http://localhost:8080/uas/user/password/forgot-password",
    VERIFY_OTP: "http://localhost:8080/uas/user/password/verify-otp",
    RESET_PASSWORD: "http://localhost:8080/uas/user/password/reset-password"
};


export const apiCall = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        // Handle both JSON and text responses
        const contentType = response.headers.get("content-type");
        let fromBackEnd;

        if (contentType && contentType.includes("application/json")) {
            fromBackEnd = await response.json();
        } else {
            fromBackEnd = { message: await response.text() };
        }

        return {
            ok: response.ok,
            data: fromBackEnd,
        };

    } catch (error) {
        return {
            ok: false,
            error: "Server error. Please try again later."
        }
    }
};