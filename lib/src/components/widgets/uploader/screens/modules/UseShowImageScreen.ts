import { useEffect, useState } from "preact/compat";
import { UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";

export function useShowImageScreen(imagesToEdit: UploadedFileContainer[], onFileUploadDelay: number): boolean {
  const [showImageScreen, setShowImageScreen] = useState(false);
  const [showImageScreenTimeout, setShowImageScreenTimeout] = useState<number | null>(null);

  useEffect(() => {
    if (imagesToEdit.length > 0) {
      const timeout = (setTimeout(() => {
        setShowImageScreen(true);
      }, onFileUploadDelay) as any) as number;
      setShowImageScreenTimeout(timeout);
      return () => clearTimeout(timeout);
    }
    if (showImageScreen) {
      setShowImageScreen(false);
    }
    if (showImageScreenTimeout !== null) {
      clearTimeout(showImageScreenTimeout);
      setShowImageScreenTimeout(null);
    }
  }, [imagesToEdit.length, showImageScreen]);

  return showImageScreen;
}
