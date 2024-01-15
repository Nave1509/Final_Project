import { useState, useEffect } from "react";
import productService from "../services/productService";
import { useStore } from "../context/store.context";

export const useProducts = (id) => {
  const [product, setProduct] = useState(null);
  const { user } = useStore();

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await productService.getProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  return product;
};
