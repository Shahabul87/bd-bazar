"use client";

import { FavoriteAudio } from "@prisma/client"; // Import FavoriteAudio type from Prisma
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

interface FavoriteAudioListProps {
  items: FavoriteAudio[]; // Accept array of FavoriteAudio type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void; // Add onDelete prop for delete functionality
}

export const FavoriteAudioList = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: FavoriteAudioListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteAudios, setFavoriteAudios] = useState<FavoriteAudio[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [audioToDelete, setAudioToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setFavoriteAudios(
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedAudios = Array.from(favoriteAudios);
    const [movedAudio] = reorderedAudios.splice(result.source.index, 1);
    reorderedAudios.splice(result.destination.index, 0, movedAudio);

    const updatedAudios = reorderedAudios.map((audio, index) => ({
      ...audio,
      position: index,
    }));
    setFavoriteAudios(updatedAudios);

    const bulkUpdateData = updatedAudios.map((audio) => ({
      id: audio.id,
      position: audio.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setAudioToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (audioToDelete) {
      onDelete(audioToDelete);
      setShowDeleteModal(false);
      setAudioToDelete(null);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favoriteAudios">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {favoriteAudios.map((audio, index) => (
                <Draggable key={audio.id} draggableId={audio.id} index={index}>
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
                      <div className="flex flex-col">
                        <span className="font-medium">{audio.title}</span>
                        <div className="flex gap-5 items-center">
                        <span className="text-xs text-gray-500">
                          Platform: <span className="text-fuchsia-700 font-bold tracking-wide">{audio.platform}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                          Created: {new Date(audio.createdAt).toLocaleDateString()}
                        </span>
                        </div>
                        <a
                          href={audio.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 underline"
                        >
                          {audio.url}
                        </a>
                        
                      </div>
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                          onClick={() => onEdit(audio.id)}
                        >
                          <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" />{" "}
                          Edit
                        </span>
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition text-red-600"
                          onClick={() => confirmDelete(audio.id)}
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
              Are you sure you want to delete this favorite audio?
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
