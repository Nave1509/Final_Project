import { useState, useEffect } from "react";
import productService from "../services/productService";
import { useStore } from "../context/store.context";

export const useMyProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useStore();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await productService.getAll();
        setProducts(data);
      } catch ({ response }) {
        return products;
      }
    };
    if (user?.biz) {
      getProducts();
    }
  }, []);

  return products;
};
