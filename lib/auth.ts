import { auth } from "@/auth";
import { verifyPassword } from "./passwordUtils";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

// Export verifyPassword from passwordUtils for backward compatibility
export { verifyPassword };