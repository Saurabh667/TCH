
import api from "./api";

const BASE = "/events/";

// ---------------- EVENT CRUD ----------------

export const getEvents = (params = {}) =>
  api.get(BASE, { params });

export const getEventById = (eventId) =>
  api.get(`${BASE}${eventId}/`);

export const createEvent = (data) =>
  api.post(BASE, data);

export const updateEvent = (eventId, data) =>
  api.put(`${BASE}${eventId}/`, data);

export const patchEvent = (eventId, data) =>
  api.patch(`${BASE}${eventId}/`, data);

export const deleteEvent = (eventId) =>
  api.delete(`${BASE}${eventId}/`);

export const uploadEventBanner = (eventId, formData) =>
  api.patch(`${BASE}${eventId}/banner/`, formData);


// ---------------- REGISTRATION ----------------

export const getMyRegistrations = (params = {}) =>
  api.get(`${BASE}my-registrations/`, { params });

export const registerForEvent = (eventId) =>
  api.post(`${BASE}${eventId}/register/`);

export const cancelRegistration = (eventId) =>
  api.post(`${BASE}${eventId}/cancel-registration/`);

export const getParticipants = (eventId, params = {}) =>
  api.get(`${BASE}${eventId}/participants/`, { params });

export const updateRegistrationStatus = (
  registrationId,
  data
) =>
  api.patch(
    `${BASE}registrations/${registrationId}/status/`,
    data
  );


// ---------------- ORGANIZERS ----------------

export const getOrganizers = (eventId) =>
  api.get(`${BASE}${eventId}/organizers/`);

export const addOrganizer = (eventId, data) =>
  api.post(`${BASE}${eventId}/organizers/`, data);

export const updateOrganizer = (organizerId, data) =>
  api.patch(
    `${BASE}organizers/${organizerId}/`,
    data
  );

export const removeOrganizer = (organizerId) =>
  api.delete(`${BASE}organizers/${organizerId}/`);


// ---------------- ATTENDANCE ----------------

export const getMyAttendance = (params = {}) =>
  api.get(`${BASE}my-attendance/`, { params });

export const getEventAttendance = (eventId, params = {}) =>
  api.get(`${BASE}${eventId}/attendance/`, { params });

export const updateAttendance = (
  registrationId,
  data
) =>
  api.patch(
    `${BASE}attendance/${registrationId}/`,
    data
  );

export const bulkUpdateAttendance = (eventId, data) =>
  api.post(
    `${BASE}${eventId}/attendance/bulk/`,
    data
  );


// ---------------- MEDIA & GALLERY ----------------

export const getEventGallery = (eventId) =>
  api.get(`${BASE}${eventId}/gallery/`);

export const uploadGalleryImage = (eventId, formData) =>
  api.post(`${BASE}${eventId}/gallery/`, formData);

export const updateGalleryImage = (imageId, data) =>
  api.patch(`${BASE}gallery/${imageId}/`, data);

export const deleteGalleryImage = (imageId) =>
  api.delete(`${BASE}gallery/${imageId}/`);


// ---------------- ANALYTICS ----------------

export const getEventAnalytics = () =>
  api.get(`${BASE}analytics/`);

export const getSingleEventAnalytics = (eventId) =>
  api.get(`${BASE}${eventId}/analytics/`);


// ---------------- CSV EXPORT ----------------

export const exportAllEventAnalytics = () =>
  api.get(`${BASE}analytics/export/`, {
    responseType: "blob",
  });

export const exportSingleEventAnalytics = (eventId) =>
  api.get(`${BASE}${eventId}/analytics/export/`, {
    responseType: "blob",
  });
