"use client";

import { CourseTabs } from "./course-tab";
import { Chapter } from "@prisma/client";

interface CourseTabsDemoProps {
  chapters: Chapter[];
}

export function CourseTabsDemo({ chapters }: CourseTabsDemoProps) {
  // Map through chapters data to create tabs dynamically
  const tabs = chapters.map((chapter, index) => ({
    title: `Chapter ${index + 1}`,
    value: chapter.title, // Display chapter title
    content: (
      <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gray-700 border border-[#94a3b8]">
        <h2 className="text-2xl md:text-3xl mb-4 text-cyan-600">{chapter.title}</h2>
        <LearningOutcomes outcomes={chapter.learningOutcomes} />
      </div>
    ),
  }));

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col p-3 md:p-2 lg:p-0 max-w-5xl mx-auto w-full items-start justify-start mt-20 mb-40">
      <CourseTabs tabs={tabs} />
    </div>
  );
}

// Component to display learning outcomes as a bullet-point list
const LearningOutcomes = ({ outcomes }: { outcomes?: string | null }) => {
  if (!outcomes) return <p>No specific learning outcomes provided.</p>;

  // Parse the outcomes as bullet points if structured as HTML or plain text
  const points = outcomes.includes("<p>")
    ? outcomes.match(/<p>(.*?)<\/p>/g)?.map((item) => item.replace(/<\/?p>/g, "").trim())
    : outcomes.split(".").map((item) => item.trim()).filter(Boolean); // For non-HTML format, split by periods

  return (
    <ul className="list-disc list-inside text-lg md:text-xl text-neutral-300">
      {points?.map((point, index) => (
        <li key={index} className="mb-3">
          {point}
        </li>
      )) || <li>No specific learning outcomes available.</li>}
    </ul>
  );
};

