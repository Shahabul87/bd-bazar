"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface ProductHeaderProps {
  name: string;
  store: {
    id: string;
    name: string;
  };
  rating: number;
  totalRatings: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export const ProductHeader = ({
  name,
  store,
  rating = 0,
  totalRatings = 0,
  ratingBreakdown
}: ProductHeaderProps) => {
  // Calculate rating percentage for the progress bars
  const calculatePercentage = (count: number) => {
    return totalRatings > 0 ? (count / totalRatings) * 100 : 0;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4">{name}</h1>
      
      <div className="flex items-center gap-4">
        {store && (
          <Link
            href={`/stores/${store.id}`}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            {store.name}
          </Link>
        )}

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>

          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="text-sm text-gray-400 hover:text-white transition">
                {rating.toFixed(1)} ({totalRatings} reviews)
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-gray-900 border-gray-800">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <div className="flex items-center flex-shrink-0 w-20">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= stars
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${calculatePercentage(ratingBreakdown[stars as keyof typeof ratingBreakdown])}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 flex-shrink-0 w-10">
                      {ratingBreakdown[stars as keyof typeof ratingBreakdown]}
                    </span>
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}; 