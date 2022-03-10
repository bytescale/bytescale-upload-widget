import { JSX } from "preact";
import { useState } from "preact/compat";
import cn from "classnames";
import { FileInputChangeEvent } from "uploader/modules/common/FileInputChangeEvent";

export const UploadButton = ({
  className,
  multi,
  onUpload,
  text
}: {
  className?: string;
  multi: boolean;
  onUpload: (files: File[]) => void;
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
        type="file"
        className="btn--file__input"
        {...(multi ? { multiple: true } : {})}
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
