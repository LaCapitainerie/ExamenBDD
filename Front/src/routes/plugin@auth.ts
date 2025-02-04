import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // session: {
  //   strategy: 'jwt',
  // },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: "repo read:user user:email" },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) {
        throw new Error('No user email')
      }

      if (!account?.access_token) {
        throw new Error('No access token')
      }

      const data : any = profile
      
      try {

        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          update: {
            email: user.email,
            name: user.name || "",
            image: user.image || data?.avatar_url,
          },
          create: {
            email: user.email,
            name: user.name || "",
            image: user.image || data?.avatar_url,
          },
        });

        const accountExists = await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {
            username: data?.login,
            userId: dbUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          },
          create: {
            username: data?.login,
            userId: dbUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          },
        });

        const sessionToken = await prisma.session.create({
          data: {
            userId: dbUser.id,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set session expiration to 30 days
            sessionToken: account.access_token,
          },
        });

        // Allow sign-in
        return true;
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false; // Deny sign-in in case of an error
      }
    },

    session: async ({ session }) => {

      if (session.access_token) {
        return session
      }

      if (!session.user) {
        throw new Error('No user session')
      }

      if (!session.user.email) {
        throw new Error('No user id')
      }

      const userId = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
        },
      });

      if (!userId) {
        throw new Error('No user found')
      }

      const lastSession = await prisma.session.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          userId: userId.id,
        },
      });

      session.access_token = lastSession?.sessionToken || '';

      return session
    },
  },
}

export const handler = NextAuth(authOption)

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import { getServerSession } from "next-auth"

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [], // rest of your config
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}