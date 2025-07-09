"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUser = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(undefined);
    }
  }, [session]); // <-- ici on écoute les changements de session

  return { user, setUser };
};
