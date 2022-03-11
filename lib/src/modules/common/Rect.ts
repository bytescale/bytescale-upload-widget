import { JSX } from "preact";

export interface Rect {
  height: number;
  width: number;
}

export interface RectWithPos extends Rect {
  x: number;
  y: number;
}

export namespace RectWithPos {
  export function toCssProps(r: RectWithPos): Partial<JSX.CSSProperties> {
    return {
      width: r.width,
      height: r.height,
      left: r.x,
      top: r.y
    };
  }
}
