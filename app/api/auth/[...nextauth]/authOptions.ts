import { NextAuthOptions } from "next-auth";
import GitlabProvder from "next-auth/providers/gitlab"

const authOptions: NextAuthOptions = {
  providers: [
    GitlabProvder({
      clientId: process.env.GITLAB_CLIENT_ID as string,
    clientSecret: process.env.GITLAB_CLIENT_SECRET as string
    }),
  ],
};

export default authOptions;