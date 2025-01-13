/** @format */

import nodemailer from "nodemailer";

// Function to send verification email
export async function sendVerificationEmail(
  email: string,
  verificationLink: string
) {
  console.log("verificationLink", verificationLink);
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
      from: '"शहीद लखन गाउँपालिका" <noreply@sahidlakhanmun.gov.np>',
      to: email,
      subject: "Verify Your Email for शहीद लखन गाउँपालिका किसान चौतारी",
      html: `
        <body style="font-family: Arial; font-size: 14px;">
          <header style="background: #4caf50; padding: 8px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: white;">शहीद लखन गाउँपालिका</h1>
            <h2 style="margin: 0; font-size: 20px; color: white;">किसान चौतारी</h2>
          </header>
          <main style="padding: 16px;">
            <h2 style="color: #4caf50;">Verify Your Email</h2>
            <p>
              Thank you for registering with शहीद लखन गाउँपालिका किसान चौतारी. Please click the button below to verify your email address:
            </p>  
            <a 
              href="${verificationLink}"
              style="background: #4caf50; color: white; padding: 8px 12px; border-radius: 4px; text-decoration: none;"  
            >
              Verify Email
            </a>
            <p style="color: #777;">
              If you didn't request this verification, you can safely ignore this email. 
            </p>
          </main>
      
          <footer style="background: #333; color: white; padding: 8px; text-align: center;">
            Copyright © ${new Date(
              new Date().getTime() + 5.75 * 60 * 60 * 1000
            ).getFullYear()} शहीद लखन गाउँपालिका
          </footer>
        </body>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      return false;
    }
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
}
