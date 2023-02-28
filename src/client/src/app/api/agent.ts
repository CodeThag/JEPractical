import axios, { AxiosError, AxiosResponse } from "axios";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "https://localhost:7226/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep(); // Used to delay response transmission
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    console.error(status);
    console.error(data);
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const moviesPath = "movies";
const Movies = {
  search: (params: URLSearchParams) =>
    requests.get(`${moviesPath}/search`, params),
  fetchDetailsById: (id: string) =>
    requests.get(`${moviesPath}/GetMovieById?id=${id}`),
  fetchPreviousSearch: () => requests.get(`${moviesPath}/FetchPreviousSearch`),
};

export const agent = {
  Movies,
};
