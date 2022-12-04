import api from "./api";

export const authRoutes = {
   getOtp: "/auth/get-otp/",
   verifyOtp: "/auth/token-auth/otp",
   signUp: "/auth/signup/",
   userCreate: "/auth/users/create/",
   userUpdate: "/auth/users/update/",
   activeScholarships: "/scholarship/api/all-active-scholarship-list",
   searchScholarships: "/scholarship/api/search-active-scholarship-list",
   getInviteInfo: "/auth/referral/list/",
   getStats: "/scholarship/api/webstat-info/",
   locationApi:
      "https://ipgeolocation.abstractapi.com/v1/?api_key=7f7b04013f484f0396ccecde1ea904b6",
};

export const getOtp = (data) => {
   return api.post(authRoutes.getOtp, data);
};

export const verifyOtp = (data) => {
   return api.post(authRoutes.verifyOtp, data);
};

export const signUp = (data) => {
   return api.post(authRoutes.signUp, data);
};

export const userCreate = (data) => {
   return api.post(authRoutes.userCreate, data);
};

export const userUpdate = (data) => {
   return api.post(authRoutes.userUpdate, data);
};

export const getInviteInfo = (data) => {
   return api.post(authRoutes.getInviteInfo, data);
};

export const searchScholarships = (user_id) => {
   return api.get(authRoutes.searchScholarships, {
      params: { userid: user_id },
   });
};

export const activeScholarships = (page_no) => {
   return api.get(authRoutes.activeScholarships, {
      params: { page: page_no },
   });
};

export const activeScholarshipsSSR = async ({ pageParam = 1 }) => {
   const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
         authRoutes.activeScholarships +
         `?page=${pageParam}`
   );
   if (!response.ok) {
      throw new Error("Network response was not ok");
   }
   return response.json().then((data) => ({ data }));
};

export const getStats = () => {
   return api.get(authRoutes.getStats);
};

export const getStatsSSR = async () => {
   const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + authRoutes.getStats
   );

   if (!response.ok) {
      throw new Error("Network response was not ok");
   }
   return response.json().then((data) => ({ data }));
};

export const getLocation = () => {
   return api.get(authRoutes.locationApi);
};

export const getLocationSSR = async () => {
   const response = await fetch(locationApi);

   if (!response.ok) {
      throw new Error("Network response was not ok");
   }
   return response.json().then((data) => ({ data }));
};

export const locationApi = authRoutes.locationApi;
