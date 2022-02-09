import { JSX } from "preact";

interface Props {
  error: Error;
}

export const ConfigError = ({ error }: Props): JSX.Element => (
  <>
    <p>
      <strong>Invalid configuration:</strong>
    </p>
    <p>{(error.message ?? "unknown error").replace("[upload-js] ", "")}</p>
  </>
);
