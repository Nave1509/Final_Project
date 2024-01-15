import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./components/about";
import ProductsCreate from "./components/productCreate";
import ProtectedRoute from "./components/common/protectedRoute";
import Footer from "./components/footer";
import Home from "./components/home";
import MyProducts from "./components/myProducts";
import NavBar from "./components/navBar";
import SignIn from "./components/sign-in";
import SignOut from "./components/sign-out";
import SignUp from "./components/signUp";
import "./services/userServices";
import ProductsDelete from "./components/productsDelete";
import ProductsEdit from "./components/productEdit";
import ProductView from "./components/productView";

function App() {
  return (
    <div className="app d-flex flex-column vh-100">
      <ToastContainer />
      <NavBar />
      <div id="main" className="flex-fill d-flex flex-column">
        <div
          id="mainOverlay"
          className="d-flex flex-fill flex-column d-flex px-5 pb-3"
        >
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
                  <MyProducts />
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
                  <ProductsDelete />
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
