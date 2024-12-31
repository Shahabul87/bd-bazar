"use client";

import React from 'react';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { Course } from '@prisma/client';
import { SocialMediaShare } from '@/app/blog/[postId]/_components/social-media-sharing';
import { CourseSocialMediaShare } from './course-social-media-sharing';

interface CourseCardProps {
  course: Course & { category?: { name: string } | null }; // Adjusted type for category
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="bg-gray-800 text-white/90 p-8 max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto min-h-screen">
      {/* Breadcrumb with Category */}
      <p className="text-sm text-gray-400 mb-4 mt-10">
        {course.category?.name || 'Category not specified'}
      </p>

      {/* Course Title and Bestseller Badge */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl lg:text-5xl font-bold mb-3">
          {course.title}
        </h1>
        {/* Uncomment if Bestseller Badge is needed */}
        {/* {course.isPublished && (
          <div className="bg-yellow-300 text-black font-bold py-1 px-3 rounded-full text-sm">
            Bestseller
          </div>
        )} */}
      </div>

      {/* Course Description */}
      <p className="text-sm text-gray-400 mb-6">
        {course.description}
      </p>

      {/* Course Image */}
      {course.imageUrl && (
          <div className="relative h-64 w-full mb-6">
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-md"
            />
          </div>
        )}

      {/* Social Media Sharing Icons */}
      <CourseSocialMediaShare courseTitle={course.title} />

      {/* Creator Info */}
      <div className="flex items-center space-x-2 mb-6 md:mt-6 lg:mt-20">
        <p className="text-sm text-gray-400">
          Created by <span className="text-white">Course Creator</span>
        </p>
      </div>

      {/* Last Updated and Languages */}
      <div className="text-gray-400 text-sm mb-6">
        <p>Last updated {course.updatedAt.toLocaleDateString()}</p>
        {/* Uncomment for additional language info */}
        {/* <p>English [CC], Arabic [Auto], <span className="underline">13 more</span></p> */}
      </div>

      {/* Rating and Enrollment Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AiFillStar className="text-yellow-400" />
          <span className="text-white text-2xl">4.5</span>
          <span className="text-gray-400 text-sm">(39,765 ratings)</span>
        </div>
        <div className="text-white text-xl">
          222,413 learners
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
