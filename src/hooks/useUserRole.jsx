import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxoisSecure";
import { AuthContext } from "../context/AuthContext";



const useUserRole = () => {
  const { user, roleLoading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: role ="student",
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email && !authLoading,
    
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role; // e.g., 'admin', 'teacher', or 'student'
    },
  });

  return { role: role, refetch, roleLoading: isLoading, error: isError ? error : null };
};

export default useUserRole;
