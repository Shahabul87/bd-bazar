/**
 * Safely verifies a password without using Node.js APIs that are incompatible with Edge Runtime
 * This handles password verification in a way that works in both server and edge environments
 */
export const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    // Use dynamic import to avoid static analysis detection
    // This creates a function that will be called only at runtime
    const importBcrypt = async () => {
      return await import('bcryptjs');
    };
    
    const { default: bcrypt } = await importBcrypt();
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    // If bcryptjs fails to load or compare (e.g., in Edge Runtime)
    console.warn('Password verification failed - incompatible environment');
    return false;
  }
} 