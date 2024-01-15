// import { createContext, useContext, useEffect, useState } from "react";
// import userService from "../services/userServices";

// const fn_error_context_must_be_used = () => {
//   throw new Error("must used authContext for consumer to work properly");
// };

// export const authContext = createContext({
//   logout: fn_error_context_must_be_used,
//   login: fn_error_context_must_be_used,
//   createUser: fn_error_context_must_be_used,
//   user: null,
// });
// authContext.displayName = "auth";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState();

//   const refreshUser = () => setUser();

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       getUser();
//       async function getUser() {
//         const me = await userService.getMe(localStorage.getItem("token"));
//         setUser(me.data);
//       }
//     }
//   }, []);

//   const login = async (credential) => {
//     const response = await userService.loginUser(credential);
//     const me = await userService.getMe();

//     refreshUser();
//     setUser(me.data);
//     return response;
//   };

//   const logout = () => {
//     userService.logOut();
//     refreshUser();
//   };

//   return (
//     <authContext.Provider
//       value={{ logout, login, user, createUser: userService.createUser }}
//     >
//       {children}
//     </authContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(authContext);
// };

// export default AuthProvider;
