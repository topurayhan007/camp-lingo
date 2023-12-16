import { useQuery } from "@tanstack/react-query";

const useTopInstructors = () => {
  const {
    data: topInstructors = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["topInstructors"],
    queryFn: async () => {
      const res = await fetch(
        "https://camp-lingo-server-topurayhan007.vercel.app/users/instructors/popular"
      );
      return res.json();
    },
  });
  return [topInstructors, loading, refetch];
};

export default useTopInstructors;
