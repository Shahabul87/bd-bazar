"use client";
import React, { useState, ComponentType } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { BarChart, Compass, Layout, List, HomeIcon } from "lucide-react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconSearch,
  IconList,
  IconArticle,
  IconChartHistogram,
  IconUsersGroup,
  IconFilePencil,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";

interface SidebarDemoProps {
  children: React.ReactNode;
}


export function SidebarDemo({ children }: SidebarDemoProps) {
    const user = useCurrentUser();
    
  const links = [
    {
      label: "Dashboard",
      href: "/user",
      icon: (
        <IconBrandTabler className="text-white  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile Manager",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
        label: "Browse Course",
        href: "/searchbar",
        icon: (
          <IconSearch className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Courses",
        href: "/teacher/courses",
        icon: (
          <IconList className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Create Groups",
        href: "/student/groups",
        icon: (
          <IconUsersGroup className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: " Create Posts",
        href: "/teacher/createblog",
        icon: (
          <IconFilePencil className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "All Posts",
        href: "/teacher/allposts",
        icon: (
          <IconArticle className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Analytics",
        href: "/teacher/analytics",
        icon: (
          <IconChartHistogram className="text-white dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        " flex flex-col md:flex-row bg-gray-700 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-white/10 dark:border-neutral-700",
        "min-h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-x-hidden min-h-screen">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.name || "User",
                href: "#",
                icon: (
                  <Image
                    src={user?.image || ""}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
       <div className="flex flex-1 overflow-auto">
        <div className="p-2 md:p-10  bg-gray-800 dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-screen">
        {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white/70 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Home
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content

