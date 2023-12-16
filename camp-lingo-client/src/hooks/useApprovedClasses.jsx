import { useQuery } from "@tanstack/react-query";

const useApprovedClasses = () => {
  const {
    data: approvedClasses = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await fetch(
        "https://camp-lingo-server-topurayhan007.vercel.app/classes/approved"
      );
      return res.json();
    },
  });
  return [approvedClasses, loading, refetch];
};

export default useApprovedClasses;
