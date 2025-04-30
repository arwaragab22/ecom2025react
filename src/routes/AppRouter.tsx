import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import MainLayout from "@layouts/MainLayout/MainLayout";
// pages
import Home from "@pages/Home";
import Categories from "@pages/Categories";
import Products from "@pages/Products";
import AboutUs from "@pages/AboutUs";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Error from "@pages/Error";
import Shopingcart from "@pages/Shopingcart";
import Wishes from "@pages/Wishes";
import Protectedroute from "@components/common/Protectedroute/Protectedroute";
import Profile from "@layouts/Profile/Profile";
import Account from "@pages/Account";
import Ordersinfo from "@pages/Ordersinfo";
import Searchglobal from "@pages/Searchglobal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "/categories/products/:prefix",
        element: <Products />,
        loader: ({ request, params }) => {
          const prefix = params.prefix;

          if (!/^[a-z]+$/i.test(prefix as string)) {
            alert("here");
            throw new Response("bad request", {
              statusText: "Category not found",
              status: 404,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "search",
        element: <Searchglobal />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "shopingcart",
        element: (
          <Protectedroute>
            <Shopingcart />
          </Protectedroute>
        ),
      },
      {
        path: "wish",
        element: (
          <Protectedroute>
            <Wishes />
          </Protectedroute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Account />,
          },
          {
            path: "orders",
            element: <Ordersinfo />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
