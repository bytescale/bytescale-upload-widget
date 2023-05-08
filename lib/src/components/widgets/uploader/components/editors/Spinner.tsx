import { JSX } from "preact";
import "./Spinner.scss";

export const Spinner = (): JSX.Element => (
  <div class="spinner__container">
    <div className="spinner"></div>
  </div>
);
