import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      phoneNumber?: string;
    } & DefaultSession["user"];
  }

  interface User {
    phoneNumber?: string; // Add phoneNumber property
  }

  interface Session {
    user: User; // Ensure session.user includes the extended User type
  }
}
