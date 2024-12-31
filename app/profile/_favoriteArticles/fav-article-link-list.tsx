"use client";

import { FavoriteArticle } from "@prisma/client"; // Import FavoriteArticle type from Prisma
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

interface FavoriteArticleListProps {
  items: FavoriteArticle[]; // Accept array of FavoriteArticle type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void; // Add onDelete prop for delete functionality
}

export const FavoriteArticleList = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: FavoriteArticleListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteArticles, setFavoriteArticles] = useState<FavoriteArticle[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setFavoriteArticles(
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedArticles = Array.from(favoriteArticles);
    const [movedArticle] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, movedArticle);

    const updatedArticles = reorderedArticles.map((article, index) => ({
      ...article,
      position: index,
    }));
    setFavoriteArticles(updatedArticles);

    const bulkUpdateData = updatedArticles.map((article) => ({
      id: article.id,
      position: article.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (articleToDelete) {
      onDelete(articleToDelete);
      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favoriteArticles">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {favoriteArticles.map((article, index) => (
                <Draggable key={article.id} draggableId={article.id} index={index}>
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
                        <span className="font-medium">{article.title}</span>
                        <div className="flex gap-5 items-center">
                        <span className="text-xs text-gray-500">
                          Platform: <span className="text-fuchsia-700 font-bold tracking-wide">{article.platform}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                          Created: {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                        </div>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 underline"
                        >
                          {article.url}
                        </a>
                       
                      </div>
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                          onClick={() => onEdit(article.id)}
                        >
                          <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" />{" "}
                          Edit
                        </span>
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition text-red-600"
                          onClick={() => confirmDelete(article.id)}
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
              Are you sure you want to delete this favorite article?
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
