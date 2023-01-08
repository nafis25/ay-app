import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalRefreshToken = async () => {
  try {
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    return refresh_token !== null ? refresh_token : null;
  } catch (error) {
    console.log('error retriving local refresh token');
    console.error(error);
  }
};

export const getLocalAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token !== null ? token : null;
  } catch (error) {
    console.log('error retriving local access token');
    console.log(error);
  }
};

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

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('error retriving user object');
    console.error(error);
  }
};

export const setUser = async user => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
    console.log('User Set!');
  } catch (error) {
    console.log('error setting user object');
    console.error(error);
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('User Removed!');
  } catch (error) {
    console.log('error removing user object');
    console.error(error);
  }
};

export const setUserName = async name => {
  try {
    await AsyncStorage.setItem('name', name);
    console.log('Username Set!');
  } catch (error) {
    console.log('error setting username');
    console.error(error);
  }
};

export const getUserName = async () => {
  try {
    const name = await AsyncStorage.getItem('name');
    return name !== null ? name : null;
  } catch (error) {
    console.log('error retrieving username');
    console.error(error);
  }
};

export const removeUserName = async () => {
  try {
    await AsyncStorage.removeItem('name');
    console.log('Username Removed!');
  } catch (error) {
    console.log('error removing username');
    console.error(error);
  }
};

export const setTokens = async (token, refresh_token) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
    console.log('Set both tokens');
  } catch (error) {
    console.log('error setting both token');
    console.error(error);
  }
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refresh_token');
    console.log('Removed both tokens');
  } catch (error) {
    console.log('error removing both token');
    console.error(error);
  }
};

export const setInitRoute = async route => {
  try {
    await AsyncStorage.setItem('initRoute', route);
    console.log('initRoute Set!');
  } catch (error) {
    console.log('error setting initRoute');
    console.error(error);
  }
};

export const getInitRoute = async () => {
  try {
    const route = await AsyncStorage.getItem('initRoute');
    return route !== null ? route : null;
  } catch (error) {
    console.log('error retrieving initRoute');
    console.error(error);
  }
};

export const removeInitRoute = async () => {
  try {
    await AsyncStorage.removeItem('initRoute');
    console.log('initRoute Removed!');
  } catch (error) {
    console.log('error removing initRoute');
    console.error(error);
  }
};

export const setIsOnboarded = async () => {
  try {
    await AsyncStorage.setItem('isOnboarded', 'true');
    console.log('isOnboarded Set!');
  } catch (error) {
    console.log('error setting isOnboarded');
    console.error(error);
  }
};

export const getIsOnboarded = async () => {
  try {
    const isOnboarded = await AsyncStorage.getItem('isOnboarded');
    return isOnboarded !== null ? true : false;
  } catch (error) {
    console.log('error retrieving isOnboarded');
    console.error(error);
    return true;
  }
};
