"use client"

import Link from 'next/link';

export const BrandLogo = () => {
  return (
    <Link href="/" className="flex-shrink-0">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        BdBazar
      </h1>
    </Link>
  );
}; 