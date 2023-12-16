import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructorClasses = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: instructorclasses = [],
    isLoading: isLoadingClasses,
    refetch,
  } = useQuery({
    queryKey: ["instructorclasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/instructor/${user?.email}`);
      return res.data;
    },
  });
  return [instructorclasses, isLoadingClasses, refetch];
};

export default useInstructorClasses;
