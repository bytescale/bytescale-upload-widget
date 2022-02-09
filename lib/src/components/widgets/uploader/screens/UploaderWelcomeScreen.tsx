import { UploadButton } from "uploader/components/widgets/uploader/components/UploadButton";
import { JSX } from "preact";
import { UploaderParamsRequired } from "uploader/UploaderParams";
import { ProgressIcon } from "uploader/components/widgets/uploader/components/fileIcons/ProgressIcon";
import { useEffect, useState } from "preact/compat";
import unknownSvg from "uploader/components/widgets/uploader/components/fileIcons/svgs/Unknown.svg";

interface Props {
  addFiles: (files: File[]) => void;
  params: UploaderParamsRequired;
}

export const UploaderWelcomeScreen = ({ addFiles, params: { multi, locale } }: Props): JSX.Element => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setProgress(p => Math.min(1, p + 0.2));
    }, 300);
  }, []);

  return (
    <>
      <ProgressIcon progress={progress} onCompleteImageSource={unknownSvg} height={40} />
      <UploadButton
        multi={multi}
        text={multi ? locale.uploadFiles : locale.uploadFile}
        className="btn--primary btn--upload"
        onUpload={addFiles}
      />
      <p>{locale.orDragDropCopyPaste}</p>
    </>
  );
};
