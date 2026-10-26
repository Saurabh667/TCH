const API_BASE_URL =
import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const getAccessToken = () =>
localStorage.getItem("access") || sessionStorage.getItem("access");

const makeRequest = async (endpoint, options = {}) => {
const token = getAccessToken();

if (!token) {
throw new Error("Please log in to access your profile.");
}

const isFormData = options.body instanceof FormData;

const response = await fetch(`${API_BASE_URL}${endpoint}`, {
...options,
headers: {
...(isFormData ? {} : { "Content-Type": "application/json" }),
Authorization: `Bearer ${token}`,
...options.headers,
},
});

const contentType = response.headers.get("content-type");

const data = contentType?.includes("application/json")
? await response.json()
: null;

if (!response.ok) {
console.error("Profile API error:", response.status, data);

if (response.status === 401) {
  throw new Error("Your session has expired. Please log in again.");
}

const message =
  data?.detail ||
  Object.values(data || {})
    .flat()
    .find((value) => typeof value === "string") ||
  `Request failed with status ${response.status}`;

throw new Error(message);

}

return data;
};

// ==========================================
// PROFILE APIs
// Uses GET and PATCH: /api/auth/me/
// ==========================================

export const getMyProfile = () => makeRequest("/auth/me/");

export const updateMyProfile = (profileData) => {
const isFormData = profileData instanceof FormData;

return makeRequest("/auth/me/", {
method: "PATCH",
body: isFormData ? profileData : JSON.stringify(profileData),
});
};

// ==========================================
// MEMBER APPLICATION APIs
// Assumed endpoints; verify against Django URLs.
// ==========================================

export const getMyApplication = () =>
makeRequest("/auth/application/");

export const createMyApplication = (applicationData) =>
makeRequest("/auth/application/", {
method: "POST",
body: JSON.stringify(applicationData),
});

export const updateMyApplication = (applicationData) =>
makeRequest("/auth/application/", {
method: "PATCH",
body: JSON.stringify(applicationData),
});
