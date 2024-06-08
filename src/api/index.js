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

const listCompanies = () => {
  return API.get("users/company/?serializer=get");
};

const getCompany = (id) => {
  return API.get(`users/company/${id}/?serializer=get`);
};

const createCompany = (name, email, address, mobile, tax_number, industry) => {
  return API.post("users/company/?serializer=create", {
    name,
    email,
    address,
    mobile,
    tax_number,
    industry,
  });
};

const UploadDocument = (issue_date, file, company) => {
  API.post("users/document/?serializer=create", {
    issue_date,
    file,
    company,
  });
};

const removeCompany = (id) => {
  return API.delete(`users/company/${id}/?serializer=get`);
};

const listProducts = () => {
  return API.get("/products-categories/product/");
};

const getProduct = () => {};
const SearchProducts = () => {};
const listCategories = () => {};

export {
  API,
  listCompanies,
  getCompany,
  createCompany,
  UploadDocument,
  removeCompany,
  listProducts,
};
