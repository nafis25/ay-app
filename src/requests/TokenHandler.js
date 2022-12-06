import AsyncStorage from '@react-native-async-storage/async-storage';

// export const getLocalRefreshToken = () => {
//    return localStorage.getItem("refresh_token");
// };

export const getLocalRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('refresh_token');
  } catch (error) {
    console.log('error retriving local refresh token');
    console.error(error);
  }
};

// export const getLocalAccessToken = () => {
//    return localStorage.getItem("token");
// };

export const getLocalAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.log('error retriving local access token');
    console.error(error);
  }
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

export const updateLocalAccessToken = async token => {
  let oldToken = await AsyncStorage.getItem('token');
  let newToken = token;
  try {
    await AsyncStorage.setItem('token', newToken);
  } catch (error) {
    console.log('error setting local access token');
    console.error(error);
  }

  console.log(
    'New token set!',
    `Old: ${oldToken.slice(-3)}`,
    `New: ${newToken.slice(-3)}`,
  );
};

// export const getUser = () => {
//    return JSON.parse(localStorage.getItem("user"));
// };

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('error retriving user object');
    console.error(error);
  }
};

// export const setUser = (user) => {
//    localStorage.setItem("user", JSON.stringify(user));
//    console.log(`Set new user ${JSON.stringify(user)}`);
// };

export const setUser = async user => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (error) {
    console.log('error setting user object');
    console.error(error);
  }

  console.log('User Set!');
};

// export const removeUser = () => {
//    localStorage.removeItem("user");
//    console.log("Removed user");
// };

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('@MyApp_key');
  } catch (error) {
    console.log('error removing user object');
    console.error(error);
  }

  console.log('User Removed!');
};

// export const setUserName = (name) => {
//    localStorage.setItem("name", name);
//    console.log("Set Username");
// };

export const setUserName = async name => {
  try {
    await AsyncStorage.setItem('name', name);
  } catch (error) {
    console.log('error setting username');
    console.error(error);
  }

  console.log('Username Set!');
};

// export const removeUserName = () => {
//    localStorage.removeItem("name");
//    console.log("Removed user name");
// };

export const getUserName = async () => {
  try {
    return await AsyncStorage.getItem('name');
  } catch (error) {
    console.log('error retrieving username');
    console.error(error);
  }
};

export const removeUserName = async () => {
  try {
    await AsyncStorage.removeItem('name');
  } catch (error) {
    console.log('error removing username');
    console.error(error);
  }

  console.log('Username Removed!');
};

// export const setQuantity = (qty) => {
//    localStorage.setItem("number_of_students", qty);
//    console.log("Set Quantity");
// };

export const setQuantity = qty => {
  Cookies.set('number_of_students', qty, {sameSite: 'Lax', expires: 60});
  console.log('Set Quantity');
};

// export const getQuantity = () => {
//    return parseInt(localStorage.getItem("number_of_students"));
// };

export const getQuantity = () => {
  return parseInt(Cookies.get('number_of_students'));
};

// export const setTokens = (token, refresh_token) => {
//    localStorage.setItem("token", token);
//    localStorage.setItem("refresh_token", refresh_token);
//    console.log("Set both tokens");
// };

export const setTokens = async (token, refresh_token) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
  } catch (error) {
    console.log('error setting both token');
    console.error(error);
  }

  console.log('Set both tokens');
};

// export const removeTokens = () => {
//    localStorage.removeItem("token");
//    localStorage.removeItem("refresh_token");
//    console.log("Removed both tokens");
// };

export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem('token', token);
    await AsyncStorage.removeItem('refresh_token', refresh_token);
  } catch (error) {
    console.log('error removing both token');
    console.error(error);
  }

  console.log('Removed both tokens');
};
