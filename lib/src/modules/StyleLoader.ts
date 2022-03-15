export function loadStyles(styles: { use: () => void }): void {
  if (typeof document !== "undefined") {
    styles.use();
  }
}
