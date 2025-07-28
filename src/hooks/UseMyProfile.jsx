import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxoisSecure";


const useMyProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      return res.data;
    },
  });

  return { profile, isLoading };
};

export default useMyProfile;
