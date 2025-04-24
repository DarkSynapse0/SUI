// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { SuiClient } from "@mysten/sui/client";
import { Content } from "./content.tsx";
import { ZKLoginProvider } from "react-sui-zk-login-kit";
import ProductTable from "./pages/Products.tsx";
import NavBar from "./components/NavBar.tsx";
import Profile from "./pages/Profile.tsx";
import CustomerTable from "./pages/Customer.tsx";
import NotFound from "./pages/NotFoundPage.tsx";
import EditProductPage from "./pages/EditProduct.tsx";

const FULLNODE_URL = "https://fullnode.testnet.sui.io/";
const suiClient = new SuiClient({ url: FULLNODE_URL });

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: (
      <ZKLoginProvider client={suiClient}>
        <Content />
      </ZKLoginProvider>
    ),
  },
  {
    path: "/product",
    element: (
      <>
        <NavBar />
        <ProductTable />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <NavBar />
        <Profile />
      </>
    ),
  },
  {
    path:"/editproduct",
    element: (
      <>
        <NavBar />
        <EditProductPage />
      </>
    ),
  },
  {
    path: "/editproduct/:id",
    element: (
      <>
        <NavBar />
        <EditProductPage />
      </>
    ),
  },
  {
    path: "/customer",
    element: (
      <>
        <NavBar />
        <CustomerTable />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ZKLoginProvider client={suiClient}>
      <RouterProvider router={router} />
    </ZKLoginProvider>
  </React.StrictMode>
);
