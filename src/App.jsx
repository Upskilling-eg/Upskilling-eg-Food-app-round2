import { useEffect, useState } from "react";
import "./App.css";
import Home from "../src/HomeModule/components/Home/Home";
import NavBar from "../src/SharedModule/components/Navbar/NavBar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./SharedModule/components/AuthLayout/AuthLayout";
import Login from "./AuthModule/components/Login/Login";
import Forgotpass from "./AuthModule/components/ForgotPass/Forgotpass";
import MasterLayout from "./SharedModule/components/MasterLayout/MasterLayout";
import RecipesList from "./Recipes/components/RecipesList/RecipesList";
import UsersList from "./UsersModule/components/UsersList/UsersList";
import CategeriesList from "./CategoriesModule/components/CategoriesList/CategeriesList";
import Notfound from "./SharedModule/components/Notfound/Notfound";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./SharedModule/components/ProtectedRoute/ProtectedRoute";
import ResetPass from "./AuthModule/components/ResetPass/Resetpass";
import RecipesData from "./RecipesModule/components/RecipesData/RecipesData";
import Register from "./AuthModule/components/Register/Register";
import FavouritesList from "./FavouritesModule/components/FavouritesList/FavouritesList";

function App() {
  let [loginData, setLoginData] = useState(null);
  const saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    localStorage.setItem("loginData",JSON.stringify(decodedToken) );
    setLoginData(decodedToken);
  };
  //handle refresh
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "forgot-pass", element: <Forgotpass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home loginData={loginData} /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "favourites", element: <FavouritesList /> },

        { path: "recipe-data", element: <RecipesData /> },
        { path: "users", element: <UsersList /> },
        { path: "categories", element: <CategeriesList /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
