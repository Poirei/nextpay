"use client";

import { AppBar } from "@repo/ui/app-bar";
import { signIn, signOut, useSession } from "next-auth/react";

export const AppbarClient = () => {
  const session = useSession();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <AppBar
        onSignIn={signIn}
        onSignOut={handleSignOut}
        user={session?.data?.user}
      />
    </div>
  );
};
