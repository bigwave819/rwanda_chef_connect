// /lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma"; // your prisma client
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
  useSecureCookies: process.env.NODE_ENV === "production",
  defaultCookieAttributes: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // Allow additional user fields (so metadata.role is accepted and persisted).
  // NOTE: exact shape depends on Better Auth version; this is the generic
  // "additional fields" pattern — adjust if your better-auth version requires a different key.
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
    },
  },

  plugins: [
    admin({
      adminRoles: ["ADMIN"],
      defaultRole: "CUSTOMER",
    }),
    nextCookies(),
  ],
});
