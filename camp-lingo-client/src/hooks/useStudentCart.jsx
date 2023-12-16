import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStudentCart = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: studentCart = [],
    isLoading: isLoadingCart,
    refetch,
  } = useQuery({
    queryKey: ["studentCart", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/student/${user?.email}`);
      return res.data;
    },
  });
  return [studentCart, isLoadingCart, refetch];
};

export default useStudentCart;
