import { currentUser } from '@/lib/auth';
import { User } from "@prisma/client";
import { ModernHeader } from './_headercomponents/ModernHeader';

export const HeaderAfterLogin = async () => {
  // This will be undefined if user is not logged in
  const user = await currentUser() as User | undefined;

  return <ModernHeader user={user} />;
};

export default HeaderAfterLogin;

