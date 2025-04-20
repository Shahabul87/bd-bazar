import { currentUser } from '@/lib/auth';
import { User } from "@prisma/client";

export async function getCurrentUser(): Promise<User | undefined> {
  return await currentUser() as User | undefined;
} 