import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useStore } from "../../context/store.context";
import { AboutMenu } from "./aboutMenu";
import MainMenu from "./mainMenu";
import { useEffect, useState } from "react";
import CartProduct from "../cart/cartProduct";
import Title from "../common/title";

const Header = () => {
  const {
    user,
    cartProducts,
    cartStatus,
    setCartStatus,
    searchProducts,
    filterProducts,
    getProducts,
  } = useStore();
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theMode") || "light"
  );
  const [totalSum, setTotalSum] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [filterProduct, setFilterProduct] = useState("");

  const htmlTag = document.getElementsByTagName("html")[0];

  useEffect(() => {
    htmlTag.setAttribute("data-bs-theme", themeMode);
    localStorage.setItem("theMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    let sum = 0;
    if (cartProducts.length > 0) {
      cartProducts.forEach((product) => {
        sum += product.product.price * product.amount;
      });
    }

    setTotalSum(sum);
  }, [cartProducts]);

  useEffect(() => {
    if (searchInput !== "") {
      searchProducts(searchInput);
    } else {
      getProducts();
    }
  }, [searchInput]);

  useEffect(() => {
    if (filterProduct !== "") {
      filterProducts(filterProduct);
    } else {
      getProducts();
    }
  }, [filterProduct]);

  return (
    <header>
      <div id="headerTop">
        {user ? (
          <>
            <div id="theUser" className="d-flex flex-column">
              <span>
                <img id="userImage" src={user.image.url} alt="User Image" />
              </span>
              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  type="button"
                  id="theUserName"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul className="dropdown-menu" aria-labelledby="theUserName">
                  <li className="">
                    <i className="bi bi-envelope userIcon"></i>
                    {user.email}
                  </li>
                  <li className="">
                    <i className="bi bi-telephone userIcon"></i>
                  </li>
                  <li className="mt-1">
                    {user.isAdmin ? <p>Admin</p> : <p>User</p>}
                  </li>
                  <li>
                    <NavLink to="/sign-out" id="userSignOut">
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div id="userOptions"></div>
            </div>
            <Title></Title>
          </>
        ) : (
          <>
            <div id="theUserOption" className="d-flex flex-row">
              <span>
                <i className="bi bi-person-fill"></i>
              </span>

              <div id="noLoginP">
                <ul>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sign-in">
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sign-up">
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <Title></Title>
          </>
        )}

        <div id="divInput">
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="search products.."
          />
        </div>
        <div id="theCart">
          <button
            className="btn"
            onClick={() =>
              setThemeMode(themeMode === "light" ? "dark" : "light")
            }
          >
            {themeMode === "light" ? (
              <i className="bi bi-moon"></i>
            ) : (
              <i className="bi bi-brightness-high"></i>
            )}
          </button>
          {/* Cart  */}
          <div className="dropdown ">
            <button
              onClick={() => {
                setCartStatus(!cartStatus);
              }}
              className="btn btn-secondary"
              type="button"
              aria-expanded="false"
            >
              <i className="bi bi-cart"></i>
            </button>
            {cartProducts.length > 0 && (
              <span id="cartAmount">{cartProducts.length}</span>
            )}

            <div
              className={`dropdown-menu ${cartStatus ? "show" : ""}`}
              id="cartDropDown"
            >
              <h3>Your Cart</h3>
              {cartProducts.length > 0 &&
                cartProducts?.map((product) => {
                  return (
                    <CartProduct key={product.product._id} product={product} />
                  );
                })}
              <div id="cartTotal">
                <span id="cartTotalTitle">Total: </span>
                <span id="cartTotalSum">
                  <span id="cartTotalNum">
                    {totalSum.toFixed(1).toLocaleString("em-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div id="headerBottom">
        {useLocation().pathname === "/" ? <MainMenu /> : <AboutMenu />}
      </div>
    </header>
  );
};
export default Header;
