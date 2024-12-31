"use client";

import { Subscription } from "@prisma/client"; // Import Subscription type from Prisma
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface SubscriptionListProps {
  items: Subscription[]; // Accept array of Subscription type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void; // Add onDelete prop for delete functionality
}

export const SubscriptionList = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: SubscriptionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setSubscriptions(
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedSubscriptions = Array.from(subscriptions);
    const [movedSubscription] = reorderedSubscriptions.splice(result.source.index, 1);
    reorderedSubscriptions.splice(result.destination.index, 0, movedSubscription);

    const updatedSubscriptions = reorderedSubscriptions.map((subscription, index) => ({
      ...subscription,
      position: index,
    }));
    setSubscriptions(updatedSubscriptions);

    const bulkUpdateData = updatedSubscriptions.map((subscription) => ({
      id: subscription.id,
      position: subscription.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setSubscriptionToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (subscriptionToDelete) {
      onDelete(subscriptionToDelete);
      setShowDeleteModal(false);
      setSubscriptionToDelete(null);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="subscriptions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {subscriptions.map((subscription, index) => (
                <Draggable key={subscription.id} draggableId={subscription.id} index={index}>
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className="px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col p-2">
                        <div className="lg:flex gap-5">
                        <div className=" flex gap-5 items-center">
                        <span className="font-medium">{subscription.name}</span>
                        <span className="text-xs text-gray-500">
                          Platform: <span className="text-fuchsia-600 font-semibold tracking-wide">{subscription.platform}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                          Card Used: <span className="text-sky-900 font-bold tracking-wide">{subscription.cardUsed}</span>
                        </span>
                        </div>
                        <div className="flex gap-5 items-center">
                        <span className="text-xs text-gray-500">
                          <span className="text-green-950 font-bold tracking-wide">Start Date:</span> {new Date(subscription.dateOfSubscription).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          <span className="text-red-900 font-bold tracking-wide">End Date:</span> {new Date(subscription.endOfSubscription).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          <span className="text-purple-700 font-bold tracking-wide">Amount:</span> ${subscription.amount.toFixed(2)}
                        </span>
                        </div>
                        </div>
                        <a
                          href={subscription.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 underline"
                        >
                          {subscription.url}
                        </a>
                      </div>
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                          onClick={() => onEdit(subscription.id)}
                        >
                          <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" />{" "}
                          Edit
                        </span>
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition text-red-600"
                          onClick={() => confirmDelete(subscription.id)}
                        >
                          <Trash className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" />{" "}
                          Delete
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this subscription?
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)} className="text-black">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
