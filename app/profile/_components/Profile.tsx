"use client";

import { useState } from "react";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ProfileHeader from "./ProfileHeader";
import Tab from "./Tab";
import TabContent from "./TabContent";
import {
  ProfileLink,
  FavoriteVideo,
  FavoriteAudio,
  FavoriteBlog,
  FavoriteArticle,
  Subscription,
} from "@prisma/client";

interface ProfileProps {
  userId: string;
  username?: string;
  avatarUrl?: string;
  joinDate?: string;
  profileLinks: ProfileLink[];
  favoriteVideos: FavoriteVideo[];
  favoriteAudios: FavoriteAudio[];
  favoriteBlogs: FavoriteBlog[];
  favoriteArticles: FavoriteArticle[];
  subscriptions: Subscription[];
}

// Updated tabs array to include new tabs
const tabs = [
  "IDEAS",
  "MINDS",
  "SCRIPTS",
  "PROFILE LINKS",
  "VIDEOS",
  "AUDIOS",
  "ARTICLES",
  "BLOGS",
  "FOLLOWERS",
  "FOLLOWING",
  "SETTINGS",
  "SUBSCRIPTION"
];

const Profile: React.FC<ProfileProps> = ({
  userId,
  username,
  avatarUrl,
  joinDate,
  profileLinks,
  favoriteVideos,
  favoriteAudios,
  favoriteBlogs,
  favoriteArticles,
  subscriptions,
}) => {
  const [selectedTab, setSelectedTab] = useState("IDEAS");

  return (
    <SidebarDemo>
      <div className="flex flex-col items-center bg-gray-800 text-white min-h-screen py-8 px-4 md:px-10">
        <ProfileHeader
          userId={userId}
          username={username}
          avatarUrl={avatarUrl}
          joinDate={joinDate}
        />

        {/* Tabs */}
        <div className="w-full flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-700 py-2">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              isSelected={selectedTab === tab}
              onClick={() => setSelectedTab(tab)}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 w-full">
          <TabContent
            selectedTab={selectedTab}
            userId={userId}
            profileLinks={profileLinks}
            favoriteVideos={favoriteVideos}
            favoriteAudios={favoriteAudios}
            favoriteBlogs={favoriteBlogs}
            favoriteArticles={favoriteArticles}
            subscriptions={subscriptions}
          />
        </div>
      </div>
    </SidebarDemo>
  );
};

export default Profile;



