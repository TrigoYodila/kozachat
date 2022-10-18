import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'})

export const userConversation = (id) => API.get(`/conversation/${id}`);