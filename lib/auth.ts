import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { nextCookies } from 'better-auth/next-js';
import { admin } from "better-auth/plugins/admin";

const adminRoles = 'admin'
const userRoles = 'user'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:3000'],
  useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production'
    },
  plugins: [
    admin({
      adminRoles: [adminRoles],
      defaultRole: userRoles,
    }),
    nextCookies()
  ]
});
