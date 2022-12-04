import api from "./api";
import axios from "axios";
// "https://api.npoint.io/89dcc5f5471a511ca55a"

export const portalRoutes = {
   getCurrentUser: "/auth/current_user/",
   getUserDetails: "/api/auth/user/",
   getScholarshipInfo: "/scholarship/api/scholarship-info-list/",
   assignStudent: "/payment/assign-students/",
   redirectInvoice: "/payment/pending/",
   saveBkash: "/pay/bkash/agreement/create/",
   payBkash: "/pay/bkash/payment/create/",
   deleteBkash: "/pay/bkash/agreement/cancel/",
   checkBkash: "/pay/bkash/agreement/check/",
   cancelCard: "/pay/card/recurring/local/cancel/all/",
   payMonthly: "/payment/monthly/",
   dropStudent: "/payment/drop-student/",
   generateScreenshot: "/scholarship/generate-screenshot",
   userRequest: "/scholarship/api/create-user-request/",
   studentRequest: "/payment/api/save-request-for-students/",
   stripePortal: "/subscription/stripe-get-customer-portal/",
   getScreenshots: "/payment/api/invoice/student-screenshots/",
   addReferral: "/auth/referral/add/",
   getNotifications: "/auth/api/get-user-notifications/",
   updateNotifications: "/auth/api/update-notification-status/",
};

export const getCurrentUser = () => {
   return api.get(portalRoutes.getCurrentUser);
};

export const getUserDetails = () => {
   return api.get(portalRoutes.getUserDetails);
};

export const getUserDetailsSSR = (token) => {
   return axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + portalRoutes.getUserDetails,
      {
         headers: { Authorization: `JWT ${token}` },
      }
   );
};

export const getScholarshipInfo = () => {
   return api.get(portalRoutes.getScholarshipInfo);
};

export const getScholarshipInfoSSR = async (token) => {
   const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + portalRoutes.getScholarshipInfo,
      {
         headers: { Authorization: `JWT ${token}` },
      }
   );

   if (!response.ok) {
      throw new Error("Network response was not ok");
   }
   return response.json().then((data) => ({ data }));
};

export const assignStudent = (data) => {
   return api.post(portalRoutes.assignStudent, data);
};

export const redirectInvoice = (data) => {
   return api.post(portalRoutes.redirectInvoice, data);
};

export const saveBkash = () => {
   return api.post(portalRoutes.saveBkash, {});
};

export const payBkash = () => {
   return api.post(portalRoutes.payBkash, {});
};

export const deleteBkash = () => {
   return api.post(portalRoutes.deleteBkash, {});
};

export const checkBkash = () => {
   return api.get(portalRoutes.checkBkash);
};

export const cancelCard = (data) => {
   return api.post(portalRoutes.cancelCard, data);
};

export const payMonthly = (data) => {
   return api.post(portalRoutes.payMonthly, data);
};

export const dropStudent = (data) => {
   return api.post(portalRoutes.dropStudent, data);
};

export const generateScreenshot = (data) => {
   return api.post(portalRoutes.generateScreenshot, data);
};

export const userRequest = (data) => {
   return api.post(portalRoutes.userRequest, data);
};

export const studentRequest = (data) => {
   return api.post(portalRoutes.studentRequest, data);
};

export const stripePortal = () => {
   return api.post(portalRoutes.stripePortal);
};

export const getScreenshots = (data) => {
   return api.post(portalRoutes.getScreenshots, data);
};

export const getScreenshotsSSR = (token, data) => {
   return axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL + portalRoutes.getScreenshots,
      data,
      {
         headers: { Authorization: `JWT ${token}` },
      }
   );
};

export const addReferral = (data) => {
   return api.post(portalRoutes.addReferral, data);
};

export const getNotifications = () => {
   return api.get(portalRoutes.getNotifications);
};

export const updateNotifications = (data) => {
   return api.post(portalRoutes.updateNotifications, data);
};
