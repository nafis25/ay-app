import Cookies from "js-cookie";

// export const getLocalRefreshToken = () => {
//    return localStorage.getItem("refresh_token");
// };

export const getLocalRefreshToken = () => {
   return Cookies.get("refresh_token");
};

// export const getLocalAccessToken = () => {
//    return localStorage.getItem("token");
// };

export const getLocalAccessToken = () => {
   return Cookies.get("token");
};

// export const updateLocalAccessToken = (token) => {
//    let oldToken = localStorage.getItem("token");
//    let newToken = token;
//    localStorage.setItem("token", newToken);
//    console.log(
//       "New token set!",
//       `Old: ${oldToken.slice(-3)}`,
//       `New: ${newToken.slice(-3)}`
//    );
// };

export const updateLocalAccessToken = (token) => {
   let oldToken = Cookies.get("token");
   let newToken = token;
   Cookies.set("token", newToken, { sameSite: "Lax", expires: 60 });
   console.log(
      "New token set!",
      `Old: ${oldToken.slice(-3)}`,
      `New: ${newToken.slice(-3)}`
   );
};

// export const getUser = () => {
//    return JSON.parse(localStorage.getItem("user"));
// };

export const getUser = () => {
   try {
      return JSON.parse(Cookies.get("user"));
   } catch (error) {
      return false;
   }
};

// export const setUser = (user) => {
//    localStorage.setItem("user", JSON.stringify(user));
//    console.log(`Set new user ${JSON.stringify(user)}`);
// };

export const setUser = (user) => {
   Cookies.set("user", JSON.stringify(user), { sameSite: "Lax", expires: 60 });
   console.log(`Set new user ${JSON.stringify(user)}`);
};

// export const removeUser = () => {
//    localStorage.removeItem("user");
//    console.log("Removed user");
// };

export const removeUser = () => {
   Cookies.remove("user");
   console.log("Removed user");
};

// export const setUserName = (name) => {
//    localStorage.setItem("name", name);
//    console.log("Set Username");
// };

export const setUserName = (name) => {
   Cookies.set("name", name, { sameSite: "Lax", expires: 60 });
   console.log("Set Username");
};

// export const removeUserName = () => {
//    localStorage.removeItem("name");
//    console.log("Removed user name");
// };

export const getUserName = () => {
   return Cookies.get("name");
};

export const removeUserName = () => {
   Cookies.remove("name");
   console.log("Removed user name");
};

// export const setQuantity = (qty) => {
//    localStorage.setItem("number_of_students", qty);
//    console.log("Set Quantity");
// };

export const setQuantity = (qty) => {
   Cookies.set("number_of_students", qty, { sameSite: "Lax", expires: 60 });
   console.log("Set Quantity");
};

// export const getQuantity = () => {
//    return parseInt(localStorage.getItem("number_of_students"));
// };

export const getQuantity = () => {
   return parseInt(Cookies.get("number_of_students"));
};

// export const setTokens = (token, refresh_token) => {
//    localStorage.setItem("token", token);
//    localStorage.setItem("refresh_token", refresh_token);
//    console.log("Set both tokens");
// };

export const setTokens = (token, refresh_token) => {
   Cookies.set("token", token, { sameSite: "Lax", expires: 60 });
   Cookies.set("refresh_token", refresh_token, {
      sameSite: "Lax",
      expires: 60,
   });
   console.log("Set both tokens");
};

// export const removeTokens = () => {
//    localStorage.removeItem("token");
//    localStorage.removeItem("refresh_token");
//    console.log("Removed both tokens");
// };

export const removeTokens = () => {
   Cookies.remove("token");
   Cookies.remove("refresh_token");
   console.log("Removed both tokens");
};
