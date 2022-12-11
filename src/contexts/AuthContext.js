import axios from 'axios';
import {createContext, useReducer, useMemo} from 'react';
import {locationApi, getStats} from '../requests/AuthRequests';
import {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
  removeTokens,
  setUserName,
  setTokens,
  removeUserName,
  removeInitRoute,
} from '../requests/TokenHandler';

const initialState = {
  user: null,
  authLoading: true,
  isSignout: false,
  isLoggedIn: false,
  location: {
    loading: false,
    error: null,
    geo: {},
  },
  leaderboard: [],
  stats: {
    loading: false,
    error: null,
    scholarship_count: null,
    school_count: null,
    user_count: null,
  },
  stock: 999,
};

const AuthContext = createContext({
  ...initialState,
  checkAuth: async () => {},
  login: async userData => {},
  logout: async () => {},
  getSiteData: () => {},
  getLocation: () => {},
});

const authReducer = (state, {payload, type}) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isSignout: false,
        user: payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isSignout: true,
        user: null,
        isLoggedIn: false,
        stats: {
          ...state.stats,
          loading: false,
        },
      };
    case 'AUTH_LOADING':
      return {
        ...state,
        authLoading: true,
      };
    case 'AUTH_FINISH':
      return {
        ...state,
        authLoading: false,
      };
    case 'LOCATION_LOADING':
      return {
        ...state,
        location: {
          ...state.location,
          loading: true,
        },
      };
    case 'LOCATION_LOAD_SUCCESS':
      return {
        ...state,
        location: {
          ...state.location,
          loading: false,
          geo: payload,
        },
      };
    case 'LOCATION_LOAD_ERROR':
      return {
        ...state,
        location: {
          ...state.location,
          loading: false,
          error: payload,
        },
      };
    case 'STATS_LOADING':
      return {
        ...state,
        stats: {
          ...state.stats,
          loading: true,
        },
      };
    case 'STATS_LOAD_SUCCESS':
      return {
        ...state,
        leaderboard: payload.leaderboard,
        stats: {
          ...state.stats,
          loading: false,
          scholarship_count: payload.scholarship_count,
          school_count: payload.school_count,
          user_count: payload.user_count,
        },
        stock: payload.stock,
      };
    case 'STATS_LOAD_ERROR':
      return {
        ...state,
        stats: {
          ...state.stats,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = async () => {
    dispatch({type: 'AUTH_LOADING'});
    let token = await getLocalAccessToken();
    let user_obj = await getUser();
    if (token && user_obj) dispatch({type: 'LOGIN', payload: user_obj});
    dispatch({type: 'AUTH_FINISH'});
  };

  const login = async userData => {
    return new Promise((resolve, _) => {
      const {refresh_token, token, user} = userData;
      dispatch({type: 'LOGIN', payload: user});
      setTokens(token, refresh_token);
      setUser(user);
      setUserName(user.name.split(' ')[0]);
      resolve('done');
    });
  };

  const logout = async () => {
    return new Promise((resolve, _) => {
      dispatch({type: 'LOGOUT'});
      removeTokens();
      removeUser();
      removeUserName();
      removeInitRoute();
      resolve('done');
    });
  };

  const getSiteData = () => {
    dispatch({type: 'STATS_LOADING'});
    getStats()
      .then(response => {
        dispatch({type: 'STATS_LOAD_SUCCESS', payload: response.data});
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        if (error.response)
          dispatch({
            type: 'STATS_LOAD_ERROR',
            payload: {
              type: 'stats_not_found',
              details: error.response ? error.response.data : null,
            },
          });
        else
          dispatch({
            type: 'STATS_LOAD_ERROR',
            payload: {
              type: 'stats_not_found',
              details: 'server down',
            },
          });
      });
  };

  const getLocation = () => {
    dispatch({type: 'LOCATION_LOADING'});
    axios
      .get(locationApi)
      .then(response => {
        dispatch({type: 'LOCATION_LOAD_SUCCESS', payload: response.data});
        console.log(response);
      })
      .catch(error => {
        dispatch({
          type: 'LOCATION_LOAD_ERROR',
          payload: {
            type: 'location_not_found',
            details: error.response ? error.response.data : null,
          },
        });
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isSignout: state.isSignout,
        authLoading: state.authLoading,
        location: state.location,
        leaderboard: state.leaderboard,
        stats: state.stats,
        stock: state.stock,
        checkAuth,
        login,
        logout,
        getSiteData,
        getLocation,
      }}
      {...props}
    />
  );
};

export {AuthContext, AuthProvider};
