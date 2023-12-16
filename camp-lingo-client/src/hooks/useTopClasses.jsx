import { useQuery } from "@tanstack/react-query";

const useTopClasses = () => {
  const {
    data: topClasses = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["topClasses"],
    queryFn: async () => {
      const res = await fetch(
        "https://camp-lingo-server-topurayhan007.vercel.app/classes/popular"
      );
      return res.json();
    },
  });
  return [topClasses, loading, refetch];
};

export default useTopClasses;
