import axios from "axios";
// import { API_URL } from "./urls";
// import jsCookie from 'js-cookie';


const token = localStorage.getItem('AccessToken');
// const API_URL = "http://192.168.1.27:3010/api"
const API_URL = "http://localhost:3000/api"

const APIClientPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": true,
    Authorization:`Bearer ${token}`
  },
  // withCredentials: true,
});

export const APIClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default APIClientPrivate;