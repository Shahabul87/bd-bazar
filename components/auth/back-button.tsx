"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

interface BackButtonProps {
  href: string;
  label: React.ReactNode;
  className?: string;
}

export const BackButton = ({
  href,
  label,
  className,
}: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className={clsx(
        "w-full font-normal flex items-center justify-end gap-2",
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text",
        "dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400",
        "text-transparent hover:text-transparent group",
        "transition-all duration-300 pr-4",
        className
      )}
      size="sm"
      asChild
    >
      <Link href={href} className="flex items-center gap-2">
        <span className="font-medium">{label}</span>
        <ArrowRight className="h-4 w-4 text-indigo-500 dark:text-indigo-400
          group-hover:text-purple-500 dark:group-hover:text-purple-400
          transition-all duration-300
          group-hover:translate-x-0.5"
        />
      </Link>
    </Button>
  );
};
