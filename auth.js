import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          const client = await clientPromise;
          const db = client.db("departmentOfCSE");

          const admin = await db.collection("admins").findOne({ email: credentials.email });
          
          if (!admin) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            admin.hashedPassword
          );

          if (passwordsMatch) {
            return {
              id: admin._id.toString(),
              email: admin.email,
              role: "admin"
            };
          }
          
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
