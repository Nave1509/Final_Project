import { useStore } from "../../context/store.context";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const { filterProducts, getProducts } = useStore();
  const [filterProduct, setFilterProduct] = useState("");

  useEffect(() => {
    if (filterProduct !== "") {
      filterProducts(filterProduct);
    } else {
      getProducts();
    }
  }, [filterProduct]);

  return (
    <>
      <nav id="mainMenuNav" className="navbar navbar-expand-md">
        <div className="container-fluid justify-content-sm-center">
          <button
            id="mobileBurger"
            className="navbar-toggler ml-auto mr-auto"
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
              <li className="nav-item Bakery">
                <button
                  className="nav-link btn"
                  onClick={() => {
                    setFilterProduct("Candys");
                  }}
                >
                  Candys
                </button>
              </li>
              <li className="nav-item Dairy">
                <button
                  className="nav-link Btn"
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
              <li className="nav-item FruitsAndVegetables">
                <button
                  className="nav-link btn"
                  onClick={() => setFilterProduct("Fish")}
                >
                  Fish
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
    </>
  );
};

export default MainMenu;
