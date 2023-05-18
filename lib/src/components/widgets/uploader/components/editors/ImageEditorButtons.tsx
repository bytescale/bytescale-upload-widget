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
    <div class="btn-group btn-group--space">
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
        idleText={options.multi ? locale.continue : locale.done}
        busyText={locale.pleaseWait}
        showIcon={false}
      />
    </div>
  );
};