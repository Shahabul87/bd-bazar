"use client";

import React from "react";
import { FavoriteAudio } from "@prisma/client"; // Import FavoriteAudio from Prisma Client
import Link from "next/link";
import { motion } from "framer-motion";

interface MyFavoriteAudioCardProps {
  audio: FavoriteAudio;
}

const MyFavoriteAudioCard: React.FC<MyFavoriteAudioCardProps> = ({ audio }) => {
  return (
    <Link href={audio.url} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Audio Thumbnail or Placeholder */}
        <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-gray-300">
          {audio.platform === "Youtube" ? (
            <img
              src={`https://img.youtube.com/vi/${new URL(audio.url).searchParams.get("v")}/0.jpg`}
              alt={audio.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>No Thumbnail Available</span>
          )}
        </div>

        {/* Audio Content */}
        <div className="p-4">
          <motion.h3
            className="text-lg font-bold mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {audio.title || "Untitled Audio"}
          </motion.h3>
          <motion.p
            className="text-gray-400 text-sm mb-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Platform: {audio.platform}
          </motion.p>

          {/* Audio Metadata */}
          <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
            <span>Position: {audio.position}</span>
            <span>Created at: {new Date(audio.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MyFavoriteAudioCard;
