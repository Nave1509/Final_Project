import { useStore } from "../context/store.context";
import Product from "./product";
import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, products } = useStore();

  return (
    <>
      <PageHeader
        title={
          <>
            M&N <i className="bi bi-basket me-2"></i>
            Market
            <span>&copy;</span>
          </>
        }
        description="Shall we start shopping?"
      />
      {user?.isAdmin && (
        <div className="col-12 text-center mb-3">
          <Link className="btn btn-success" to="/create-product">
            create a new product
          </Link>
        </div>
      )}
      <div
        className="col-12 col-sm-12 text-center"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {!products?.length ? (
          <p>No Card Yet.</p>
        ) : (
          products.toReversed().map((product, index) => {
            return <Product key={product._id} product={product} />;
          })
        )}
      </div>
    </>
  );
};
export default Home;
