import { JSX } from "preact";

interface Props {
  imageUrl: string;
}

export const UploaderImageEditor = ({ imageUrl }: Props): JSX.Element => (
  <>
    <img src={imageUrl} alt="Uploaded image" />
  </>
);
