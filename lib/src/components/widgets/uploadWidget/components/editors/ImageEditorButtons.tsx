import { JSX } from "preact";
import { SubmitButton } from "@bytescale/upload-widget/components/widgets/uploadWidget/components/buttons/SubmitButton";
import { UploadWidgetConfigRequired } from "@bytescale/upload-widget/config/UploadWidgetConfig";

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
        className="btn"
      >
        {locale.cancelPreviewBtn}
      </button>
      <SubmitButton
        onSubmit={async () => await onFinish(true)}
        locale={locale}
        idleText={locale.continueBtn}
        busyText={locale.submitBtnLoading}
        showIcon={false}
      />
    </>
  );
};
