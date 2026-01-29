// API Configuration for Backend Connection

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper with auth
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    
  signup: (data: { name: string; email: string; password: string; role: string }) =>
    fetchWithAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  getMe: () => fetchWithAuth('/auth/me'),
};

// Users API
export const usersAPI = {
  getAll: () => fetchWithAuth('/users'),
  getById: (id: string) => fetchWithAuth(`/users/${id}`),
  update: (id: string, data: any) =>
    fetchWithAuth(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth(`/users/${id}`, { method: 'DELETE' }),
};

// Courses API
export const coursesAPI = {
  getAll: () => fetchWithAuth('/courses'),
  getById: (id: string) => fetchWithAuth(`/courses/${id}`),
  create: (data: any) =>
    fetchWithAuth('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth(`/courses/${id}`, { method: 'DELETE' }),
};

// Batches API
export const batchesAPI = {
  getAll: () => fetchWithAuth('/batches'),
  getById: (id: string) => fetchWithAuth(`/batches/${id}`),
  create: (data: any) =>
    fetchWithAuth('/batches', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchWithAuth(`/batches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchWithAuth(`/batches/${id}`, { method: 'DELETE' }),
};

// Attendance API
export const attendanceAPI = {
  getByBatch: (batchId: string) => fetchWithAuth(`/attendance/batch/${batchId}`),
  mark: (data: any) =>
    fetchWithAuth('/attendance', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Assignments API
export const assignmentsAPI = {
  getAll: () => fetchWithAuth('/assignments'),
  getById: (id: string) => fetchWithAuth(`/assignments/${id}`),
  create: (data: any) =>
    fetchWithAuth('/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  submit: (id: string, data: any) =>
    fetchWithAuth(`/assignments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Payments API
export const paymentsAPI = {
  getAll: () => fetchWithAuth('/payments'),
  create: (data: any) =>
    fetchWithAuth('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default {
  auth: authAPI,
  users: usersAPI,
  courses: coursesAPI,
  batches: batchesAPI,
  attendance: attendanceAPI,
  assignments: assignmentsAPI,
  payments: paymentsAPI,
};
