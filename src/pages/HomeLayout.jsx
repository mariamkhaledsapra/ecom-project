import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";
import { listCompanies } from "../api";

const HomeLayout = () => {
  // console.log("here here", listCompanies());
  listCompanies().then((res) => console.log("here here", res));
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
