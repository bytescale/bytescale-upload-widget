import { JSX } from "preact";
import { ReactNode } from "uploader/modules/common/React";
import { useEffect, useLayoutEffect, useState } from "preact/compat";
import { CloseSvg } from "uploader/assets/svgs/CloseSvg";
import "./Modal.scss";
import cn from "classnames";

interface Props {
  children: ReactNode;
  closeModal: () => void;
  onClosedModal: () => void;
}

const modalTransitionDuration = 250; // Actual CSS transition of 'fade' is 150ms, but we add 100ms for safety.
export const modalCloseButtonSize = 27;
export const modalCloseButtonPadding = 11;

export const Modal = ({ children, closeModal, onClosedModal }: Props): JSX.Element => {
  const [isClosed, setIsClosed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModalAsync, setShowModalAsync] = useState(false);
  const showModal = visible && !isClosed;

  const doClose = (): void => {
    setIsClosed(true);
  };

  useEffect(() => {
    if (!visible) {
      setVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!isClosed) {
      return;
    }
    const timeout = setTimeout(() => {
      closeModal();
    }, modalTransitionDuration);
    return () => clearTimeout(timeout);
  }, [isClosed]);

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

  useEffect(() => {
    if (showModal && !showModalAsync) {
      const f = window.requestAnimationFrame(function () {
        setShowModalAsync(true);
      });
      return () => window.cancelAnimationFrame(f);
    } else if (showModalAsync) {
      setShowModalAsync(false);
    }
  }, [showModal]);

  return (
    <>
      {showModal && <div className={cn("uploader__backdrop", { show: showModalAsync })} onClick={doClose} />}
      {showModal && (
        <div className={cn("uploader__modal", { show: showModalAsync })}>
          {children}
          <div className="uploader__modal__close">
            <a
              href="#close"
              onClick={e => {
                e.preventDefault();
                doClose();
              }}>
              <CloseSvg width={modalCloseButtonSize} />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
