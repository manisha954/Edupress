/** @format */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { z } from "zod";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";
import prisma from "./prisma";

async function getUserByEmail(email: string): Promise<User | null> {
  3;
  console.log("email", email);
  const user = await prisma.auth.findFirst({
    where: {
      userEmail: email.toLowerCase(),
    },
  });

  if (user) {
    const userData: User = {
      email: user.userEmail,
      name: user.userName,
      password: user.userPassword,
      role: user.role,
      id: user.userId,
      isVerified: user.userIsVerify,
      isRejected: user.userIsRejected,
    };
    console.log("userData", userData);
    return userData;
  } else {
    return null;
  }
}

async function getUser(login: string): Promise<User | null> {
  try {
    return await getUserByEmail(login);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Email or Phone:", type: "text" },
        password: { label: "Password:", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            login: z.string(),
            password: z.string().min(2),
          })
          .safeParse(credentials);

        console.log("parsed", parsedCredentials);
        if (parsedCredentials.success) {
          const { login, password } = parsedCredentials.data;

          const user = await getUser(login);
          console.log("user", user);
          if (!user) {
            throw new Error("User not found. Please enter valid credentials");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            if (user.isRejected) {
              throw new Error(
                "You are not authorized to login. Please contact the admin department"
              );
            }

            return {
              ...user,

              role: user.role,
              email: user.email,
              phone: user?.phone,
              name: user.name,
              isVerified: user.isVerified,
            };
          } else {
            throw new Error("Password is incorrect");
          }
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account && account.provider === "google") {
        // console.log("fff", user?.email);
        return true;
      }

      return true;
    },
    async jwt({ token, account, user }) {
      if (user && user.role) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.phone = user.phone;
        token.name = user.name;
        token.isVerified = user.isVerified;
      }
      console.log("token", token);

      if (account && account.provider === "google") {
        if (user.email) {
          const existingCustomer = await prisma.auth.findFirst({
            where: {
              userEmail: user?.email,
            },
          });

          if (existingCustomer?.userEmail) {
            // Check both userInfo and studentInfo
            const existingUser = await prisma.auth.findFirst({
              where: {
                userEmail: existingCustomer?.userEmail,
              },
            });

            console.log("existingEmployee", existingUser);

            if (!existingUser) {
              // User does not exist in both userInfo and studentInfo, create new record in auth table
              const newUser = await prisma.auth.create({
                data: {
                  userEmail: existingCustomer?.userEmail,
                  userName: existingCustomer?.userName,
                  userPassword: "",
                  validEmail: true,
                  userIsVerify: true,

                  role: "User", // Default role as Guest
                },
              });

              if (newUser.userId) {
                // Set token data
                token.userEmail = newUser.userEmail;
                token.role = "Guest";
                token.isVerified = newUser.userIsVerify;
                token.id = newUser.userId;
              }
            }
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.role && token.id) {
        session.user.id = token.id || "";
        session.user.role = token.role;
        session.user.email = token.email || "";
        session.user.phone = (token?.phone as string) || "";
        session.user.isVerified = token.isVerified;
      }
      console.log(session, "session");
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl, "url,baseUrl");
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
};

// export const getAuthenticatedUser = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return null;
//   }

//   // The user object is available in the session
//   const user = session.user;

//   return user;
// };
