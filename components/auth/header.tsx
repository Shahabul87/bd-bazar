"use client";

import { Poppins } from 'next/font/google';
import clsx from 'clsx';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
});

interface HeaderProps {
  label: string;
  className?: string;
}

export const Header = ({
  label,
  className,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className={clsx(
        "text-3xl md:text-4xl font-bold tracking-tight",
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        "dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400",
        "bg-clip-text text-transparent",
        "animate-gradient-x",
        "mb-2",
        poppins.className,
        className
      )}>
        {label}
      </h1>
      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
        Please enter your details to continue
      </p>
      <div className="mt-4 w-16 h-1 rounded-full 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400" />
    </div>
  );
};
