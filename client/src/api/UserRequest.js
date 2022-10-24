import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getaUser = (userId) => API.get(`/user/${userId}`);

export const getAllUsers = () => API.get("/user/");

export const getaAllUsers = (userId) => API.get(`/user/users/${userId}`);

export const addUser = (data) => API.post("/auth/register",data);
