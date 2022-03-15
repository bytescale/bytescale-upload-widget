import { JSX } from "preact";
import { Rect, RectWithPos } from "uploader/modules/common/Rect";
import { useLayoutEffect, useState } from "preact/compat";
import "./ResizableSquare.scss";
import { Draggable } from "uploader/components/common/Draggable";

interface Props {
  boundary: Rect;
  children: JSX.Element;
  onResized: (geometry: { boundary: Rect; geometry: RectWithPos } | undefined) => void;
  ratio: number | undefined; // width / height | undefined for free-form
}

type Corner = "nw" | "ne" | "se" | "sw";
type ReRatioMode = Corner | "center";

const CornerDragger = ({
  corner,
  geometry,
  setGeometry
}: {
  corner: Corner;
  geometry: RectWithPos;
  setGeometry: (corner: Corner, geometry: RectWithPos) => void;
}): JSX.Element => {
  return (
    <Draggable
      className={`uploader__resizable-square__${corner}`}
      startingValue={geometry}
      onMove={(x, y, g) =>
        setGeometry(corner, {
          x: corner === "nw" || corner === "sw" ? g.x + x : g.x,
          y: corner === "nw" || corner === "ne" ? g.y + y : g.y,
          width: corner === "nw" || corner === "sw" ? g.width - x : g.width + x,
          height: corner === "nw" || corner === "ne" ? g.height - y : g.height + y
        })
      }
    />
  );
};

export const ResizableSquare = ({ boundary, ratio, onResized, children }: Props): JSX.Element => {
  const minSize = 50;
  const reRatio = (g: RectWithPos, fixed: ReRatioMode): RectWithPos => {
    if (ratio === undefined) {
      return g;
    }
    const width = Math.min(g.height * ratio, g.width);
    const height = width / ratio;

    return {
      height,
      width,
      x:
        fixed === "ne" || fixed === "se"
          ? g.x
          : fixed === "center"
          ? g.x + g.width / 2 - width / 2
          : g.x + (g.width - width),
      y:
        fixed === "sw" || fixed === "se"
          ? g.y
          : fixed === "center"
          ? g.y + g.height / 2 - height / 2
          : g.y + (g.height - height)
    };
  };
  const clip = (g: RectWithPos): RectWithPos => {
    const x = Math.min(boundary.width - minSize, Math.max(0, g.x)); // x is clipped, but width may continue to grow. We should deduct from width the amount that's clipped?
    const y = Math.min(boundary.height - minSize, Math.max(0, g.y));
    const xClip = Math.min(0, g.x);
    const yClip = Math.min(0, g.y);
    return {
      x,
      y,
      width: Math.max(minSize, Math.min(g.width + xClip, boundary.width - x)),
      height: Math.max(minSize, Math.min(g.height + yClip, boundary.height - y))
    };
  };
  const clipAndReRatio = (g: RectWithPos, fixed: ReRatioMode): RectWithPos => reRatio(clip(g), fixed);
  const [geometry, setGeometryUnsafe] = useState(
    clipAndReRatio({ x: 0, y: 0, width: boundary.width, height: boundary.height }, "center")
  );
  const setGeometry = (corner: ReRatioMode, set: RectWithPos): void => setGeometryUnsafe(clipAndReRatio(set, corner));

  const onGeometryChange = (): void => {
    const isSameAsBoundary =
      geometry.x === 0 && geometry.y === 0 && geometry.width === boundary.width && geometry.height === boundary.height;
    onResized(isSameAsBoundary ? undefined : { geometry, boundary });
  };

  useLayoutEffect(onGeometryChange, [geometry]);

  useLayoutEffect(() => {
    // Resize the cropper if the container is resized.
    setGeometry("center", geometry);
    onGeometryChange();
  }, [boundary]);

  return (
    <Draggable
      className="uploader__resizable-square"
      style={RectWithPos.toCssProps(geometry)}
      startingValue={geometry}
      onMove={(x, y, g) =>
        setGeometry("center", {
          x: g.x + x,
          y: g.y + y,
          width: g.width,
          height: g.height
        })
      }>
      {children}
      <CornerDragger corner="nw" setGeometry={setGeometry} geometry={geometry} />
      <CornerDragger corner="ne" setGeometry={setGeometry} geometry={geometry} />
      <CornerDragger corner="se" setGeometry={setGeometry} geometry={geometry} />
      <CornerDragger corner="sw" setGeometry={setGeometry} geometry={geometry} />
    </Draggable>
  );
};
