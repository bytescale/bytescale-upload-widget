import { JSX } from "preact";
import { useState } from "preact/compat";
import {
  UploadWidgetContainer,
  UploadWidgetContainerProps
} from "uploader/components/widgets/uploader/UploadWidgetContainer";
import { Modal } from "uploader/components/modal/Modal";
import "./Modal.scss";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";

interface Props {
  widgetProps: UploadWidgetContainerProps;
}

export const ModalContainer = ({ widgetProps }: Props): JSX.Element => {
  // NEVER call without resolving or rejecting the promise, as will cause a hanging promise.
  const [isOpen, setIsOpen] = useState(true);

  const resolve = (files: UploadWidgetResult[]): void => {
    widgetProps.resolve(files);
    setIsOpen(false);
  };

  const reject = (error: Error): void => {
    widgetProps.reject(error);
    setIsOpen(false);
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <Modal closeModal={() => resolve([])}>
      <UploadWidgetContainer {...widgetProps} resolve={resolve} reject={reject} />
    </Modal>
  );
};