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
    // switch (status) {
    //   case 400:
    // if (data.errors) {
    //   const modelStateErrors: string[] = [];
    //   for (const key in data.errors) {
    //     if (data.errors[key]) {
    //       modelStateErrors.push(data.errors[key]);
    //     }
    //   }
    //   throw modelStateErrors.flat();
    // }
    //     console.log(data.title); // toast.error(data.title);
    //     break;
    //   case 401:
    //     toast.error(data.title);
    //     break;
    //   case 500:
    //     history.push({
    //       pathname: "/server-error",
    //       state: { error: data },
    //     });
    //     break;
    //   default:
    //     break;
    // }

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
