// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SECRET_KEY,
} from "./lib/envVariables";

const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const, // <-- ici le "as const" évite l'erreur de typage
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: SECRET_KEY, // Clé secrète pour sécuriser les tokens
  callbacks: {
    // Optionnel : personnaliser les callbacks si besoin (ex: session, jwt)
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
