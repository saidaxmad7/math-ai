import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    trustHost: true,
    session: {
        strategy: "jwt",
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            id: "credentials",
            name: "Email orqali",
            credentials: {
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {
                const email =
                    (credentials?.email as string)?.trim().toLowerCase() ||
                    "student@example.com";

                let user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email,
                            name: email.split("@")[0],
                            role: email.includes("admin") ? "ADMIN" : "USER",
                        },
                    });
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