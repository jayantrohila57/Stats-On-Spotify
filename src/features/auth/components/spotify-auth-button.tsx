"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

type SpotifyAuthButtonProps = {
  className?: string;
  size?: "default" | "sm" | "lg";
};

export function SpotifyAuthButton({ className, size = "default" }: SpotifyAuthButtonProps) {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Button
        type="button"
        variant="spotify"
        size={size}
        className={className}
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <LogOut />
        Log out of Spotify
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="spotify"
      size={size}
      className={className}
      onClick={() => signIn("spotify", { callbackUrl: "/" })}
    >
      <LogIn />
      Log in with Spotify
    </Button>
  );
}
