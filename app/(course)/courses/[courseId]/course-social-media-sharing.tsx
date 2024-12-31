"use client";

import { useEffect, useState } from "react";
import {
  IconBrandX,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconLink,
} from "@tabler/icons-react";

interface SocialShareProps {
  courseTitle: string;
}

export const CourseSocialMediaShare: React.FC<SocialShareProps> = ({ courseTitle }) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <p className="text-gray-300">Share this course:</p>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          courseTitle
        )}&url=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group text-blue-500 hover:text-blue-600"
        aria-label="Share on Twitter"
      >
        <IconBrandX stroke={2} />
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black rounded px-2 py-1">
          Twitter
        </span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group text-blue-700 hover:text-blue-800"
        aria-label="Share on Facebook"
      >
        <IconBrandFacebook stroke={2} />
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black rounded px-2 py-1">
          Facebook
        </span>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group text-blue-600 hover:text-blue-700"
        aria-label="Share on LinkedIn"
      >
        <IconBrandLinkedin stroke={2} />
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black rounded px-2 py-1">
          LinkedIn
        </span>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          courseTitle
        )}%20${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group text-green-500 hover:text-green-600"
        aria-label="Share on WhatsApp"
      >
        <IconBrandWhatsapp stroke={2} />
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black rounded px-2 py-1">
          WhatsApp
        </span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group text-pink-500 hover:text-pink-600"
        aria-label="Visit Instagram"
      >
        <IconBrandInstagram stroke={2} />
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black rounded px-2 py-1">
          Instagram
        </span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="relative group text-gray-400 hover:text-gray-500"
        aria-label="Copy Link"
      >
        <IconLink stroke={2} />
        <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs text-white bg-black rounded px-2 py-1">
          Copy Link
        </span>
      </button>
    </div>
  );
};