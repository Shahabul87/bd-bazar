"use client";

import React from "react";
import { Subscription } from "@prisma/client"; // Import Subscription from Prisma Client
import Link from "next/link";
import { motion } from "framer-motion";

interface MySubscriptionCardProps {
  subscription: Subscription;
}

const MySubscriptionCard: React.FC<MySubscriptionCardProps> = ({ subscription }) => {
  return (
    <Link href={subscription.url} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg border border-gray-700 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Subscription Content */}
        <div className="p-4">
          <motion.h3
            className="text-lg font-bold mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {subscription.name || "Unnamed Subscription"}
          </motion.h3>
          <motion.p
            className="text-gray-400 text-sm mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Platform: {subscription.platform}
          </motion.p>
          <motion.p
            className="text-gray-400 text-sm mb-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Category: {subscription.category}
          </motion.p>

          {/* Subscription Details */}
          <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
            <span>Start Date: {new Date(subscription.dateOfSubscription).toLocaleDateString()}</span>
            <span>End Date: {new Date(subscription.endOfSubscription).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-gray-500 text-sm">
            <span>Card Used: {subscription.cardUsed}</span>
            <span>Amount: ${subscription.amount.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MySubscriptionCard;
