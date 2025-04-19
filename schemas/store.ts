import * as z from "zod"

export const createStoreSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters")
})

export type CreateStoreSchema = z.infer<typeof createStoreSchema> 