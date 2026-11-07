import api from "./api";

const BASE = "/events/";

// EVENT CRUD
export const getEvents = (params = {}) =>
  api.get(BASE, { params });

export const getEventById = (id) =>
  api.get(`${BASE}${id}/`);

export const createEvent = (data) =>
  api.post(BASE, data);

export const updateEvent = (id, data) =>
  api.put(`${BASE}${id}/`, data);

export const patchEvent = (id, data) =>
  api.patch(`${BASE}${id}/`, data);

export const deleteEvent = (id) =>
  api.delete(`${BASE}${id}/`);

export const uploadEventBanner = (id, formData) =>
  api.patch(`${BASE}${id}/banner/`, formData);


// REGISTRATION
export const getMyRegistrations = (params = {}) =>
  api.get(`${BASE}my-registrations/`, { params });

export const registerForEvent = (id) =>
  api.post(`${BASE}${id}/register/`);

export const cancelRegistration = (id) =>
  api.post(`${BASE}${id}/cancel-registration/`);

export const getParticipants = (id, params = {}) =>
  api.get(`${BASE}${id}/participants/`, { params });

export const updateRegistrationStatus = (id, data) =>
  api.patch(`${BASE}registrations/${id}/status/`, data);


// ORGANIZERS
export const getOrganizers = (id) =>
  api.get(`${BASE}${id}/organizers/`);

export const addOrganizer = (id, data) =>
  api.post(`${BASE}${id}/organizers/`, data);

export const updateOrganizer = (id, data) =>
  api.patch(`${BASE}organizers/${id}/`, data);

export const removeOrganizer = (id) =>
  api.delete(`${BASE}organizers/${id}/`);


// ATTENDANCE
export const getMyAttendance = (params = {}) =>
  api.get(`${BASE}my-attendance/`, { params });

export const getEventAttendance = (id, params = {}) =>
  api.get(`${BASE}${id}/attendance/`, { params });

export const updateAttendance = (id, data) =>
  api.patch(`${BASE}attendance/${id}/`, data);

export const bulkUpdateAttendance = (id, data) =>
  api.post(`${BASE}${id}/attendance/bulk/`, data);


// GALLERY
export const getEventGallery = (id) =>
  api.get(`${BASE}${id}/gallery/`);

export const uploadGalleryImage = (id, formData) =>
  api.post(`${BASE}${id}/gallery/`, formData);

export const updateGalleryImage = (id, data) =>
  api.patch(`${BASE}gallery/${id}/`, data);

export const deleteGalleryImage = (id) =>
  api.delete(`${BASE}gallery/${id}/`);


// ANALYTICS
export const getEventAnalytics = () =>
  api.get(`${BASE}analytics/`);

export const getSingleEventAnalytics = (id) =>
  api.get(`${BASE}${id}/analytics/`);


// CSV EXPORT
export const exportAllEventAnalytics = () =>
  api.get(`${BASE}analytics/export/`, {
    responseType: "blob",
  });

export const exportSingleEventAnalytics = (id) =>
  api.get(`${BASE}${id}/analytics/export/`, {
    responseType: "blob",
  });
