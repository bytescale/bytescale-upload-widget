import { JSX } from "preact";
import { useState } from "preact/compat";
import cn from "classnames";
import { FileInputChangeEvent } from "uploader/modules/common/FileInputChangeEvent";
import { UploadWidgetConfigRequired } from "uploader/config/UploadWidgetConfig";

export const UploadButton = ({
  className,
  options,
  onUpload,
  text
}: {
  className?: string;
  onUpload: (files: File[]) => void;
  options: UploadWidgetConfigRequired;
  text: string;
}): JSX.Element => {
  const [fileInputKey] = useState(Math.random());
  const [inputId] = useState(`uploader__input-${Math.round(Math.random() * 1000000)}`);

  return (
    <label className={cn("btn btn--file", className)} htmlFor={inputId}>
      {text}

      <input
        key={fileInputKey}
        id={inputId}
        name={inputId}
        accept={options.mimeTypes?.join(",")}
        type="file"
        className="btn--file__input"
        {...(options.multi ? { multiple: true } : {})}
        onChange={
          ((e: FileInputChangeEvent): void => {
            const input = e.target;
            const files = Array.from(input.files ?? undefined ?? []);
            if (files.length > 0) {
              onUpload(files);
            }
          }) as any
        }
      />
    </label>
  );
};
