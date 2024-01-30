import { useStore } from "../../context/store.context";

const CartProduct = ({ product }) => {
  const { updateCart, getCartProducts } = useStore();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const totalPrice = Number(product.amount) * Number(product.product.price);
  const formattedTotalPrice = formatter.format(totalPrice);
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
          {product.amount}KG*{formatter.format(product.product.price)}$=
          {formattedTotalPrice}
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
