import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth(roleRequired?: "admin") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
  }, [status, session, router, roleRequired]);

  return { session, status };
}