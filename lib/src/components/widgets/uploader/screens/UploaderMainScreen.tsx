import { JSX } from "preact";
import { SubmittedFile } from "uploader/components/widgets/uploader/model/SubmittedFile";
import { SubmittedFileComponent } from "uploader/components/widgets/uploader/components/files/SubmittedFileComponent";
import { UploaderParamsRequired } from "uploader/UploaderParams";

interface Props {
  addFiles: (files: File[]) => void;
  params: UploaderParamsRequired;
  remove: (fileIndex: number) => void;
  submittedFiles: SubmittedFile[];
}

export const UploaderMainScreen = ({ submittedFiles, params, remove }: Props): JSX.Element => (
  // Div required to break-out of flex-box layout.
  <div>
    {submittedFiles.map(file => (
      <SubmittedFileComponent
        file={file}
        locale={params.locale}
        key={file.fileIndex}
        remove={() => remove(file.fileIndex)}
      />
    ))}
  </div>
);
