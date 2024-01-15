import { useStore } from "../context/store.context";

const CartProduct = ({ product }) => {
  const { updateCart, getCartProducts } = useStore();

  return (
    <div className="cartProduct">
      <div className="cartProductInner">
        <img
          className="cartProductImage"
          src={product.product.image.url}
          alt={product.product.image.alt}
        />
        <h4 className="cardProductTitle">
          <span>
            {product.product.title}
            {":"}
          </span>
        </h4>
        <span className="cartProductPrice">
          {product.amount}KG*{product.product.price}$=
          {Number(product.amount) * Number(product.product.price)}$
        </span>
      </div>

      <button
        className="cartProductDelete bi bi-trash btn btn-danger"
        onClick={() => {
          updateCart({ _id: product.product._id, amount: 0 });
          getCartProducts();
        }}
      ></button>
    </div>
  );
};

export default CartProduct;
