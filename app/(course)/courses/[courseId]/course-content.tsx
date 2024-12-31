"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlayCircle } from 'react-icons/fa';
import Link from 'next/link';
import { Chapter, Section } from '@prisma/client';

interface CourseContentProps {
  chapters: (Chapter & {
    sections: Section[];
  })[] | undefined; // Allow undefined to handle cases where chapters might not be loaded yet
}

export const CourseContent: React.FC<CourseContentProps> = ({ chapters }) => {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const toggleChapter = (index: number) => {
    setExpandedChapter(index === expandedChapter ? null : index);
  };

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
    setExpandedChapter(expandAll ? null : -1); // If expandAll is true, collapse everything; if false, expand everything
  };

  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto bg-gray-700 border border-[#94a3b8] p-4 shadow-lg rounded-lg">
      {/* Summary Header */}
      <div className="text-cyan-500 mb-4 text-lg font-semibold flex items-center justify-between">
        {chapters ? `${chapters.length} chapters` : '0 chapters'} •{' '}
        {chapters
          ? `${chapters.reduce(
              (acc, chapter) => acc + (chapter.sections?.length || 0),
              0
            )} sections`
          : '0 sections'}
        <span
          className="text-fuchsia-600 cursor-pointer ml-4"
          onClick={toggleExpandAll}
        >
          {expandAll ? 'Collapse all chapters' : 'Expand all chapters'}
        </span>
      </div>

      {/* Chapter Loop */}
      {chapters?.map((chapter, index) => (
        <div key={chapter.id} className="mb-4 border-b">
          {/* Chapter Header */}
          <div
            className="flex justify-between items-center bg-gray-800 p-4 cursor-pointer rounded-md"
            onClick={() => toggleChapter(index)}
          >
            <div>
              <h2 className="font-bold text-white/80">{chapter.title}</h2>
              <p className="text-sky-500 text-sm">
                {chapter.sections?.length || 0} sections •{' '}
                {chapter.totalDuration || 'Unknown Duration'}
              </p>
            </div>
            {(expandedChapter === index || expandAll) ? (
              <FaChevronUp className="text-gray-600" />
            ) : (
              <FaChevronDown className="text-gray-600" />
            )}
          </div>

          {/* Chapter Sections */}
          {(expandedChapter === index || expandAll) && (
            <ul className="px-6 py-2 bg-gray-300 border border-[#94a3b8]">
              {chapter.sections?.map((section) => (
                <li key={section.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <FaPlayCircle className="text-gray-600 mr-2" />
                    <Link href={`/${section.id}`} className="text-black cursor-pointer hover:underline">
                      {section.title}
                    </Link>
                  </div>
                  <div className="text-gray-700 text-sm">
                    {section.duration ? `${section.duration} mins` : 'Unknown Duration'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
