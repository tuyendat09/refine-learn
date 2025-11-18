import { Refine, Authenticated } from "@refinedev/core";
import { ProductProvider } from "../shared/providers/product.provider";
import CategoryProvider from "../shared/providers/category.provider";

import routerProvider from "@refinedev/react-router";
import { authProvider } from "../shared/providers/auth.provider";
import { Toaster } from "react-hot-toast";

import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router";
import { JSX } from "react/jsx-runtime";

import ShowProduct from "../components/ShowProduct/ShowProduct";
import ListCategory from "../components/ListCategory/ListCategory";
import DashboardLayout from "../layout/DashBoardLayout";

import "./global.css";
import Login from "../components/Auth/Login/Login";
import Onboarding from "../components/Auth/Onboarding/Onboarding";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={{
          default: ProductProvider,
          category: CategoryProvider,
        }}
        resources={[
          {
            name: "protected-products",
            list: "/products",
            show: "/products/:id",
            edit: "/products/:id/edit",
            create: "/products/create",
            meta: { label: "products" },
          },
          {
            name: "protected-category",
            list: "/category",
            show: "/category/:id",
            edit: "/category/:id/edit",
            create: "/category/create",
            meta: {
              label: "category",
              dataProviderName: "category",
            },
          },
        ]}
        routerProvider={routerProvider}
        authProvider={authProvider}
      >
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: `
            !bg-black 
            !text-white 
            !rounded-full 
            !text-[14px]
            !max-w-[800px]
       `,
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Authenticated key="protected" redirectOnFail="/login">
                <DashboardLayout />
              </Authenticated>
            }
          >
            <Route index element={<ShowProduct />} />
            <Route path="/category" element={<ListCategory />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
