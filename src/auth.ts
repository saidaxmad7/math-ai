import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

import { verifyPassword } from "@/lib/auth/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    trustHost: true,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [
                  Google({
                      clientId: process.env.GOOGLE_CLIENT_ID,
                      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                  }),
              ]
            : []),
        Credentials({
            id: "credentials",
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Parol", type: "password" },
            },
            async authorize(credentials) {
                const email = (credentials?.email as string)?.trim().toLowerCase();
                const password = credentials?.password as string | undefined;

                if (!email || !password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValid = verifyPassword(password, user.password);
                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || "USER";
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = (token.id as string) || session.user.id;
                session.user.role = (token.role as "USER" | "ADMIN") || "USER";
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
});