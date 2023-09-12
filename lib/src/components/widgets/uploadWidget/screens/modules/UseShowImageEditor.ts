import { useEffect, useState } from "preact/compat";
import { UploadedFileContainer } from "@bytescale/upload-widget/components/widgets/uploadWidget/model/SubmittedFile";

export function useShowImageEditor(pendingImages: UploadedFileContainer[], onFileUploadDelay: number): boolean {
  const [showImageScreen, setShowImageScreen] = useState(false);
  const [showImageScreenTimeout, setShowImageScreenTimeout] = useState<number | null>(null);

  useEffect(() => {
    if (pendingImages.length > 0) {
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
  }, [pendingImages.length, showImageScreen]);

  return showImageScreen;
}
