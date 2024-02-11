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

function App() {
  let [loginData, setLoginData] = useState(null);
  const saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
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
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: "recipes", element: <RecipesList /> },
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
