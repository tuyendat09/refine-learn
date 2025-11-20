import { Refine, Authenticated } from "@refinedev/core";

import { ProductProvider } from "./shared/providers/product.provider";
import CategoryProvider from "./shared/providers/category.provider";
import { lazy } from "react";
import routerProvider from "@refinedev/react-router";
import { authProvider } from "./shared/providers/auth.provider";
import { Toaster } from "react-hot-toast";

import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router";
import { JSX } from "react/jsx-runtime";

import ShowProduct from "./components/Product/ListProduct/ListProduct";
const ListCategory = lazy(
  () => import("./components/Category/ListCategory/ListCategory"),
);
import DashboardLayout from "../layout/DashBoardLayout";
const CreateCategoryModal = lazy(
  () => import("./components/Category/CreateCategory/CreateCategoryModal"),
);
const EditCategoryModal = lazy(
  () => import("./components/Category/EditCategory/EditCategoryModal"),
);
const CreateProductModal = lazy(
  () => import("./components/Product/CreateProduct/CreateProductModal"),
);

import "./global.css";
import Login from "./components/Auth/Login/Login";
import Onboarding from "./components/Auth/Onboarding/Onboarding";

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
            list: "/",
            show: "/products/:id",
            edit: "/products/:id/edit",
            create: "/products/create",
            meta: { label: "products" },
          },
          {
            name: "protected-category",
            list: "/category",
            show: "/category/edit/:id",
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
            <Route path="/" element={<ShowProduct />}>
              <Route path="products/create" element={<CreateProductModal />} />
            </Route>
            <Route path="/category" element={<ListCategory />}>
              <Route path="create" element={<CreateCategoryModal />} />
              <Route path="edit/:id" element={<EditCategoryModal />} />
            </Route>
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
