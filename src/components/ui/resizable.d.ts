import * as ResizablePrimitive from "react-resizable-panels";
declare const ResizablePanelGroup: ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => import("react").JSX.Element;
declare const ResizablePanel: import("react").ForwardRefExoticComponent<Omit<import("react").HTMLAttributes<HTMLElement | HTMLAnchorElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLDataElement | HTMLDataListElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLModElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMetaElement | HTMLMeterElement | HTMLObjectElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPreElement | HTMLProgressElement | HTMLQuoteElement | HTMLSlotElement | HTMLScriptElement | HTMLSelectElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableColElement | HTMLTableCellElement | HTMLTableRowElement | HTMLTableSectionElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement | HTMLTableCaptionElement | HTMLMenuElement | HTMLPictureElement>, "id" | "onResize"> & {
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: ResizablePrimitive.PanelOnCollapse | undefined;
    onExpand?: ResizablePrimitive.PanelOnExpand | undefined;
    onResize?: ResizablePrimitive.PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<ResizablePrimitive.ImperativePanelHandle>>;
declare const ResizableHandle: ({ withHandle, className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}) => import("react").JSX.Element;
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
