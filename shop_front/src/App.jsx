import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./components/general/about";
import ProductsCreate from "./components/cart/productCreate";
import ProtectedRoute from "./components/common/protectedRoute";
import Footer from "./components/general/footer";
import Home from "./components/general/home";
import Products from "./components/cart/products";
import Header from "./components/general/header";
import SignIn from "./components/general/signIn";
import SignOut from "./components/general/signOut";
import SignUp from "./components/general/signUp";
import "./services/userServices";
import ProductDelete from "./components/cart/productDelete";
import ProductsEdit from "./components/cart/productEdit";
import ProductView from "./components/cart/productView";

function App() {
  return (
    <div className="app d-flex flex-column vh-100">
      <ToastContainer />
      <Header />
      <div id="main" className="flex-fill d-flex flex-column">
        <div id="mainOverlay" className="d-flex flex-fill flex-column d-flex ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn redirect="/" />} />
            <Route path="sign-out" element={<SignOut redirect="/" />} />

            <Route path="product/view/:id" element={<ProductView />} />
            <Route
              path="product"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-product"
              element={
                <ProtectedRoute>
                  <ProductsCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="product/delete/:id"
              element={
                <ProtectedRoute>
                  <ProductDelete />
                </ProtectedRoute>
              }
            />
            <Route
              path="product/edit/:id"
              element={
                <ProtectedRoute>
                  <ProductsEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
