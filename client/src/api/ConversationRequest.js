/* eslint-disable object-curly-spacing */
import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const userConversation = (id) => API.get(`/conversation/${id}`)

export const findSpecifiqueConversation = (firstId, secindId) => API.get(`/conversation/find/${firstId}/${secindId}`)

export const createConversation = (data) => API.post('/conversation/', data)
