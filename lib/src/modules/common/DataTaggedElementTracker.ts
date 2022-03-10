export class DataTaggedElementTracker {
  private readonly seenElements = new WeakSet();
  private readonly bindInlineWidgetsDelay = 500;

  constructor(private readonly dataAttributes: string[], private readonly onFind: (element: HTMLElement) => void) {}

  findElementsAndMonitor(): void {
    // Performed after delay, since adding a 'MutationObserver' before the page has initially loaded can hinder page load times.
    setTimeout(() => {
      this.findElements();
      this.addDomMonitor();
    }, this.bindInlineWidgetsDelay);
  }

  private findElements(): void {
    this.dataAttributes.forEach(attr =>
      document.querySelectorAll(`[${attr}]`).forEach(x => this.raiseUnseenElement(x as HTMLElement))
    );
  }

  private addDomMonitor(): void {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutationRecord => {
        mutationRecord.addedNodes.forEach(node => {
          const element = node as Partial<HTMLElement> & Node;
          if (this.dataAttributes.some(x => element.hasAttribute?.(x) === true)) {
            this.raiseUnseenElement(element as HTMLElement);
          }
        });
      });
    });

    observer.observe(document, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: true,
      attributeOldValue: false,
      characterDataOldValue: false
    });
  }

  private raiseUnseenElement(element: HTMLElement): void {
    if (!this.seenElements.has(element)) {
      this.seenElements.add(element);
      this.onFind(element);
    }
  }
}
