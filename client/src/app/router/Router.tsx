import IndexLayout from "../../features/landing/layout/IndexLayout";
import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import IndexPage from "../../features/landing/pages/Index";
import Loader from "../../shared/components/Loader";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import ProductsPage from "../../features/landing/pages/Products";
import DashboardLayout from "../../features/dashboard/layout/DashboardLayout";
import DashboardPage from "../../features/dashboard/pages/Dashboard";
import ConfirmOrderPage from "../../features/landing/pages/ConfirmOrder";
import ProductsManagerPage from "../../features/dashboard/pages/Products";
import UsersManagerPage from "../../features/dashboard/pages/Users";
import OrdersManagerPage from "../../features/dashboard/pages/Orders";
import CartPage from "../../features/dashboard/pages/Cart";



export const rootRoute = createRootRoute({
    component: () => (
        <>
            <Loader />
            <Outlet />
        </>
    )
});

const indexLayout = createRoute({
    getParentRoute: () => rootRoute,
    id: "layout",
    component: () => <IndexLayout />
});

const indexPage = createRoute({
    getParentRoute: () => indexLayout,
    path: "/",
    component: () => <IndexPage />
});

const productsPage = createRoute({
    getParentRoute: () => indexLayout,
    path: "/products",
    validateSearch: (search) => ({
        page: Number(search.page ?? 1)
    }),
    component: () => <ProductsPage />
});

const registerPage = createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: () => <Register />
});

const loginPage = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: () => <Login />
});
const confirmOrderPage = createRoute({
    getParentRoute: () => indexLayout,
    path: "/confirm-order",
    component: () => <ConfirmOrderPage />
});

const dashboardLayout = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: () => <DashboardLayout />
});


const dashboardPage = createRoute({
    getParentRoute: () => dashboardLayout,
    path: "/",
    component: () => <DashboardPage />
});

const productMangagerPage = createRoute({
    getParentRoute: () => dashboardLayout,
    validateSearch: (search) => ({
        page: Number(search.page ?? 1),
        limit: search.limit ? Number(search.limit) : 5,
        search: search.search ? String(search.search) : undefined
    }),
    path: "products",
    component: () => <ProductsManagerPage />
});

const userManagerPage = createRoute({
    getParentRoute: () => dashboardLayout,
    validateSearch: (search) => ({
        page: Number(search.page ?? 1),
        limit: search.limit ? Number(search.limit) : 5,
        search: search.search ? String(search.search) : undefined
    }),
    path: "users",
    component: () => <UsersManagerPage />
});

const orderManagerPage = createRoute({
    getParentRoute: () => dashboardLayout,
    validateSearch: (search) => ({
        page: Number(search.page ?? 1),
        limit: search.limit ? Number(search.limit) : 5,
        search: search.search ? String(search.search) : undefined
    }),
    path: "orders",
    component: () => <OrdersManagerPage />
});

const cartPage = createRoute({
    getParentRoute: () => dashboardLayout,
    path: "cart",
    component: () => <CartPage />
});

const routeTree = rootRoute.addChildren([
    indexLayout.addChildren([indexPage, productsPage, confirmOrderPage]),
    registerPage,
    loginPage,
    dashboardLayout.addChildren([dashboardPage, productMangagerPage, userManagerPage, orderManagerPage, cartPage])
]);

export const router = createRouter({ routeTree });