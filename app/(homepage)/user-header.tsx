import React from 'react'
import { MainHeader } from './main-header';
import { User } from '@prisma/client';

interface ConditionalHeaderProps {
  user: User | null;
}

const ConditionalHeader: React.FC<ConditionalHeaderProps> = ({ user }) => {
  return (
    <>
      {!user ? (
        <div>
          <MainHeader />
        </div>
      ) : (
        <div>
          <MainHeader />
        </div>
      )}
    </>
  );
};

export default ConditionalHeader;
