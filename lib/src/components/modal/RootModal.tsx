import { JSX } from "preact";
import { useState } from "preact/compat";
import { UploaderRoot, UploaderRootProps } from "uploader/components/widgets/uploaderRoot/UploaderRoot";
import { Modal } from "uploader/components/modal/Modal";
import { UploadedFile } from "upload-js";
import "./Modal.scss";

interface Props extends UploaderRootProps {
  container: Element;
}

export const RootModal = (props: Props): JSX.Element => {
  // NEVER call without resolving or rejecting the promise, as will cause a hanging promise.
  const [isOpen, setIsOpen] = useState(true);

  const resolve = (files: UploadedFile[]): void => {
    props.resolve(files);
    setIsOpen(false);
  };

  const reject = (error: Error): void => {
    props.reject(error);
    setIsOpen(false);
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <Modal onClosedModal={() => props.container.remove()} closeModal={() => resolve([])}>
      <UploaderRoot {...props} resolve={resolve} reject={reject} />
    </Modal>
  );
};
