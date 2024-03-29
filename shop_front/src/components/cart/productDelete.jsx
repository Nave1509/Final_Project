import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../services/productService";
import { useStore } from "../../context/store.context";
import { toast } from "react-toastify";

const ProductDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { deleteProducts } = useStore();

  useEffect(() => {
    const deleteProduct = async () => {
      await deleteProducts(id);
      toast("Product Delete Successfully 👏👏");
      navigate("/");
    };

    deleteProduct();
  }, [id, navigate]);

  return null;
};
export default ProductDelete;
