import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; subscriptionId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the subscription exists and belongs to the current user
    const subscription = await db.subscription.findUnique({
      where: {
        id: params.subscriptionId,
      },
    });

    if (!subscription || subscription.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the subscription
    const deletedSubscription = await db.subscription.delete({
      where: {
        id: params.subscriptionId,
      },
    });

    return NextResponse.json(deletedSubscription);
  } catch (error) {
    console.error("[DELETE_SUBSCRIPTION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; subscriptionId: string } }
) {
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

    // Validate required fields for subscription update
    if (!name || !platform || !url || !dateOfSubscription || !endOfSubscription || !cardUsed || amount == null) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if the subscription exists and belongs to the current user
    const subscription = await db.subscription.findUnique({
      where: { id: params.subscriptionId },
    });

    if (!subscription || subscription.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Update the existing subscription in the database
    const updatedSubscription = await db.subscription.update({
      where: { id: params.subscriptionId },
      data: {
        name,
        platform,
        url,
        category,
        dateOfSubscription: new Date(dateOfSubscription),
        endOfSubscription: new Date(endOfSubscription),
        cardUsed,
        amount,
      },
    });

    // Return the updated subscription information
    return new NextResponse(JSON.stringify(updatedSubscription), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PATCH ERROR] Subscription Update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
