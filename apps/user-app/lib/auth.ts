import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, Session } from "next-auth";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone No.",
          type: "text",
          placeholder: "Enter your phone number",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined
      ) {
        const credentialsSchema = z.object({
          phone: z
            .string()
            .nonempty("Phone number is required")
            .length(10, "Phone number must be 10 digits"),
          password: z
            .string()
            .nonempty("Password is required")
            .min(8, "Password must be at least 8 characters"),
        });

        const validationResult = credentialsSchema.safeParse(credentials);

        if (!validationResult.success) {
          throw new Error(validationResult.error.errors[0]?.message);
        }

        const validatedCredentials = validationResult.data;

        const hashedPassword = await bcrypt.hash(
          validatedCredentials.password,
          10
        );
        const existingUser = await db.user.findFirst({
          where: {
            phoneNumber: validatedCredentials.phone,
          },
        });

        if (existingUser) {
          const isPasswordValid = await bcrypt.compare(
            validatedCredentials.password,
            existingUser.password
          );

          if (isPasswordValid) {
            return {
              id: existingUser.id.toString(),
              phoneNumber: existingUser.phoneNumber,
              name: existingUser.name,
              email: existingUser.email,
            };
          }

          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              phoneNumber: validatedCredentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            phoneNumber: user.phoneNumber,
            name: user.name,
          };
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  pages: {
    error: "/api/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.phoneNumber = token.phoneNumber as string;
      }

      return session;
    },
  },
};
