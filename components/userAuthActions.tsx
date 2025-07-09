"use client";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

// login with google
export const SignWithGoogle = () => {
  const [loading, setLoading] = useState(false);

  const handleSignWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        toast.error("Impossible de se connecter !");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error(error);
      toast.error("Impossible de se connecter !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignWithGoogle}
      disabled={loading}
      className="w-full"
    >
      <FcGoogle />
      <span className="text-sm">Continue avec Google</span>
    </Button>
  );
};

export const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("impossible de se deconnecter!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={"destructive"}
      onClick={handleSignOut}
      disabled={loading}
      className="w-full"
    >
      <Trash2 />
      <span>Deconnexion</span>
    </Button>
  );
};
