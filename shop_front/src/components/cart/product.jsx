import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store.context";

const Product = ({
  product: { _id, title, image, price, productAccordingTo, description },
}) => {
  const [amount, setAmount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, updateCart, getCartProducts, cartStatus, setCartStatus } =
    useStore();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setIsDisabled(value === "0");
  };

  const handleAddToCart = () => {
    if (amount !== 0) {
      updateCart({ _id, amount });
      getCartProducts();
      setCartStatus(true);
    }
  };

  return (
    <div className="product">
      <img
        style={{ height: "250px", objectFit: "cover" }}
        src={image.url}
        className="card-img-top"
        alt={image.alt}
      />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{description}</p>
        <p className="product-price">
          Price: {price}$ for 1 {productAccordingTo}
        </p>
        <p>
          <span style={{ "marginRight": "5px" }}>Amount:</span>
          <input
            type="number"
            value={amount}
            onChange={handleInputChange}
            min="0"
            step="0.5"
            style={{ "width": "50px" }}
          />
          <span style={{ "marginLeft": "5px" }}>KG</span>
        </p>

        {user && isDisabled}
        <button
          className="btn btn-dark"
          style={{ "width": "80%", "marginBottom": "10px" }}
          disabled={!user || isDisabled}
          onClick={handleAddToCart}
        >
          {user ? "Add To Cart" : "User not found or disabled"}
        </button>
        <p>
          <Link
            to={`product/view/${_id}`}
            className="card-link btn btn-success pb-1"
          >
            <i className="bi bi-eye"></i>
          </Link>
          {user?.isAdmin && (
            <>
              <Link
                to={`/product/edit/${_id}`}
                className="card-link btn btn-primary pb-1 mx-2"
              >
                <i className="bi bi-pencil-square"></i>
              </Link>
              <Link
                to={`/product/delete/${_id}`}
                className="card-link btn btn-danger pb-1"
              >
                <i className="bi bi-trash"></i>
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
export default Product;
