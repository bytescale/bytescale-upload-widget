import { JSX } from "preact";
import { useState } from "preact/compat";
import {
  UploadWidgetContainer,
  UploadWidgetContainerProps
} from "@bytescale/upload-widget/components/widgets/uploadWidget/UploadWidgetContainer";
import { Modal } from "@bytescale/upload-widget/components/modal/Modal";
import "./Modal.scss";
import { UploadWidgetResult } from "@bytescale/upload-widget/model/UploadWidgetResult";

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
