/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { SearchProducts } from "../api";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // /posts?title=json-server&author=typicode
  // GET /posts?_sort=views&_order=asc
  // GET /posts/1/comments?_sort=votes&_order=asc

  let mydate = Date.parse(params.date);

  if (mydate && !isNaN(mydate)) {
    // The date is valid
    mydate = new Date(mydate).toISOString();
  } else {
    mydate = "";
  }

  const filterObj = {
    company: params.company ?? "all",
    category: params.category ?? "all",
    search: params.search ?? "",
    current_page: Number(params.page) || 1,
  };

  // set params in get apis
  let parameter =
    (filterObj.company !== "all" ? `?seller__name=${filterObj.company}` : "") +
    (filterObj.category !== "all"
      ? `&category__name=${filterObj.category}`
      : "") +
    (filterObj.search != ""
      ? `&q=${encodeURIComponent(filterObj.search)}`
      : ``);

  try {
    const response = await SearchProducts(parameter);
    let data = response.data;

    return {
      productsData: data,
      productsLength: data.length,
      page: filterObj.current_page,
    };
  } catch (error) {
    console.log(error.response);
  }
  // /posts?views_gte=10

  return null;
};

const Shop = () => {
  const productLoaderData = useLoaderData();

  return (
    <>
      <SectionTitle title="Shop" path="Home | Shop" />
      <div className="max-w-7xl mx-auto mt-5">
        <Filters />
        {productLoaderData.productsData.length === 0 && (
          <h2 className="text-accent-content text-center text-4xl my-10">
            No products found for this filter
          </h2>
        )}
        <div className="grid grid-cols-4 px-2 gap-y-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <ProductElement
                key={nanoid()}
                id={product.id}
                title={product.name}
                image={product.product_images?.[0]?.image}
                price={product.product_prices?.[0]?.unit_price}
                // brandName={product.brandName}
              />
            ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Shop;
