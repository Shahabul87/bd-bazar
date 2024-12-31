"use client";

import React from "react";
import { ProfileLink } from "@prisma/client"; // Import ProfileLink from Prisma Client
import Link from "next/link";
import { motion } from "framer-motion";

interface MySocialMediaCardProps {
  profileLink: ProfileLink;
}

const MySocialMediaCard: React.FC<MySocialMediaCardProps> = ({ profileLink }) => {
  return (
    <Link href={profileLink.url} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Profile Link Content */}
        <div className="p-4">
          <motion.h3
            className="text-lg font-bold mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Platform: {profileLink.platform}
          </motion.h3>

          {/* Profile Metadata */}
          <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
            <span>Created at: {new Date(profileLink.createdAt).toLocaleDateString()}</span>
            <span>Updated at: {new Date(profileLink.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MySocialMediaCard;
