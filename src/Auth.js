const BASE_URL = 'https://localhost:7230';
const API_URI = `/api/User`;
export const GET_ALL = `${BASE_URL}${API_URI}/GetAllUserData`;
export const GETA_USER = `${BASE_URL}${API_URI}/GetaUserData`;
export const GETAUTH = `${BASE_URL}${API_URI}/GetUserWithPassword`;
export const POST_USER = `${BASE_URL}${API_URI}/AddUserData`;
export const PUT_USER = `${BASE_URL}${API_URI}/UpdateUserData`;
export const DELETE_USER = `${BASE_URL}${API_URI}/DeleteUserData`;