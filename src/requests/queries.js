import { useInfiniteQuery, useQuery } from "react-query";
import { activeScholarshipsSSR, getLocation, getStats } from "./AuthRequests";
import { getNotifications, getScholarshipInfo } from "./PortalRequests";

export const useLocation = () =>
   useQuery(["location"], getLocation, {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });

export const useSiteData = () =>
   useQuery(["sitedata"], getStats, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });

export const useActiveScholarships = () =>
   useInfiniteQuery(["activescholarships"], activeScholarshipsSSR, {
      getNextPageParam: (lastPage, _) =>
         lastPage?.data.page.has_next
            ? lastPage?.data.page.current + 1
            : undefined,
      refetchOnWindowFocus: false,
   });

export const usePortal = () =>
   useQuery(["portal"], getScholarshipInfo, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });

export const useNotifications = () =>
   useQuery(["notifications"], getNotifications, {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
   });
