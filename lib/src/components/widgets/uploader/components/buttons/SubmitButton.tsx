import { JSX } from "preact";
import { UploaderLocale } from "uploader";
import { useState } from "preact/compat";
import { useTransientFlag } from "uploader/modules/FormUtils";

interface Props {
  busyText: string;
  idleText: string;
  locale: UploaderLocale;
  onSubmit: () => Promise<void>;
}

export const SubmitButton = ({ busyText, idleText, locale, onSubmit }: Props): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useTransientFlag();

  const submitAsync = (e: Event): void => {
    e.preventDefault();

    setIsSubmitting(true);

    onSubmit().then(
      () => {},
      e => {
        console.error(e);
        setIsError();
        setIsSubmitting(false);
      }
    );
  };

  return (
    <button disabled={isSubmitting || isError} onClick={submitAsync} className="btn btn--primary">
      {isSubmitting ? busyText : isError ? locale["error!"] : idleText}
    </button>
  );
};
