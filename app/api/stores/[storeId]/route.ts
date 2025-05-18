import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { z } from "zod"
import { currentUser } from "@/lib/auth"

const storeUpdateSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().max(500).optional(),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/).optional(),
  type: z.string().optional(),
  businessType: z.string().optional(),
  theme: z.string().optional(),
  logo: z.string().optional(),
  bannerImage: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  fullAddress: z.string().optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  thana: z.string().optional(),
  roadNo: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  socialLinks: z.preprocess(
    // Handle socialLinks as either string or object
    (val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch (e) {
          return val;
        }
      }
      return val;
    },
    z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      pinterest: z.string().optional(),
    }).optional()
  ),
  appearanceSettings: z.string().optional(),
})

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Await params object before accessing its properties
    const { storeId } = await params;
    const user = await currentUser();
    
    if (!user) {
      console.log("Unauthorized - No user found");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    console.log("Getting store:", storeId, "for user:", user.id);
    
    // Get store from database
    const store = await db.store.findUnique({
      where: {
        id: storeId
      }
    });
    
    if (!store) {
      console.error("Store not found:", storeId);
      return new NextResponse("Store not found", { status: 404 });
    }

    // Check if store belongs to user for editing purposes
    if (store.userId !== user.id) {
      console.error("Store doesn't belong to this user - UserId:", user.id, "StoreUserId:", store.userId);
      return new NextResponse("You don't have access to this store", { status: 403 });
    }
    
    // Format response to ensure all fields are present
    const formattedStore = {
      ...store,
      // Ensure slug exists even if it's not in DB
      slug: store.slug || store.name.toLowerCase().replace(/\s+/g, "-"),
      // Keep JSON string for socialLinks - client will parse it
      socialLinks: store.socialLinks || JSON.stringify({
        facebook: "",
        instagram: "",
        twitter: "",
        pinterest: ""
      })
    };
    
    console.log("Successfully retrieved store:", storeId);
    
    return NextResponse.json(formattedStore);
  } catch (error) {
    console.error("[STORE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Await params object before accessing its properties
    const { storeId } = await params;
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    console.log("Current user ID:", user.id);
    console.log("Updating store:", storeId);
    
    let body;
    try {
      body = await req.json();
      console.log("Request body:", JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error("Error parsing request JSON:", parseError);
      return new NextResponse("Invalid JSON in request body", { status: 400 });
    }
    
    // Validate request body
    const validationResult = storeUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error("Validation error:", JSON.stringify(validationResult.error, null, 2));
      return new NextResponse(JSON.stringify(validationResult.error), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log("Validation successful", JSON.stringify(validationResult.data, null, 2));
    
    const {
      name,
      description,
      slug,
      type,
      businessType,
      theme,
      logo,
      bannerImage,
      contactEmail,
      contactPhone,
      email,
      phone,
      address,
      fullAddress,
      division,
      district,
      thana,
      roadNo,
      status,
      socialLinks,
      appearanceSettings
    } = validationResult.data;
    
    // Check if store exists and belongs to the user
    const storeExists = await db.store.findUnique({
      where: {
        id: storeId,
      }
    });
    
    if (!storeExists) {
      console.error("Store not found:", storeId);
      return new NextResponse("Store not found", { status: 404 });
    }
    
    // For debugging user access issues
    if (storeExists.userId !== user.id) {
      console.error("Store doesn't belong to this user. Store userId:", storeExists.userId, "Current user:", user.id);
      return new NextResponse("You don't have permission to update this store", { status: 403 });
    }
    
    // If slug is changing, check if it's already taken
    if (slug && slug !== storeExists.slug) {
      const slugExists = await db.store.findFirst({
        where: {
          slug,
          NOT: {
            id: storeId
          }
        }
      });
      
      if (slugExists) {
        return new NextResponse("Slug already exists", { status: 409 });
      }
    }
    
    // Prepare socialLinks for database storage
    let formattedSocialLinks;
    if (socialLinks) {
      // If it's already a string, we can use it directly
      if (typeof socialLinks === 'string') {
        formattedSocialLinks = socialLinks;
      } else {
        // Otherwise, stringify the object
        formattedSocialLinks = JSON.stringify({
          facebook: socialLinks.facebook || "",
          instagram: socialLinks.instagram || "",
          twitter: socialLinks.twitter || "",
          pinterest: socialLinks.pinterest || ""
        });
      }
    }
    
    // Update store
    try {
      const updateData: any = {};
      
      // Only include defined fields in the update
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (slug !== undefined) updateData.slug = slug;
      if (type !== undefined) updateData.type = type;
      if (businessType !== undefined) updateData.businessType = businessType;
      if (theme !== undefined) updateData.theme = theme;
      if (logo !== undefined) updateData.logo = logo;
      if (bannerImage !== undefined) updateData.bannerImage = bannerImage;
      if (contactEmail !== undefined) updateData.contactEmail = contactEmail;
      if (contactPhone !== undefined) updateData.contactPhone = contactPhone;
      if (email !== undefined) updateData.email = email;
      if (phone !== undefined) updateData.phone = phone;
      if (address !== undefined) updateData.address = address;
      if (fullAddress !== undefined) updateData.fullAddress = fullAddress;
      if (division !== undefined) updateData.division = division;
      if (district !== undefined) updateData.district = district;
      if (thana !== undefined) updateData.thana = thana;
      if (roadNo !== undefined) updateData.roadNo = roadNo;
      if (status !== undefined) updateData.status = status;
      if (formattedSocialLinks !== undefined) updateData.socialLinks = formattedSocialLinks;
      if (appearanceSettings !== undefined) updateData.appearanceSettings = appearanceSettings;
      
      console.log("Updating with data:", JSON.stringify(updateData, null, 2));
      
      const updatedStore = await db.store.update({
        where: {
          id: storeId
        },
        data: updateData
      });
      
      console.log("Store updated successfully:", updatedStore.id);
      return NextResponse.json(updatedStore);
    } catch (dbError: any) {
      console.error("Database error during update:", dbError);
      return new NextResponse(`Database error: ${dbError.message}`, { status: 500 });
    }
  } catch (error: any) {
    console.error("[STORE_PATCH]", error);
    return new NextResponse(`Internal error: ${error.message}`, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Await params object before accessing its properties
    const { storeId } = await params;
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    // Check if store exists and belongs to the user
    const storeExists = await db.store.findUnique({
      where: {
        id: storeId,
        userId: user.id
      }
    })
    
    if (!storeExists) {
      return new NextResponse("Store not found", { status: 404 })
    }
    
    // Delete store
    await db.store.delete({
      where: {
        id: storeId,
        userId: user.id
      }
    })
    
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[STORE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 