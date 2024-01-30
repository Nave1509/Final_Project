import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/userServices";
import productService from "../services/productService";
import cartProductService from "../services/cartProductService";

const fn_error_context_must_be_used = () => {
  throw new Error("must used storeContext for consumer to work properly");
};

export const storeContext = createContext({
  logout: fn_error_context_must_be_used,
  login: fn_error_context_must_be_used,
  createUser: fn_error_context_must_be_used,
  user: null,
  products: null,
  cartProducts: null,
  editProduct: fn_error_context_must_be_used,
  deleteProducts: fn_error_context_must_be_used,
  createProduct: fn_error_context_must_be_used,
  updateCart: fn_error_context_must_be_used,
  getCartProducts: fn_error_context_must_be_used,
  setCartProducts: fn_error_context_must_be_used,
  cartStatus: null,
  setCartStatus: fn_error_context_must_be_used,
  searchProducts: fn_error_context_must_be_used,
  filterProducts: fn_error_context_must_be_used,
  getProducts: fn_error_context_must_be_used,
});
storeContext.displayName = "store";

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartStatus, setCartStatus] = useState(false);
  const refreshUser = () => setUser();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
      async function getUser() {
        const me = await userService.getMe(localStorage.getItem("token"));
        setUser(me.data);
        setCartProducts(me.data.cart);
      }
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (user) {
      getCartProducts();
    }
  }, [user]);

  async function getCartProducts() {
    const myCartProducts = await cartProductService.getAll();
    if (myCartProducts.data && myCartProducts.data.length > 0) {
      setCartProducts(myCartProducts.data[0].cart);
    } else {
      setCartProducts([]);
    }
  }

  // Products //
  async function getProducts() {
    const products = await productService.getAll();
    setProducts(products.data);
  }

  const login = async (credential) => {
    const response = await userService.loginUser(credential);
    const me = await userService.getMe(localStorage.getItem("token"));

    refreshUser();
    setUser(me.data);
    return response;
  };

  const logout = () => {
    userService.logOut();
    refreshUser();
  };

  const createProduct = async (product) => {
    await productService.createProduct(product);
    await getProducts();
  };

  const editProduct = async (id, product) => {
    await productService.editProduct(id, product);
    await getProducts();
  };

  const deleteProducts = async (id) => {
    await productService.deleteProduct(id);
    await getProducts();
  };

  const searchProducts = async (query) => {
    const products = await productService.getProductBySearch(query);
    setProducts(products.data);
  };

  const filterProducts = async (query) => {
    const filterProduct = await productService.getProductByFilter(query);
    setProducts(filterProduct.data);
  };

  // Cart //
  const updateCart = async (id) => {
    await cartProductService.editCart(id);
    await getCartProducts();
  };

  return (
    <storeContext.Provider
      value={{
        logout,
        login,
        user,
        createUser: userService.createUser,
        products,
        cartProducts,
        editProduct,
        deleteProducts,
        createProduct,
        updateCart,
        getCartProducts,
        setCartProducts,
        cartStatus,
        setCartStatus,
        searchProducts,
        filterProducts,
        getProducts,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => {
  return useContext(storeContext);
};

export default StoreProvider;
