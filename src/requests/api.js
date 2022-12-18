import {base_url as _baseURL} from '../config';
import axios from 'axios';
import {portalRoutes} from './PortalRequests';
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
} from './TokenHandler';

const instance = axios.create({
  baseURL: _baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await getLocalAccessToken();

    if (token && Object.values(portalRoutes).includes(config.url))
      config.headers['Authorization'] = 'JWT ' + token;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;
    if (
      err.response.status === 401 &&
      originalConfig.url.includes('auth/token-auth/refresh')
    )
      // Access Token was expired
      return Promise.reject(err);

    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const rs = await instance.post('auth/token-auth/refresh', {
          token: await getLocalRefreshToken(),
        });

        const {token} = rs.data;
        await updateLocalAccessToken(token);

        return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
