"use client";

import { Button } from "./button.js";

interface AppBarProps {
  user?: {
    name?: string | null;
  };
  onSignIn: () => void;
  onSignOut: () => void;
}

export const AppBar = ({ user, onSignIn, onSignOut }: AppBarProps) => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">NextPay</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-sky-400">{user?.name}</p>
            <Button
              className="px-4 py-2 rounded-md bg-red-500/30 text-black"
              onClick={onSignOut}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            className="px-4 py-2 rounded-md bg-white text-black"
            onClick={onSignIn}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};
