import httpService from "./httpService";

function setTokenHeader() {
  if (localStorage.getItem("token")) {
    httpService.setCommonHeader("x-auth-token", localStorage.getItem("token"));
  }
}

export function getAll() {
  setTokenHeader();
  return httpService.get("/cart");
}

export function editCart(productCart) {
  setTokenHeader();
  return httpService.patch(`/cart/updateCart`, productCart);
}

const cartProductService = {
  getAll,
  editCart,
};

export default cartProductService;
