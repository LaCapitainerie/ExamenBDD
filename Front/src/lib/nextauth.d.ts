import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultUser
        expires: string
        access_token: string
    }
}