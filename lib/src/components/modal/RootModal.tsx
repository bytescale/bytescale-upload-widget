import { JSX } from "preact";
import { useState } from "preact/compat";
import {
  UploaderOrConfigError,
  UploaderOrConfigErrorProps
} from "uploader/components/widgets/uploaderOrConfigError/UploaderOrConfigError";
import { Modal } from "uploader/components/modal/Modal";
import { UploadedFile } from "upload-js";
import "./Modal.scss";

interface Props extends UploaderOrConfigErrorProps {
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
      <UploaderOrConfigError {...props} resolve={resolve} reject={reject} />
    </Modal>
  );
};