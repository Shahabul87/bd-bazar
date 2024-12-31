"use client";

import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/cardscarousel/cards-carousel";
import { Chapter, Section } from "@prisma/client";

interface CourseContentProps {
  chapters: (Chapter & {
    sections: Section[];
  })[] | undefined;
}

export const CourseCardsCarousel: React.FC<CourseContentProps> = ({ chapters }) => {
  if (!chapters) return null;

  const cards = chapters.map((chapter, index) => (
    <Card
      key={chapter.id}
      card={{
        title: chapter.title,
        category: "Chapter " + (index + 1),
        src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image URL
        content: <DummyContent description={chapter.description} sections={chapter.sections} />,
      }}
      index={index}
    />
  ));

  return (
    <div className="container w-full h-full py-20">
      <Carousel items={cards} />
    </div>
  );
};

interface DummyContentProps {
  description: string | null;
  sections: Section[];
}

const DummyContent: React.FC<DummyContentProps> = ({ description, sections }) => {
  // Remove all HTML tags and replace HTML entities like &nbsp;
  const cleanDescription = description
    ? description
        .replace(/<[^>]*>/g, "")    // Remove all HTML tags
        .replace(/&nbsp;/g, " ")     // Replace &nbsp; with a space
    : "No description available for this chapter.";

  return (
    <div>
      {/* Display the chapter description */}
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 md:p-6 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Description:
          </span>{" "}
          {cleanDescription}
        </p>
      </div>

      {/* Display list of sections as bullet points without duration */}
      <div className="bg-[#EDEDED] dark:bg-neutral-700 p-4 md:p-6 rounded-3xl">
        <h3 className="text-neutral-800 dark:text-neutral-100 text-lg font-semibold mb-3">Sections:</h3>
        <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <span className="text-neutral-800 dark:text-neutral-100 font-semibold">
                {section.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Dummy data array for the cards (you can replace this with actual data or remove it if it's no longer needed)
const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent description="AI course description" sections={[]} />, // Example usage
  },
  // Add more items as needed
];

