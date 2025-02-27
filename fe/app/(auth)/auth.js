import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            console.log(response);
            console.error("Failed to fetch user:", response.statusText);
            return null;
          }

          const { user, token, refreshToken } = await response.json();
          // console.log("User new", user);

          if (!user) {
            throw new Error("User not found.");
          }

          return { user, token, refreshToken };
        } catch (error) {
          console.error("Error during user authorization:", error);
          throw new Error("Internal server error.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log("JWT", user)
      if (user) {
        token.sub = user.user.id;
        token.email = user.user.email;
        token.name = user.user.name;
        token.dataStatus = user.user?.dataStatus;
        token.accessToken = user.token;
        token.business = user.user?.business || undefined;
      }
      // console.log(token);
      if (trigger === "update" && session) {
        // Validate session data before using it
        token.business = session.business;
        return token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.dataStatus = token.dataStatus;
        session.business = token.business;
        session.accessToken = token.accessToken;
      }
      // console.log(session);
      return session;
    },
  },
});
