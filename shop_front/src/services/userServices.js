import httpService from "./httpService";

const TOKEN_KEY = "token";

setTokenHeader();

export function setTokenHeader(token) {
  httpService.setCommonHeader("x-auth-token", token);
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function loginUser(credential) {
  const response = await httpService.post("/users/auth", credential);
  localStorage.setItem(TOKEN_KEY, response.data.token);
  setTokenHeader(response.data.token);
  return response;
}

export function logOut() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export async function getAllUsers() {
  return await httpService.get("/users");
}

export async function getUserById(id) {
  return await httpService.get(`/users/${id}`);
}

export async function getMe(token) {
  return await httpService.get("/users/me", {
    headers: { "x-auth-token": token },
  });
}

export async function editUser(id, user) {
  return await httpService.put(`/users/${id}`, user);
}

export async function deleteUser(id) {
  return await httpService.delete(`/users/${id}`);
}

export const usersService = {
  createUser,
  loginUser,
  logOut,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getMe,
};

export default usersService;
