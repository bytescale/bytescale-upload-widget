import { JSX } from "preact";
import { useState } from "preact/compat";
import { UploadWidgetContainer, UploaderRootProps } from "uploader/components/widgets/uploader/UploadWidgetContainer";
import { Modal } from "uploader/components/modal/Modal";
import "./Modal.scss";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";

interface Props extends UploaderRootProps {
  container: Element;
}

export const RootModal = (props: Props): JSX.Element => {
  // NEVER call without resolving or rejecting the promise, as will cause a hanging promise.
  const [isOpen, setIsOpen] = useState(true);

  const resolve = (files: UploadWidgetResult[]): void => {
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
      <UploadWidgetContainer {...props} resolve={resolve} reject={reject} />
    </Modal>
  );
};
