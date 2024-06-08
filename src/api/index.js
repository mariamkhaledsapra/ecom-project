import axios from "axios";

const baseURL = "https://graduation-project-tez6uftvsa-ew.a.run.app/";
// const baseURL = "http://127.0.0.1:8000/"; // for local testing

const API = axios.create({
  baseURL,
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // If the token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

const listProducts = () => {
  return () => API.get("/products-categories/product/");
};

const getProduct = () => {};
const SearchProducts = () => {};
const listCategories = () => {};

export default API;
