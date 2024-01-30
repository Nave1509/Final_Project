import { Link } from "react-router-dom";
import { useMyProducts } from "../../hooks/useMyProducts";
import Product from "./product";

const Products = () => {
  const products = useMyProducts();

  return (
    <>
      <div className="row flex-column align-content-center align-items-center ">
        <div className="col-12 col-sm-6 text-center mb-3">
          <Link className="btn btn-success" to="/create-product">
            create a new product
          </Link>
        </div>
        <div
          className="col-12 col-sm-12 text-center"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {!products.length ? (
            <p>no product...</p>
          ) : (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default Products;
