import axios from 'axios';

// const PORT = 3030;
const baseURL = `https://chat-app-apii.herokuapp.com`;

export const signUp = (body) => {
    return axios.post(`${baseURL}/user/sign-up`, body)
}

export const login = (body) => {
    return axios.post(`${baseURL}/user/login`, body)
}

export const getFriends = (body) => {
    return axios.post(`${baseURL}/user/friends`, body)
}

export const getRoomList = (body) => {
    return axios.post(`${baseURL}/user/room-list`, body)
}

export const getMessageList = (body) => {
    return axios.post(`${baseURL}/user/message-list`, body)
}

export const changeUserName = (body) => {
    return axios.post(`${baseURL}/user/change-name`, body)
}

export const uploadFile = (body) => {
    return axios.post(`${baseURL}/user/upload`, body)
}

export const addFriends = (body) => {
    return axios.post(`${baseURL}/user/add-friend`, body)
}