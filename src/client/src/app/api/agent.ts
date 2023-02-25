import axios, { AxiosResponse } from "axios";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:7121/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
