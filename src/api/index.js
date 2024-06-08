import axios from "axios";

// const baseURL = "https://graduation-project-tez6uftvsa-ew.a.run.app/";
const baseURL = "http://127.0.0.1:8000/"; // for local testing

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

const getCurrentUser = () => {
  const username = localStorage.getItem("username");
  return API.get(`users/user/?username=${username}`);
};

const editUser = (id, { ...userData }) => {
  return API.put(`users/user/${id}/`, userData);
};

const listCompanies = () => {
  return API.get("users/company/?serializer=get");
};

const getCompany = (id) => {
  return API.get(`users/company/${id}/?serializer=get`);
};

const getOwnedCompany = () => {
  const owner = localStorage.getItem("username");
  return API.get(`users/company/?serializer=get&owner__name=${owner}`);
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

// TODO: editCompany

const removeCompany = (id) => {
  return API.delete(`users/company/${id}/?serializer=get`);
};

const SearchProducts = (filters) => {
  console.log("here here filters", filters);
  return API.get(`/products-categories/product/${filters || ""}`);
};

const getProductsBySeller = (sellerName) => {
  return API.get(
    `products-categories/product/?seller__name=${sellerName || ""}`
  );
};

const getProduct = (id) => {
  return API.get(`/products-categories/product/${id}/`);
};

const createProduct = () => {
  // TODO: write body
};

const listCategories = () => {
  return API.get("/products-categories/category/");
};

const getCategory = (id) => {
  return API.get(`/products-categories/category/${id}/`);
};

export {
  API,
  getCurrentUser,
  editUser,
  listCompanies,
  getCompany,
  getOwnedCompany,
  createCompany,
  UploadDocument,
  removeCompany,
  getProductsBySeller,
  SearchProducts,
  getProduct,
  createProduct,
  listCategories,
  getCategory,
};
