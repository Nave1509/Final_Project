import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/store.context";
import { useEffect, useState } from "react";
import CartProduct from "./cartProduct";

const NavBar = () => {
  const {
    user,
    cartProducts,
    cartStatus,
    setCartStatus,
    searchProducts,
    filterProducts,
    getProducts,
    // clearCart,
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

  // return (
  //   <header className="header">
  //     <a href="#" className="logo">
  //       <img src="./images/logo.png" alt="" />
  //     </a>
  //     <nav
  //       className="navbar navbar-expand-sm shadow-sm "
  //       aria-label="Fifth navbar example"
  //     >
  //       <div className="container">
  //         <Link className="navbar-brand" to="/">
  //           M&N <i className="bi bi-basket me-2"></i>
  //           Market
  //         </Link>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-bs-toggle="collapse"
  //           data-bs-target="#navbarsExample05"
  //           aria-controls="navbarsExample05"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>

  //         <div className="collapse navbar-collapse" id="navbarsExample05">
  //           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //             <li className="nav-item">
  //               <NavLink className="nav-link " to="/about">
  //                 About
  //               </NavLink>
  //             </li>
  //           </ul>

  //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
  //             {user ? (
  //               <li className="nav-item ">
  //                 <NavLink className="nav-link" to="/sign-out">
  //                   Sign Out
  //                 </NavLink>
  //               </li>
  //             ) : (
  //               <>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to="/sign-in">
  //                     Sign In
  //                   </NavLink>
  //                 </li>
  //                 <li className="nav-item">
  //                   <NavLink className="nav-link" to="/sign-up">
  //                     Sign Up
  //                   </NavLink>
  //                 </li>
  //               </>
  //             )}
  //           </ul>
  //         </div>

  //         <input
  //           type="text"
  //           name="searchInput"
  //           id="searchInput"
  //           value={searchInput}
  //           onChange={(e) => setSearchInput(e.target.value)}
  //           placeholder="search products.."
  //         />

  //         <button
  //           className="btn"
  //           onClick={() =>
  //             setThemeMode(themeMode === "light" ? "dark" : "light")
  //           }
  //         >
  //           {themeMode === "light" ? (
  //             <i className="bi bi-moon"></i>
  //           ) : (
  //             <i className="bi bi-brightness-high"></i>
  //           )}
  //         </button>

  //         <div className="dropdown me-5">
  //           <button
  //             onClick={() => {
  //               setCartStatus(!cartStatus);
  //             }}
  //             className="btn btn-secondary"
  //             type="button"
  //             // data-bs-toggle="dropdown"
  //             aria-expanded="false"
  //           >
  //             <i className="bi bi-cart"></i>
  //           </button>
  //           {cartProducts.length > 0 && (
  //             <span id="cartAmount">{cartProducts.length}</span>
  //           )}

  //           <div
  //             className={`dropdown-menu ${cartStatus ? "show" : ""}`}
  //             id="cartDropDown"
  //           >
  //             <h3>Your Cart</h3>
  //             {cartProducts.map((product) => {
  //               return (
  //                 <CartProduct key={product.product._id} product={product} />
  //               );
  //             })}
  //             <div id="cartTotal">
  //               <span id="cartTotalTitle">Total: </span>
  //               <span id="cartTotalSum">
  //                 <span id="cartTotalNum">
  //                   {totalSum.toLocaleString("em-US", {
  //                     style: "currency",
  //                     currency: "USD",
  //                   })}
  //                 </span>
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   </header>
  // );

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
                  <li className="mt-3">
                    <button className="btn dropdown-item ">Edit Profile</button>
                  </li>
                  <li className="mt-4">
                    <NavLink to="/sign-out" id="userSignOut">
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div id="userOptions"></div>
            </div>
          </>
        ) : (
          <>
            <div id="theUser" className="d-flex flex-row">
              <span>
                <i className="bi bi-person-fill"></i>
              </span>
              <div id="userOptions">
                <div className="d-inline-block" id="noLoginP">
                  <ul>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/sign-in">
                        Sign In
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
            </div>
          </>
        )}

        {/* <ul>
          <div className="navLinks">
            {user ? (
              <li className="nav-item ">
                <NavLink className="nav-link" to="/sign-out">
                  Sign Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-in">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </ul> */}
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="search products.."
          style={{ marginRight: "2%" }}
        />
      </div>

      <div id="headerBottom">
        <div id="logo">
          <Link className="navbar-brand" to="/">
            M&N <i className="bi bi-basket me-2"></i>
            Market
          </Link>
        </div>

        <nav id="mainMenuNav" className="navbar navbar-expand-md">
          <div className="container-fluid justify-content-sm-center">
            <button
              id="mobileBurger"
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainMenu"
              aria-controls="mainMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-dark navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainMenu">
              <ul id="mainMenuUL" className="navbar-nav">
                <li className="nav-item AllProducts">
                  <button
                    className="nav-link btn"
                    onClick={() => setFilterProduct("")}
                  >
                    All Products
                  </button>
                </li>
                <li className="nav-item Bakery">
                  <button
                    className="nav-link btn"
                    onClick={() => {
                      setFilterProduct("Bakery");
                    }}
                  >
                    Bakery
                  </button>
                </li>
                <li className="nav-item Dairy">
                  <button
                    className="nav-link btn"
                    onClick={() => setFilterProduct("Dairy")}
                  >
                    Dairy
                  </button>
                </li>
                <li className="nav-item DryFood">
                  <button
                    className="nav-link btn"
                    onClick={() => setFilterProduct("Dry Food")}
                  >
                    Dry Food
                  </button>
                </li>
                <li className="nav-item FruitsAndVegetables">
                  <button
                    className="nav-link btn"
                    onClick={() => setFilterProduct("Fruits And Vegetables")}
                  >
                    Fruits And Vegetables
                  </button>
                </li>
                <li className="nav-item Meats">
                  <button
                    className="nav-link btn"
                    onClick={() => setFilterProduct("Meats")}
                  >
                    Meats
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

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
          <div className="dropdown me-5">
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
                    {totalSum.toLocaleString("em-US", {
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
    </header>
  );
};
export default NavBar;
