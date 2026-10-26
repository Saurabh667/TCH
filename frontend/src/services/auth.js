import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (details) => {
  try {
    const response = await api.post("/auth/register/", {
      full_name: details.fullName.trim(),
      email: details.email.trim().toLowerCase(),
      department: details.department.trim(),
      year_of_study: details.yearOfStudy
        ? Number(details.yearOfStudy)
        : null,
      phone: details.phone.trim(),
      password: details.password,
      confirm_password: details.confirmPassword,
    });

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    const responseData = error.response?.data;

    let message =
      "Registration failed. Please check your information and try again.";

    if (responseData) {
      if (typeof responseData.detail === "string") {
        message = responseData.detail;
      } else if (typeof responseData === "object") {
        const firstError = Object.values(responseData).flat()[0];

        if (typeof firstError === "string") {
          message = firstError;
        }
      }
    } else if (error.request) {
      message =
        "Unable to connect to the server. Please ensure the Django backend is running.";
    }

    return {
      ok: false,
      message,
      errors: responseData || null,
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login/", {
      email: email.trim().toLowerCase(),
      password,
    });

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    const responseData = error.response?.data;

    let message = "Login failed. Please check your email and password.";

    if (responseData) {
      if (typeof responseData.detail === "string") {
        message = responseData.detail;
      } else {
        const firstError = Object.values(responseData).flat()[0];

        if (typeof firstError === "string") {
          message = firstError;
        }
      }
    } else if (error.request) {
      message = "Cannot connect to the server. Please ensure Django is running.";
    }

    return {
      ok: false,
      message,
      errors: responseData || null,
    };
  }
};

export default api;