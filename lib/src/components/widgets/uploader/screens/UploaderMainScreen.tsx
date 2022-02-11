import { JSX } from "preact";
import { isUploadedFile, SubmittedFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { SubmittedFileComponent } from "uploader/components/widgets/uploader/components/files/SubmittedFileComponent";
import { UploaderParamsRequired } from "uploader/UploaderParams";
import cn from "classnames";
import { UploadedFile } from "upload-js";
import "./UploaderMainScreen.scss";
import { UploadButton } from "uploader/components/widgets/uploader/components/UploadButton";
import { RightSvg } from "uploader/assets/svgs/RightSvg";

interface Props {
  addFiles: (files: File[]) => void;
  params: UploaderParamsRequired;
  remove: (fileIndex: number) => void;
  resolve: (files: UploadedFile[]) => void;
  submittedFiles: SubmittedFile[];
}

export const UploaderMainScreen = ({ addFiles, submittedFiles, params, remove, resolve }: Props): JSX.Element => {
  const uploadedFiles = submittedFiles.filter(isUploadedFile);
  const finishedUploading = submittedFiles.every(x => x.type !== "uploading");
  const canFinish = finishedUploading && uploadedFiles.length > 0;
  const { locale } = params;
  return (
    // Div required to break-out of flex-box layout.
    <div className="uploader__main-screen">
      <div className="uploader__main-screen__file-list">
        {submittedFiles.map(file => (
          <SubmittedFileComponent
            file={file}
            locale={locale}
            key={file.fileIndex}
            remove={() => remove(file.fileIndex)}
          />
        ))}
      </div>
      {params.multi && (
        <div className="uploader__main-screen__buttons">
          <UploadButton multi={params.multi} text={locale.addAnotherFile} onUpload={addFiles} />

          <a
            href="#done"
            className={cn("btn btn--primary", { disabled: !canFinish })}
            onClick={e => {
              e.preventDefault();
              if (canFinish) {
                resolve(uploadedFiles.map(x => x.uploadedFile));
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
        </div>
      )}
    </div>
  );
};
