/* eslint-disable new-cap */
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "lib/mongodb";

export default NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Passwordless / email sign in
  ],
  pages: {
    signIn: "/signin",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  useSecureCookies: process.env.NODE_ENV === "production",
  //   callbacks: {
  //     async jwt(token, account) {
  //       if (account?.accessToken) {
  //         token.accessToken = account.accessToken;
  //       }
  //       return token;
  //     },
  //     redirect: async (url, _baseUrl) => {
  //       if (url === "/profile") {
  //         return Promise.resolve("/");
  //       }
  //       return Promise.resolve("/");
  //     },
  //   },
});
