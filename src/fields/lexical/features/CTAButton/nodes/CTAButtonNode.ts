import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical'

import { DecoratorNode } from 'lexical'

export type CTAButtonAppearance = 'primary' | 'secondary' | 'outline' | 'ghost'

export type SerializedCTAButtonNode = Spread<
  {
    label: string
    href: string
    appearance: CTAButtonAppearance
    openInNewTab?: boolean
  },
  SerializedLexicalNode
>

export class CTAButtonNode extends DecoratorNode<HTMLElement> {
  __label: string
  __href: string
  __appearance: CTAButtonAppearance
  __openInNewTab: boolean

  static getType(): string {
    return 'ctaButton'
  }

  static clone(node: CTAButtonNode): CTAButtonNode {
    return new CTAButtonNode(
      node.__label,
      node.__href,
      node.__appearance,
      node.__openInNewTab,
      node.__key,
    )
  }

  constructor(
    label: string,
    href: string,
    appearance: CTAButtonAppearance = 'primary',
    openInNewTab: boolean = false,
    key?: NodeKey,
  ) {
    super(key)
    this.__label = label
    this.__href = href
    this.__appearance = appearance
    this.__openInNewTab = openInNewTab
  }

  static importJSON(serializedNode: SerializedCTAButtonNode): CTAButtonNode {
    const { label, href, appearance, openInNewTab } = serializedNode
    return $createCTAButtonNode({
      label,
      href,
      appearance,
      openInNewTab,
    })
  }

  exportJSON(): SerializedCTAButtonNode {
    return {
      label: this.__label,
      href: this.__href,
      appearance: this.__appearance,
      openInNewTab: this.__openInNewTab,
      type: 'ctaButton',
      version: 1,
    }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      a: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-cta-button')) {
          return null
        }
        return {
          conversion: convertCTAButtonElement,
          priority: 1,
        }
      },
    }
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('a')
    element.setAttribute('href', this.__href)
    element.setAttribute('data-cta-button', 'true')
    element.setAttribute('data-appearance', this.__appearance)
    if (this.__openInNewTab) {
      element.setAttribute('target', '_blank')
      element.setAttribute('rel', 'noopener noreferrer')
    }
    element.textContent = this.__label
    return { element }
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span')
    span.className = 'inline-cta-button'
    span.setAttribute('data-appearance', this.__appearance)
    return span
  }

  updateDOM(): false {
    return false
  }

  getLabel(): string {
    return this.__label
  }

  getHref(): string {
    return this.__href
  }

  getAppearance(): CTAButtonAppearance {
    return this.__appearance
  }

  getOpenInNewTab(): boolean {
    return this.__openInNewTab
  }

  setLabel(label: string): void {
    const writable = this.getWritable()
    writable.__label = label
  }

  setHref(href: string): void {
    const writable = this.getWritable()
    writable.__href = href
  }

  setAppearance(appearance: CTAButtonAppearance): void {
    const writable = this.getWritable()
    writable.__appearance = appearance
  }

  setOpenInNewTab(openInNewTab: boolean): void {
    const writable = this.getWritable()
    writable.__openInNewTab = openInNewTab
  }

  decorate(): HTMLElement {
    const span = document.createElement('span')
    span.className = `inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${getAppearanceClasses(this.__appearance)}`
    span.setAttribute('data-cta-button', 'true')
    span.textContent = this.__label
    return span
  }

  isInline(): boolean {
    return true
  }

  isIsolated(): boolean {
    return true
  }

  isKeyboardSelectable(): boolean {
    return true
  }
}

function convertCTAButtonElement(domNode: HTMLElement): DOMConversionOutput | null {
  const label = domNode.textContent || ''
  const href = domNode.getAttribute('href') || ''
  const appearance = (domNode.getAttribute('data-appearance') as CTAButtonAppearance) || 'primary'
  const openInNewTab = domNode.getAttribute('target') === '_blank'

  if (label && href) {
    const node = $createCTAButtonNode({ label, href, appearance, openInNewTab })
    return { node }
  }

  return null
}

function getAppearanceClasses(appearance: CTAButtonAppearance): string {
  switch (appearance) {
    case 'primary':
      return 'bg-sh-primary text-white hover:bg-sh-primary-soft'
    case 'secondary':
      return 'bg-sh-gold text-sh-primary hover:bg-sh-gold/90'
    case 'outline':
      return 'border-2 border-sh-primary text-sh-primary hover:bg-sh-primary/10'
    case 'ghost':
      return 'text-sh-primary hover:bg-sh-primary/10'
    default:
      return 'bg-sh-primary text-white hover:bg-sh-primary-soft'
  }
}

export function $createCTAButtonNode({
  label,
  href,
  appearance = 'primary',
  openInNewTab = false,
}: {
  label: string
  href: string
  appearance?: CTAButtonAppearance
  openInNewTab?: boolean
}): CTAButtonNode {
  return new CTAButtonNode(label, href, appearance, openInNewTab)
}

export function $isCTAButtonNode(node: LexicalNode | null | undefined): node is CTAButtonNode {
  return node instanceof CTAButtonNode
}
