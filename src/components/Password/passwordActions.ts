/** @format */
"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
import prisma from "../../../lib/prisma";

// export const checkPasswordResetTokenExpiry = async (token: string) => {
//   try {
//     const resetToken = await prisma.passwordResetToken.findUnique({
//       where: {
//         token: token,
//       },
//     });

//     if (!resetToken) {
//       return { error: "No reset token found" };
//     }

//     const currentTime = new Date();
//     if (resetToken.expiredAt && currentTime > resetToken.expiredAt) {
//       return { error: "Reset token has expired" };
//     }

//     return { success: "Reset token is valid", token: resetToken.token };
//   } catch (error) {
//     console.error("Error checking token expiry:", error);
//     return { error: "An error occurred while checking token expiry" };
//   }
// };

// export const resetPassword = async (passwordDetail: string) => {
//   if (!passwordDetail) return { error: "Something went wrong" };
//   const { token, userNewPassword } = JSON.parse(passwordDetail);
//   try {
//     const existingUser = await prisma.passwordResetToken.findUnique({
//       where: {
//         token: token,
//       },
//     });

//     if (existingUser) {
//       const decodedToken = decodeToken(token);

//       if (decodedToken?.email) {
//         const exisitngUser = await prisma.auth.findFirst({
//           where: {
//             userEmail: decodedToken.email,
//           },
//         });
//         if (exisitngUser && token) {
//           const hashedPassword = await bcrypt.hash(userNewPassword, 12);

//           // Update the user's password in the database
//           const updatedUser = await prisma.auth.update({
//             where: {
//               userId: exisitngUser?.userId,
//             },
//             data: {
//               userPassword: hashedPassword,
//             },
//           });

//           const deletedToken = await prisma.passwordResetToken.delete({
//             where: {
//               token: token,
//               userEmail: exisitngUser?.userEmail || "",
//             },
//           });
//           console.log("Reached", updatedUser);
//           if (updatedUser && deletedToken) {
//             return { success: "Password created successfully" };
//           } else {
//             return { error: "Failed to update password" };
//           }
//         } else {
//           return { error: "Invalid user" };
//         }
//       } else {
//         return { error: "Invalid token" };
//       }
//     } else {
//       return { error: "Token is expired, generate new" };
//     }
//   } catch (error: any) {
//     return { error: "Unable to decode token" };
//   }
// };

export const changePassword = async (passwordDetail: string) => {
  if (!passwordDetail) return { error: "Something went wrong" };
  const { userId, oldPassword, userNewPassword } = JSON.parse(passwordDetail);
  try {
    const exisitngUser = await prisma.auth.findFirst({
      where: {
        userId: userId,
      },
    });
    if (exisitngUser) {
      const passwordsMatch = await bcrypt.compare(
        oldPassword,
        exisitngUser.userPassword
      );
      if (passwordsMatch) {
        const hashedPassword = await bcrypt.hash(userNewPassword, 12); // Update the user's password in the database
        const updatedUser = await prisma.auth.update({
          where: {
            userId: exisitngUser?.userId,
          },
          data: {
            userPassword: hashedPassword,
          },
        });

        if (updatedUser) {
          return { success: "Password created successfully" };
        } else {
          return { error: "Faield to update password" };
        }
      } else {
        return { error: "Old password doesnot match" };
      }
    } else {
      return { error: "Invalid user" };
    }
  } catch (error: any) {
    return { error: "Unable to decode token" };
  }
};

// export const forgotPassword = async (userEmail: string) => {
//   try {
//     if (!userEmail) return { error: "Something went wrong" };

//     const existingUser = await prisma.auth.findFirst({
//       where: {
//         userEmail: userEmail.toLowerCase(),
//       },
//     });
//     if (!existingUser?.userEmail) {
//       return { error: "Email not found" };
//     }

//     if (existingUser.userEmail) {
//       const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
//       const token = generateSignedTokenAdmin(existingUser.userEmail);
//       try {
//         const exisitngRequest = await prisma.passwordResetToken.findUnique({
//           where: {
//             userEmail: existingUser.userEmail,
//           },
//         });
//         if (exisitngRequest) {
//           await prisma.passwordResetToken.update({
//             where: {
//               userEmail: existingUser.userEmail,
//             },
//             data: {
//               token: token,
//               userEmail: existingUser.userEmail,
//               expiredAt: expiryDate,
//             },
//           });
//         } else {
//           await prisma.passwordResetToken.create({
//             data: {
//               token: token,
//               userEmail: existingUser.userEmail,
//               expiredAt: expiryDate,
//             },
//           });
//         }

//         const resetLink = await generateResetLink(
//           existingUser.userEmail,
//           token
//         );
//         const result = await sendResetEmail(existingUser.userEmail, resetLink);
//         if (result) {
//           return { success: "Password reset link sent successfully" };
//         } else {
//           return { error: "Failed to send password reset link" };
//         }
//       } catch (error) {
//         console.error("Failed to send verification email:", error);
//         // Handle the error accordingly
//       }
//     }
//   } catch (error) {
//     return { error: "Failed to create user" };
//   }
// };

const generateSignedTokenAdmin = (email: string): string => {
  const secretKey = process.env.SECRET;
  if (secretKey) {
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1d" }); // Expires in one day
    return token;
  }

  return "";
};

const generateResetLink = (email: string, token: string) => {
  // Construct the verification link with a token or identifier (replace 'abc123' with your token)
  const verificationLink = `${process.env.BASE_URL}/resetpassword?token=${token}`;
  return verificationLink;
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

export async function sendResetEmail(email: string, resetLink: string) {
  try {
    // Create a nodemailer transporter using your email service settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      service: "Gmail", // Change this to your email service provider
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Define email options
    const mailOptions = {
      from: '"Ichhihana Learning Portal" <noreply@ichhihanalearn.com>',
      to: email,
      subject: "Reset Your Ichhihana Learning Portal Password",
      html: `
        <body style="font-family: Arial; font-size: 14px;">
          <header style="background: #4CAF50; padding: 8px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: #fff;">Ichhihana Learning Portal</h1>
          </header>
          <main style="padding: 16px;">
            <h2 style="color: #4CAF50;">Reset Your Password</h2>
            <p>
              We received a request to reset the password for your Ichhihana Learning Portal account. Please click the button below to reset your password:
            </p>  
            <a 
              href="${resetLink}"
              style="background: #4CAF50; color: white; padding: 8px 12px; border-radius: 4px; text-decoration: none;"  
            >
              Reset Password
            </a>
            <p style="color: #777;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
          </main>
    
          <footer style="background: #333; color: white; padding: 8px; text-align: center;">
            Copyright © ${new Date().getFullYear()} InPro Solutions Pvt. Ltd.
          </footer>
        </body>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    if (info.accepted) {
      return true;
    } else {
      return false;
    }
    //console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
}
