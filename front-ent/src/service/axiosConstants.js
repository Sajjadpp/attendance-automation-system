import axios from 'axios'


export const adminAxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/admin',
    withCredentials:"include"
})

export const staffAxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/staff',
    withCredentials:"include"
})

export const studentAxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/student',
    withCredentials:"include"
})