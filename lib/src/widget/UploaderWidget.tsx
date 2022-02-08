import { JSX } from "preact";
import { Upload, UploadedFile } from "upload-js";
import { UploaderParamsRequired } from "uploader/UploaderParams";
import "./UploaderWidget.scss";

interface Props {
  params: UploaderParamsRequired;
  reject: (error: Error) => void;
  resolve: (files: UploadedFile[]) => void;
  upload: Upload;
}

export const UploaderWidget = ({ resolve }: Props): JSX.Element => {
  return (
    <a
      className="test"
      onClick={e => {
        e.preventDefault();
        resolve([]);
      }}>
      Uploader Widget
    </a>
  );
};
