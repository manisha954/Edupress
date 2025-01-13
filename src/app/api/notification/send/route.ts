/** @format */

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";

export async function POST(request: NextRequest) {
  // Parse the JSON body from the request
  const { subscription, title, body, url } = await request.json();
  console.log(subscription, title);
  // Set VAPID details
  webPush.setVapidDetails(
    "mailto:shresthabijay1@gmail.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!
  );

  // Define the notification payload
  // const payload = JSON.stringify({
  //   title,
  //   options: { body, icon: "/logo.png" }, // Customize as needed
  // });
  const payload = JSON.stringify({
    title,
    body: body,
    url: url ?? "/dashboard",
    icon: process.env.LOGO_URL, // URL of the icon
  });
  try {
    // Send the notification
    console.log("first push");
    const response = await webPush.sendNotification(subscription, payload);
    console.log("first push", response);

    // Check if the notification was sent successfully
    if (response.statusCode >= 200 && response.statusCode < 300) {
      // Save the notification details in the database
      console.log("Success");
      // await prisma.notificationTable.create({
      //   data: {
      //     notificationTitle: title,
      //     notificationbody: body,

      //     // createdAt: new Date(new Date().getTime() +5.75 * 60 * 60 * 1000),
      //   },
      // });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Handle unsuccessful send
      return new NextResponse(
        JSON.stringify({
          error: "Notification send failed",
          statusCode: response.statusCode,
        }),
        {
          status: response.statusCode,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    // Log the error and return a failure response
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
