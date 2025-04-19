"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from "@/lib/format";
import { User as PrismaUser } from "@prisma/client"
import { User, Plus, ChevronRight } from 'lucide-react';

// Mock data
const recentOrders = [
  {
    id: "1",
    name: "La Roche-Posay Toleriane Double Repair Face Moisturizer",
    price: 21.59,
    pricePerUnit: "6.39/Fl Oz",
    image: "/images/products/moisturizer.jpg"
  },
  {
    id: "2",
    name: "Cetaphil Face Wash",
    price: 13.90,
    pricePerUnit: "0.70/Fl Oz",
    image: "/images/products/facewash.jpg"
  }
];

const accountOptions = [
  "Switch Accounts",
  "Sign Out",
  "Account",
  "Orders",
  "Keep Shopping For",
  "Recommendations",
  "Browsing History",
  "Recalls and Product Safety Alerts",
  "Watchlist",
  "Video Purchases & Rentals",
  "Kindle Unlimited",
  "Content Library",
  "Devices",
  "Subscribe & Save Items",
  "Memberships & Subscriptions",
  "Prime Membership",
  "Amazon Credit Cards",
  "Music Library",
  "Start a Selling Account",
  "Register for a free Business Account"
];

const listOptions = [
  "Create a List",
  "Find a List or Registry",
  "Purchase Reminders",
  "Your Saved Books"
];

interface ManageProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PrismaUser | undefined;
}

const ManageProfilesModal = ({ isOpen, onClose, user }: ManageProfilesModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg w-[480px] border border-gray-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Manage Profiles</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Active Profile */}
          <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-400">Active Profile</p>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View Profile
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Add Profile Button */}
          <button className="w-full p-4 rounded-lg border border-dashed border-gray-700 
            hover:border-gray-600 transition-all duration-200 flex items-center justify-center gap-2">
            <Plus className="h-5 w-5 text-gray-400" />
            <span className="text-gray-300">Add New Profile</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface UserModalProps {
  user: PrismaUser | undefined;
}

export const UserModal = ({ user }: UserModalProps) => {
  const [isManageProfilesOpen, setIsManageProfilesOpen] = useState(false);

  return (
    <>
      <div className="absolute right-0 top-full mt-2 w-[800px] bg-gray-900 rounded-lg shadow-xl border border-gray-800">
        <div className="flex divide-x divide-gray-800">
          {/* Left Column - Buy it again */}
          <div className="w-1/2 p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Buy it again</h3>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={order.image}
                      alt={order.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-300 font-medium">{order.name}</h4>
                    <p className="text-lg font-semibold text-white">{formatPrice(order.price)}</p>
                    <p className="text-sm text-gray-400">{order.pricePerUnit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - User Options */}
          <div className="w-1/2 p-6">
            {/* Profile Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-300">Who's shopping? Select a profile.</h3>
                <button 
                  onClick={() => setIsManageProfilesOpen(true)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Manage Profiles
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Your Lists */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Your Lists</h3>
                <ul className="space-y-2">
                  {listOptions.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-gray-400 hover:text-white">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Your Account */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Your Account</h3>
                <ul className="grid grid-cols-1">
                  {accountOptions.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-gray-400 hover:text-white">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Profiles Modal */}
      <ManageProfilesModal 
        isOpen={isManageProfilesOpen}
        onClose={() => setIsManageProfilesOpen(false)}
        user={user}
      />
    </>
  );
}; 