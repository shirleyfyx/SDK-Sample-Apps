/**
 * Widget options.
 */
export type WidgetOptions = {
    /**
     * The container for the widget.
     * Supports attached or detached DOM element, document selector, or `window` (new tab).
     * If the element is detached, it will be set to invisible and attached to the main document.
     */
    container: Window | HTMLElement | string | null;
    /**
     * The Callbridge domain of the user.
     */
    domain: string;
    /**
     * Optional, Single Sign-On
     */
    sso?: {
        /**
         * Optional host-specific authorization token.
         */
        token?: string;
        /**
         * Optional account number of the user.
         */
        hostId?: number;
    };
    /**
     * Optional, options for `window.open` when `container` is `window`. @see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/open).
     */
    target?: {
        /**
         * The window target name.
         */
        name?: string;
        /**
         * The window features.
         */
        features?: string;
        /**
         * Whether to close the popup when the meeting is over.
         */
        autoClose?: boolean;
    };
};
type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type Listener<T> = (params: T) => void;
interface WidgetEventEmitter<T extends EventMap> {
    on<K extends EventKey<T>>(eventName: K, listener: Listener<T[K]>): this;
    off<K extends EventKey<T>>(eventName: K, listener: Listener<T[K]>): this;
    once<K extends EventKey<T>>(eventName: K, listener: Listener<T[K]>): this;
    emit<K extends EventKey<T>>(eventName: K, data?: T[K]): boolean;
    removeAllListeners<K extends EventKey<T>>(eventName: K, data: T[K]): this;
}
/**
 * Callbridge Widget.
 */
export default class Widget<T extends EventMap | {
    'widget.LOAD': void;
    'widget.UNLOAD': void;
    'widget.ERROR': string;
}> implements WidgetEventEmitter<T> {
    private emitter;
    constructor({ container, domain, sso, target: { name, features } }: WidgetOptions, autoLoad?: boolean);
    /**
     * Unloads the widget by removing the iframe or close the tab/window.
     */
    unload(): void;
    /**
     * Toggles the visibility of the widget on the page.
     *
     * Not available for pop-up.
     *
     * @param visible whether the widget should be visible
     */
    toggle(visible: boolean): void;
    /**
     * Whether the widget is ready.
     */
    get isReady(): boolean;
    /**
     * The widget instance.
     */
    get instance(): Window | HTMLIFrameElement | null;
    /**
     * The Window or WindowProxy instance of the widget.
     */
    get wnd(): Window | null;
    /**
     * Adds the `listener` function to the end of the listeners array for the event named `eventName`.
     */
    on<K extends EventKey<T>>(eventName: K, listener: Listener<T[K]>): this;
    /**
     * Removes the specified `listener` from the listener array for the event named `eventName`.
     */
    off<K extends EventKey<T>>(eventName: K, listener: Listener<T[K]>): this;
    /**
     * Adds a one-timelistener function for the event named eventName.
     * The next time eventName is triggered, this listener is removed and then invoked.
     */
    once<K extends EventKey<T>>(eventName: K, listener: Listener<T[K]>): this;
    /**
     * Synchronously calls each of the listeners registered for the event namedeventName,
     * in the order they were registered, passing the supplied arguments to each.
     * Returns true if the event had listeners, false otherwise.
     */
    emit<K extends EventKey<T>>(eventName: K, data?: T[K]): boolean;
    /**
     * Removes all listeners, or those of the specified `eventName`.
     *
     * It is bad practice to remove listeners added elsewhere in the code,
     * particularly when the instance was created by some other component or module.
     */
    removeAllListeners(event?: string | symbol | undefined): this;
}
export {};
