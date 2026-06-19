import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PageLoader from "./components/shared/PageLoader";
import PrivateRoute from "./components/routes/Private";
import AdminRoute from "./components/routes/AdminRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Policy = lazy(() => import("./pages/Policy"));
const Terms = lazy(() => import("./pages/Terms"));
const Shipping = lazy(() => import("./pages/Shipping"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashborad = lazy(() => import("./pages/user/Dashborad"));
const ForgetPassword = lazy(() => import("./pages/Auth/ForgetPassword"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Users = lazy(() => import("./pages/Admin/Users"));
const CreateProduct = lazy(() => import("./pages/Admin/CreateProduct"));
const CreateCategory = lazy(() => import("./pages/Admin/CreateCategory"));
const Orders = lazy(() => import("./pages/user/Orders"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const UpdateProduct = lazy(() => import("./pages/Admin/UpdateProduct"));
const AdminProducts = lazy(() => import("./pages/Admin/Products"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Search = lazy(() => import("./pages/Search"));
const Categories = lazy(() => import("./pages/Categories"));
const CategoryProduct = lazy(() => import("./pages/CategoryProduct"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrder"));
const AdminCoupons = lazy(() => import("./pages/Admin/Coupons"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashborad" element={<PrivateRoute />}>
          <Route path="user" element={<Dashborad />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/dashborad" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/coupons" element={<AdminCoupons />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
