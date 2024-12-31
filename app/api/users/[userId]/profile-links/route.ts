import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const user = await currentUser();
    const { platform, url } = await req.json();

    // Check if the user is authenticated
    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for profile link creation
    if (!platform || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Determine the next position for the profile link
    const profileLinksCount = await db.profileLink.count({
      where: { userId: user.id },
    });

    // Create a new profile link in the database with the calculated position
    const newProfileLink = await db.profileLink.create({
      data: {
        platform,
        url,
        userId: user.id, // Associate profile link with the current user
        position: profileLinksCount, // Set position to the next available index
      },
    });

    // Return the newly created profile link information
    return new NextResponse(JSON.stringify(newProfileLink), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("[POST ERROR] Profile Link Creation:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


