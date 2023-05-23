import { JSX } from "preact";
import { SubmitButton } from "uploader/components/widgets/uploader/components/buttons/SubmitButton";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";

interface Props {
  onFinish: (keep: boolean) => Promise<void>;
  options: UploadWidgetConfigRequired;
}

export const ImageEditorButtons = ({ options, onFinish }: Props): JSX.Element => {
  const { locale } = options;

  return (
    <>
      <button
        onClick={() => {
          onFinish(false).then(
            () => {},
            e => {
              console.error("Unable to cancel upload.", e);
            }
          );
        }}
        className="btn">
        {locale.cancelInPreviewWindow}
      </button>
      <SubmitButton
        onSubmit={async () => await onFinish(true)}
        locale={locale}
        idleText={locale.continue}
        busyText={locale.pleaseWait}
        showIcon={false}
      />
    </>
  );
};
