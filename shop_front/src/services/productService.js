import httpService from "./httpService";

function setTokenHeader() {
  if (localStorage.getItem("token")) {
    httpService.setCommonHeader("x-auth-token", localStorage.getItem("token"));
  }
}

export function getAll() {
  return httpService.get("/products");
}

export function getProductById(id) {
  return httpService.get(`/products/${id}`);
}

export function getProductBySearch(query) {
  if (query === "") {
    query = "!@#";
  }
  return httpService.get(`/products/search/${query}`);
}

export function getProductByFilter(query) {
  if (query === "") {
    query = "!@#";
  }
  return httpService.get(`/products/filter/${query}`);
}

export function createProduct(product) {
  setTokenHeader();
  return httpService.post("/products", product);
}

export function editProduct(id, product) {
  setTokenHeader();
  return httpService.put(`/products/${id}`, product);
}

export function deleteProduct(id) {
  setTokenHeader();
  return httpService.delete(`/products/${id}`);
}

const productService = {
  getAll,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  getProductBySearch,
  getProductByFilter,
};

export default productService;
