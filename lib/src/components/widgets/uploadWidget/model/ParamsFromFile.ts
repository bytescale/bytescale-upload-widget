// Full Definition: https://github.com/bytescale/upload-image-plugin/blob/main/src/types/ParamsFromFile.ts
export interface ParamsFromFile {
  inputPath: string;
  pipeline: {
    steps: Array<{
      geometry: { offset: { x: number; y: number }; size: { height: number; type: string; width: number } };
      type: string;
    }>;
  };
}
