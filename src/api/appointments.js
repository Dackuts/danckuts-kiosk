import api from "./index";

const BASE_URL = "/appointments";

export function getAppointments() {
  return api.get(`${BASE_URL}/recent`);
}

export function postCancelAppointment(appointmentId) {
  return api.post(`${BASE_URL}/cancel`, { appointmentId });
}

export function postCreateAppointment({ location, time }) {
  return api.post(`${BASE_URL}/schedule`, {
    location,
    time,
    autoCheckIn: true,
  });
}

export function postRescheduleAppointment({ appointmentId, location, time }) {
  return api.post(`${BASE_URL}/reschedule`, { appointmentId, location, time });
}

export function postCheckIn(appointmentId) {
  return api.post(`${BASE_URL}/check-in`, { appointmentId });
}
