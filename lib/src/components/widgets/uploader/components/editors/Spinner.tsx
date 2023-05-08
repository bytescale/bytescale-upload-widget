import { JSX } from "preact";
import "./Spinner.scss";
import { getElementDimensionsOnResize } from "uploader/modules/common/UseDimensionsFromElement";

export const Spinner = (): JSX.Element => {
  const [dimensions, containerRef] = getElementDimensionsOnResize(true, []);
  const relativeSize = 0.5;
  const lowestDim = Math.min(dimensions?.width ?? 0, dimensions?.height ?? 0);
  const lowestDimCss = `${Math.round(lowestDim * relativeSize)}px`;

  return (
    <div class="spinner__container" ref={containerRef}>
      <div className="spinner" style={{ width: lowestDimCss, height: lowestDimCss }}></div>
    </div>
  );
};
