/** @format */

"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DOMPurify from "isomorphic-dompurify";
import prisma from "@/lib/auth/prisma";
import { sendVerificationEmail } from "../../../util/mailer/mailer";
interface RegisterSchema {
  adminEmail: string;
  adminPassword: string;
  name: string;
  adminPhone: string;
}

export const registerUser = async ({
  adminEmail,
  adminPassword,
  name,
  adminPhone,
}: RegisterSchema) => {
  console.log("data", adminEmail, adminPassword, name, adminPhone);
  try {
    if (!adminPassword || !name || !adminEmail || !adminPhone) {
      return { error: "Missing required fields" };
    }

    // Sanitize input data
    const sanitizedCompanyEmail = DOMPurify.sanitize(adminEmail);
    const sanitizedPassword = DOMPurify.sanitize(adminPassword);
    const sanitizedCompanyName = DOMPurify.sanitize(name);
    const sanitizedCompanyPhone = DOMPurify.sanitize(adminPhone);

    console.log("companyEmail", sanitizedCompanyEmail);

    // Check for existing user
    const existingUser = await prisma.auth.findFirst({
      where: {
        userEmail: sanitizedCompanyEmail.toLowerCase(),
      },
    });

    if (existingUser) {
      return { error: "User already exists" };
    } else {
      const hashedPassword = await bcrypt.hash(sanitizedPassword, 12);
      console.log("hashed", hashedPassword);

      const adminAuth = await prisma.auth.create({
        data: {
          userEmail: sanitizedCompanyEmail.toLowerCase(),
          userPassword: hashedPassword,
          userName: sanitizedCompanyName,
          role: "Admin",
          userSetting: {
            create: {
              language: "en",
              fontSize: "small",
              theme: "light",
            },
          },
        },
      });

      if (adminAuth) {
        const company = await prisma.companyUser.create({
          data: {
            userId: adminAuth.userId,
            
            companyName: sanitizedCompanyName,
            companyEmail: sanitizedCompanyEmail,
            companyPhone: sanitizedCompanyPhone,
          },
        });

        if (company) {
          if (adminAuth.userEmail) {
            try {
              const verificationLink = await generateVerificationLink(
                adminAuth.userEmail
              );
              await sendVerificationEmail(
                adminAuth.userEmail,
                verificationLink
              );
              return {
                success: "User created and verification link sent successfully",
              };
            } catch (error) {
              console.error("Failed to send verification email:", error);
              return { error: "Failed to send verification email" };
            }
          } else {
            return {
              success: "Admin User created successfully",
            };
          }
        }
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user" };
  }
};

export const verifyUser = async (token: string) => {
  // const session = await getServerSession(authOptions);
  // console.log(session?.user?.role);
  // console.log(token);
  if (!token) return { error: "Something went wrong" };

  try {
    const decodedToken = decodeToken(token);

    if (decodedToken !== null && decodedToken.email) {
      const email = decodedToken?.email;
      const result = await prisma.$transaction(
        async (prisma) => {
          const existingUser = await prisma.auth.findFirst({
            where: {
              userEmail: email.toLowerCase(),
            },
          });

          if (!existingUser) {
            throw new Error("Failed to find user");
          }

          if (existingUser.validEmail) {
            return {
              success:
                "User is already verified. Please contact admin for secondary verification.",
            };
          } else {
            const updatedUser = await prisma.auth.update({
              where: {
                userId: existingUser.userId,
              },
              data: {
                validEmail: true,
                userSetting: {
                  update: {
                    initialSetup: true,
                  },
                },
              },
            });
            if (updatedUser) {
              return {
                success:
                  "Primary email verficiation successful. Secondary verification will be done by office",
              };
            } else {
              return { error: "Failed to verify email" };
            }
          }
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000
        }
      );

      if (result) {
        return { success: result.success };
      } else {
        return { error: "Unable to verfiy" };
      }
    } else {
      return { error: "Invalid Token" };
    }
  } catch (error: any) {
    return { error: "Unable to decode token" + error };
  }
};
const decodeToken = (token: string): { email?: string } | null => {
  const secretKey = process.env.SECRET || "";

  try {
    const decodedToken = jwt.verify(token, secretKey) as { email?: string };
    //console.log("decoded", decodeToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const generateSignedTokenAdmin = (email: string): string => {
  const secretKey = process.env.SECRET;
  if (secretKey) {
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1d" });
    console.log("token", token); // Expires in one day
    return token;
  }

  return "";
};
export const generateVerificationLink = async (email: string) => {
  console.log("email", email);
  // Construct the verification link with a token or identifier
  const token = await generateSignedTokenAdmin(email);
  const verificationLink = `${process.env.BASE_URL}/verify?token=${token}`;
  console.log("verificationssLink", verificationLink);
  return verificationLink;
};
