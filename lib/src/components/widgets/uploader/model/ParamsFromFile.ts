// Full Definition: https://github.com/upload-io/upload-image-plugin/blob/main/src/types/ParamsFromFile.ts
export interface ParamsFromFile {
  input: string;
  pipeline: {
    steps: Array<{
      geometry: { offset: { x: number; y: number }; size: { height: number; type: string; width: number } };
      type: string;
    }>;
  };
}
