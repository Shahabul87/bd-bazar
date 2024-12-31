"use client"

import React from "react";
import { Course } from "@prisma/client";
import Link from "next/link";
import { motion } from "framer-motion";

interface MyCourseCardProps {
  course: Course;
}

const MyCourseCard: React.FC<MyCourseCardProps> = ({ course }) => {
  return (
    <Link href={`/courses/${course?.id}`}>
      <motion.div
        className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Course Image */}
        {course?.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title || "Course image"}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-600 flex items-center justify-center text-gray-300">
            No Image Available
          </div>
        )}

        {/* Course Content */}
        <div className="p-4">
          <motion.h3
            className="text-lg font-bold mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {course?.title || "Untitled Course"}
          </motion.h3>
          <motion.p
            className="text-gray-400 text-sm mb-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {course?.description
              ? course.description.slice(0, 100) + "..."
              : "No description available."}
          </motion.p>

          {/* Course Footer */}
          <div className="flex items-center justify-between mt-4">
            <motion.span
              className="text-fuchsia-400 font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ${course?.price !== undefined ? course.price : "N/A"}
            </motion.span>
            <motion.span
              className={`text-sm font-semibold ${
                course?.isPublished ? "text-green-400" : "text-red-400"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {course?.isPublished ? "Published" : "Unpublished"}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MyCourseCard;
