import { JSX } from "preact";
import { SubmittedFile, UploadedFileContainer } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { SubmittedFileComponent } from "uploader/components/widgets/uploader/components/files/SubmittedFileComponent";
import { UploaderOptionsRequired } from "uploader/UploaderOptions";
import cn from "classnames";
import "./UploaderMainScreen.scss";
import { UploadButton } from "uploader/components/widgets/uploader/components/UploadButton";
import { RightSvg } from "uploader/assets/svgs/RightSvg";

interface Props {
  addFiles: (files: File[]) => void;
  finalize: () => void;
  isImageUploader: boolean;
  options: UploaderOptionsRequired;
  remove: (fileIndex: number) => void;
  submittedFiles: SubmittedFile[];
  uploadedFiles: UploadedFileContainer[];
}

export const UploaderMainScreen = ({
  addFiles,
  submittedFiles,
  uploadedFiles,
  options,
  remove,
  finalize,
  isImageUploader
}: Props): JSX.Element => {
  const finishedUploading = submittedFiles.every(x => x.type !== "uploading");
  const canFinish = finishedUploading && uploadedFiles.length > 0;
  const { locale } = options;
  const hasButtons = options.multi || options.showFinishButton;

  return (
    // Div required to break-out of flex-box layout.
    <div className="uploader__main-screen">
      <div className="uploader__main-screen__file-list">
        <div className="uploader__main-screen__file-list__inner">
          {submittedFiles.map(file => (
            <SubmittedFileComponent
              file={file}
              fileCount={submittedFiles.length}
              locale={locale}
              key={file.fileIndex}
              remove={() => remove(file.fileIndex)}
              showRemoveButton={options.showRemoveButton}
            />
          ))}
        </div>
      </div>
      {hasButtons && (
        <div className="btn-group">
          {options.multi && (
            <UploadButton
              multi={options.multi}
              text={isImageUploader ? locale.addAnotherImage : locale.addAnotherFile}
              onUpload={addFiles}
            />
          )}

          {options.showFinishButton && (
            <a
              href="#done"
              className={cn("btn btn--primary", { disabled: !canFinish })}
              onClick={e => {
                e.preventDefault();
                if (canFinish) {
                  finalize();
                }
              }}>
              {finishedUploading ? (
                <span className="vcenter">
                  {locale.finish} {locale.finishIcon && <RightSvg width={12} className="ml-2" />}
                </span>
              ) : (
                locale.pleaseWait
              )}
            </a>
          )}
        </div>
      )}
    </div>
  );
};
