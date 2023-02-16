import { JSX } from "preact";

const Link = ({
  prefix,
  suffix,
  text,
  url
}: {
  prefix: string;
  suffix: string;
  text: string;
  url: string;
}): JSX.Element => (
  <>
    {prefix}{" "}
    <a href={url} target="_blank" rel="noopener">
      {text}
    </a>{" "}
    {suffix}
  </>
);

function replaceFirstLink(text: string): JSX.Element | undefined {
  const matches = /^(.*?)(https?:\/\/[^\s)]+)(.*?)$/.exec(text);
  if (matches === null) {
    return undefined;
  }

  const prefix = matches[1];
  const url = matches[2];
  const suffix = matches[3];

  return <Link text={url} url={url} prefix={prefix} suffix={suffix} />;
}

function replaceUploadIo(text: string): JSX.Element | undefined {
  const find = "upload.io";
  const index = text.toLowerCase().indexOf(find);
  if (index === -1) {
    return undefined;
  }

  return (
    <Link
      text="Upload.io"
      url={"https://upload.io/pricing"}
      prefix={text.substring(0, index)}
      suffix={text.substring(index + find.length)}
    />
  );
}

export const Hypermedia = ({ text }: { text: string }): JSX.Element =>
  replaceFirstLink(text) ?? replaceUploadIo(text) ?? <>{text}</>;
