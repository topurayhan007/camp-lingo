import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStudentEnrolled = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: studentEnrolledClasses = [],
    isLoading: isLoadingEnrolled,
    refetch,
  } = useQuery({
    queryKey: ["studentEnrolledClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
  });
  return [studentEnrolledClasses, isLoadingEnrolled, refetch];
};

export default useStudentEnrolled;
