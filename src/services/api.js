import axios from "axios";

const urluser='http://localhost:3001';
let token = localStorage.getItem('token')

export const createUserAP = async(body)=>{
    return await axios.post(`${urluser}/users/registerAdmin`,body)
}
export const createUserAPI = async(body)=>{
    return await axios.post(`${urluser}/users/registerUser`,body)
}
export const loginAPI= async(body)=>{
    return await axios.post(`${urluser}/login`,body)
}
export const voteAPI= async(body)=>{
    return await axios.post(`${urluser}/vote/`,body , { headers: {"Authorization" : `Bearer ${token}`}})
}
export const getAllCandidateAPI= async()=>{
    return await axios.post(`${urluser}/vote/getall`)
}
export const getAllVoteDetailsAdminAPI= async()=>{
    return await axios.post(`${urluser}/vote/getalladmin`)
}