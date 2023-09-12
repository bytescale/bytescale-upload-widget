import { JSX } from "preact";
import { ReactNode } from "@bytescale/upload-widget/modules/common/React";
import { useEffect, useLayoutEffect, useState } from "preact/compat";
import { CloseSvg } from "@bytescale/upload-widget/assets/svgs/CloseSvg";
import "./Modal.scss";
import cn from "classnames";

interface Props {
  children: ReactNode;
  closeModal: () => void;
}

const modalTransitionDuration = 250; // Actual CSS transition of 'fade' is 150ms, but we add 100ms for safety.
export const modalCloseButtonSize = 27;
export const modalCloseButtonPadding = 11;

export const Modal = ({ children, closeModal }: Props): JSX.Element => {
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
    document.documentElement.className = `${oldHtmlClass} upload-widget__html`;
    document.body.className = `${oldBodyClass} upload-widget__body`;
    return () => {
      document.documentElement.className = oldHtmlClass;
      document.body.className = oldBodyClass;
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

  // 'onMouseDown' vs 'onClick':
  // When cropping an image, if we start a crop then release the mouse button outside the modal, it appears to register
  // as an 'onClick', so we use 'onMouseDown' to fix this.
  return (
    <>
      {showModal && <div className={cn("upload-widget__backdrop", { show: showModalAsync })} onMouseDown={doClose} />}
      {showModal && (
        <div className={cn("upload-widget__modal", { show: showModalAsync })}>
          {children}
          <div className="upload-widget__modal__close">
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
