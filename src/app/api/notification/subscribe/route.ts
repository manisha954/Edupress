/** @format */

import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/auth.config";
import prisma from "@/src/lib/auth/prisma";

export async function POST(request: NextRequest) {
  // Parse the JSON body from the request
  const { subscription } = await request.json();
  console.log(subscription);
  try {
    // Validate the store
    const session = await getServerSession(authOptions);
    console.log(session?.user?.role);
    console.log(session?.user);

    if (session?.user.role === "Farmer") {
      if (session?.user.phone) {
        const existingUser = await prisma.auth.findFirst({
          where: {
            userInPhone: session?.user.phone,
          },
        });
        if (!existingUser) {
          return new NextResponse(
            JSON.stringify({ error: "User doesnot exist" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        //   if (store.storeId && store.masterId && store.userId) {
        if (subscription) {
          // Save the subscription details in the database

          const exisitng = await prisma.pushSubscription.findUnique({
            where: {
              customerId: existingUser.userInId,
            },
          });
          if (exisitng) {
            await prisma.pushSubscription.update({
              where: {
                customerId: existingUser.userInId,
              },
              data: {
                subscriptionKey: JSON.stringify(subscription),
                lastUpdatedTimeStamp: new Date(),
              },
            });
            return new NextResponse(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } else {
            const created = await prisma.pushSubscription.create({
              data: {
                customerId: existingUser.userInId,
                subscriptionKey: JSON.stringify(subscription),
                lastUpdatedTimeStamp: new Date(),
              },
            });
            if (created) {
              // Successfully saved the subscription
              return new NextResponse(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              });
            }
          }
        } else {
          // If the store is missing necessary IDs
          return new NextResponse(
            JSON.stringify({ error: "Missing store information" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      } else {
        return new NextResponse(JSON.stringify({ error: "FInvalid user" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else if (session?.user.email) {
      const existingUser = await prisma.auth.findFirst({
        where: {
          userInEmail: session?.user.email.toLowerCase(),
        },
      });
      if (!existingUser) {
        return new NextResponse(
          JSON.stringify({ error: "User doesnot exist" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      //   if (store.storeId && store.masterId && store.userId) {
      if (subscription) {
        // Save the subscription details in the database

        const exisitng = await prisma.pushSubscription.findUnique({
          where: {
            customerId: existingUser.userInId,
          },
        });
        if (exisitng) {
          await prisma.pushSubscription.update({
            where: {
              customerId: existingUser.userInId,
            },
            data: {
              subscriptionKey: JSON.stringify(subscription),
              lastUpdatedTimeStamp: new Date(
                new Date().getTime() + 5.75 * 60 * 60 * 1000
              ),
            },
          });
          return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } else {
          const created = await prisma.pushSubscription.create({
            data: {
              customerId: existingUser.userInId,
              subscriptionKey: JSON.stringify(subscription),
              lastUpdatedTimeStamp: new Date(
                new Date().getTime() + 5.75 * 60 * 60 * 1000
              ),
            },
          });
          if (created) {
            // Successfully saved the subscription
            return new NextResponse(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
        }
      } else {
        // If the store is missing necessary IDs
        return new NextResponse(
          JSON.stringify({ error: "Missing store information" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    // Handle any other errors
    return new NextResponse(
      JSON.stringify({ error: "Failed to store subscription key" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
