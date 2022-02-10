import { useState } from "preact/compat";

export function useDragDrop(
  acceptFiles: (files: File[]) => void
): {
  isDragging: boolean | undefined;
  onDragEnter: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
} {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer !== null) {
      e.dataTransfer.dropEffect = "copy";
    }
  };
  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer !== null) {
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        acceptFiles(files);
        e.dataTransfer.clearData();
      }
    }
  };
  return {
    isDragging,
    onDrop: (e: DragEvent) => handleDrop(e),
    onDragOver: (e: DragEvent) => handleDragOver(e),
    onDragEnter: (e: DragEvent) => handleDragEnter(e),
    onDragLeave: (e: DragEvent) => handleDragLeave(e)
  };
}
