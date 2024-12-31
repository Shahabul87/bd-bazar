// File: /pages/api/users/[userId]/profile-links/reorder.ts

import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: { userId: string } }
  ) {
    try {
      const user = await currentUser();
      if (!user?.id || user.id !== params.userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const { list } = await req.json();
      //console.log("Reorder list received:", list); // Log the received list
  
      // Ensure `list` is non-empty and contains `id` and `position`
      if (!Array.isArray(list) || list.length === 0) {
        return new NextResponse("Invalid data: 'list' must be a non-empty array", { status: 400 });
      }
  
      for (const item of list) {
        if (typeof item.id !== "string" || typeof item.position !== "number") {
          console.log("Invalid item in list:", item); // Log any invalid item
          return new NextResponse("Each item must have a valid 'id' (string) and 'position' (number)", { status: 400 });
        }
      }
  
      const updatePromises = list.map((item) =>
        db.profileLink.update({
          where: { id: item.id },
          data: { position: item.position },
        })
      );
  
      const result = await db.$transaction(updatePromises);
      //console.log("Database update result:", result); // Log the result
  
      return new NextResponse("Profile links reordered successfully", { status: 200 });
    } catch (error) {
      console.error("[REORDER ERROR]", error);
      const errorMessage = error instanceof Error ? error.message : "Internal server error";
      return new NextResponse(
        JSON.stringify({ error: errorMessage }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  