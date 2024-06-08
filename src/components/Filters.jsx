import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";

import { listCategories, listCompanies } from "../api";
import { toast } from "react-toastify";

const Filters = () => {
  const [selectCategoryList, setSelectCategoryList] = useState([]);
  const [selectCompanyList, setSelectCompanyList] = useState([]);

  useEffect(() => {
    listCategories()
      .then((res) => {
        const categoriesList = res.data.map((category) => category.name);
        setSelectCategoryList(categoriesList);
      })
      .catch((error) => {
        toast.error("Error: ", error);
      });
  }, []);

  useEffect(() => {
    listCompanies()
      .then((res) => {
        const companiesList = res.data.map((company) => company.name);
        setSelectCompanyList(companiesList);
      })
      .catch((error) => {
        toast.error("Error: ", error);
      });
  }, []);

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue=""
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
      />
      {/* COMPANIES */}
      <FormSelect
        label="select Company"
        name="company"
        list={selectCompanyList}
        size="select-sm"
        defaultValue="all"
      />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["asc", "desc", "price high", "price low"]}
        size="select-sm"
        defaultValue="a-z"
      />
      {/* BUTTONS */}

      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
      >
        search
      </button>
      <Link to="/shop?page=1" className="btn btn-primary btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
