import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GitlabProvder from "next-auth/providers/gitlab"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitlabProvder({
      clientId: process.env.GITLAB_CLIENT_ID as string,
    clientSecret: process.env.GITLAB_CLIENT_SECRET as string
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
