"use client";

import { FavoriteBlog } from "@prisma/client"; // Import FavoriteBlog type from Prisma
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

interface FavoriteBlogListProps {
  items: FavoriteBlog[]; // Accept array of FavoriteBlog type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void; // Add onDelete prop for delete functionality
}

export const FavoriteBlogList = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: FavoriteBlogListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteBlogs, setFavoriteBlogs] = useState<FavoriteBlog[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setFavoriteBlogs(
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedBlogs = Array.from(favoriteBlogs);
    const [movedBlog] = reorderedBlogs.splice(result.source.index, 1);
    reorderedBlogs.splice(result.destination.index, 0, movedBlog);

    const updatedBlogs = reorderedBlogs.map((blog, index) => ({
      ...blog,
      position: index,
    }));
    setFavoriteBlogs(updatedBlogs);

    const bulkUpdateData = updatedBlogs.map((blog) => ({
      id: blog.id,
      position: blog.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (blogToDelete) {
      onDelete(blogToDelete);
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favoriteBlogs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {favoriteBlogs.map((blog, index) => (
                <Draggable key={blog.id} draggableId={blog.id} index={index}>
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
                        <span className="font-medium">{blog.title}</span>
                        <div className="flex gap-5 items-center">
                        <span className="text-xs text-gray-500">
                          Platform: <span className="text-fuchsia-700 font-bold tracking-wide">{blog.platform}</span>
                        </span>
                        <span className="text-xs text-gray-500">
                          Created: {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        </div>
                        <a
                          href={blog.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 underline"
                        >
                          {blog.url}
                        </a>
                        
                      </div>
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                          onClick={() => onEdit(blog.id)}
                        >
                          <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" />{" "}
                          Edit
                        </span>
                        <span
                          className="flex items-center justify-between cursor-pointer hover:opacity-75 transition text-red-600"
                          onClick={() => confirmDelete(blog.id)}
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
              Are you sure you want to delete this favorite blog?
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
