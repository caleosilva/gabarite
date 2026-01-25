import { useSession } from "next-auth/react";

export function useAuthClient() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return {
    session,
    isAuthenticated,
    isLoading,
    user: session?.user,
    cargo: session?.user?.cargo,
  };
}