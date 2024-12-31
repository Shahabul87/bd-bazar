import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const user = await currentUser();
    const {
      name,
      platform,
      url,
      category,
      dateOfSubscription,
      endOfSubscription,
      cardUsed,
      amount,
    } = await req.json();

    // Check if the user is authenticated
    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for subscription creation
    if (!name || !platform || !url || !dateOfSubscription || !endOfSubscription || !cardUsed || !amount) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create a new subscription in the database
    const newSubscription = await db.subscription.create({
      data: {
        name,
        platform,
        url,
        category,
        dateOfSubscription: new Date(dateOfSubscription),
        endOfSubscription: new Date(endOfSubscription),
        cardUsed,
        amount,
        userId: user.id, // Associate subscription with the current user
      },
    });

    // Return the newly created subscription information
    return new NextResponse(JSON.stringify(newSubscription), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("[POST ERROR] Subscription Creation:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
