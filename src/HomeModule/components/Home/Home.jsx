import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../SharedModule/components/Header/Header";
import RecipesHeader from "../../../SharedModule/components/RecipesHeader/RecipesHeader";

export default function Home({ loginData }) {
  return (
    <>
      <ToastContainer />
      <Header
        title={`Welcome ${loginData?.userName}`}
        description="This is a welcoming screen for the entry of the application , you can now see the options"
      />

      <RecipesHeader />
    </>
  );
}
