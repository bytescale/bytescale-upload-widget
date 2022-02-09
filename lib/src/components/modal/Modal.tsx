import { JSX } from "preact";
import { ReactNode } from "uploader/common/React";
import { useLayoutEffect } from "preact/compat";
import "./Modal.scss";

interface Props {
  children: ReactNode;
  closeModal: () => void;
  onClosedModal: () => void;
}

export const Modal = ({ children, closeModal, onClosedModal }: Props): JSX.Element => {
  useLayoutEffect(() => {
    const oldHtmlClass = document.documentElement.className;
    const oldBodyClass = document.body.className;
    document.documentElement.className = `${oldHtmlClass} uploader__html`;
    document.body.className = `${oldBodyClass} uploader__body`;
    return () => {
      document.documentElement.className = oldHtmlClass;
      document.body.className = oldBodyClass;
      onClosedModal();
    };
  }, []);

  return (
    <>
      <div className="uploader__backdrop" onClick={closeModal} />
      <div className="uploader__modal">{children}</div>
    </>
  );
};