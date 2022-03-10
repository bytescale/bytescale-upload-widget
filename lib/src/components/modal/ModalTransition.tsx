import { CSSTransition } from "react-transition-group";
import { ReactNode } from "uploader/modules/common/React";

export const modalTransitionDuration = 250; // Actual CSS transition of 'fade' is 150ms, but we add 100ms for safety.
export const modalTransitionClasses = {
  enterActive: "show",
  enterDone: "show"
};

interface Props {
  children: ReactNode;
  isOpen: boolean;
}

export const ModalTransition = ({ children, isOpen }: Props): JSX.Element => (
  <CSSTransition in={isOpen} timeout={modalTransitionDuration} classNames={modalTransitionClasses}>
    {children}
  </CSSTransition>
);
