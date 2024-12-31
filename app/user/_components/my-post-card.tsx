"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Post, Comment, Reply } from "@prisma/client"; // Importing Post, Comment, and Reply types from Prisma Client

interface MyPostCardProps {
  post: Post & {
    comments: Comment[];
    reply: Reply[];
  };
}

const MyPostCard: React.FC<MyPostCardProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <motion.div
        className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Post Image */}
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title || "Post image"}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-gray-300">
            No Image Available
          </div>
        )}

        {/* Post Content */}
        <div className="p-4">
          <motion.h3
            className="text-lg font-bold mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {post.title || "Untitled Post"}
          </motion.h3>
          <motion.p
            className="text-gray-400 text-sm mb-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {post.description ? post.description.slice(0, 100) + "..." : "No description available."}
          </motion.p>

          {/* Post Footer */}
          <div className="flex items-center justify-between mt-4">
            <motion.span
              className="text-blue-400 font-semibold text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {post.category || "Uncategorized"}
            </motion.span>
            <motion.span
              className={`text-sm font-semibold ${post.published ? "text-green-400" : "text-red-400"}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {post.published ? "Published" : "Unpublished"}
            </motion.span>
          </div>

          {/* Comments and Replies Count */}
          <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
            <span>{post.comments.length} Comments</span>
            <span>{post.reply.length} Replies</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MyPostCard;
