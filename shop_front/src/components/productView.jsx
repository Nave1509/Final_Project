import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { Link } from "react-router-dom";

const ProductView = () => {
  const [product, setProduct] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getProductInfo = async () => {
      const { data } = await getProductById(id);

      setProduct(data);
    };
    getProductInfo();
  }, [id]);

  return (
    <>
      {product && (
        <div id="productView" className="mt-3">
          <div
            className="col-12 col-sm-6"
            style={{
              backgroundImage: `url(${product.image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              height: "300px",
              margin: "0 auto",
            }}
          ></div>
          <div className="d-flex flex-column align-items-center w-100 w-sm-25 mx-auto">
            <h1 className="text-center my-2">{product.category}</h1>
            <h3 className="text-center mt-2">{product.title}</h3>
            <div className="text-center">
              <span className=" fw-bold me-2">description:</span>
              {product.description}
            </div>

            <div className="text-center my-2">
              <span className=" fw-bold me-2">Price:</span> {product.price}
            </div>
            <Link to={`/`} className="card-link btn btn-primary pb-1">
              <i className="bi bi-arrow-left-circle"></i>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductView;
