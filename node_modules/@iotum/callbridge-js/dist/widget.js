"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const FramePermissionsPolicy = [
    'camera',
    'microphone',
    'autoplay',
    'fullscreen',
    'display-capture',
].join(';');
function createInstance(container, url, { target, features }) {
    if (container instanceof Window) {
        return container.open(url, target, features);
    }
    const attached = document.body.contains(container);
    if (!attached) {
        // nothing will happen if the iframe is not attached to the document
        document.body.appendChild(container);
    }
    const instance = document.createElement('iframe');
    Object.assign(instance.style, Object.assign(Object.assign({}, getStyles(attached)), { border: 'none', width: '100%', height: '100%' }));
    container.appendChild(Object.assign(instance, {
        allow: FramePermissionsPolicy,
        src: url,
    }));
    return instance;
}
function getStyles(visible) {
    return { display: visible ? 'block' : 'none' };
}
function setParams(url, params) {
    for (const opt of Object.keys(params)) {
        const val = params[opt];
        if (val !== undefined && val !== null) {
            url.searchParams.set(opt, String(val));
        }
    }
    // Always enable events
    url.searchParams.set('events', 'true');
}
/**
 * Callbridge Widget.
 */
class Widget {
    constructor({ container, domain, sso, target: { name, features } = {} }, autoLoad = false) {
        this.emitter = new events_1.EventEmitter();
        /** @internal */
        this._container = null;
        /** @internal */
        this._instance = null;
        /** @internal */
        this._ready = false;
        /** @internal */
        this._load = (params) => {
            if (!this._container || this._instance) {
                return;
            }
            if (typeof params.redirect_url === 'string') {
                // update params against redirect_url (instead of the iframe url)
                const redirectUrl = new URL(params.redirect_url, this._url);
                setParams(redirectUrl, Object.assign(Object.assign({}, params), { redirect_url: null }));
                const isSSO = this._url.pathname === '/auth';
                if (isSSO) {
                    setParams(this._url, {
                        redirect_url: `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`,
                    });
                }
                else {
                    this._url = redirectUrl;
                }
            }
            else {
                setParams(this._url, params);
            }
            this._instance = createInstance(this._container, this._url.href, {
                target: this._target,
                features: this._features,
            });
            if (this._instance) {
                this._instance.onerror = (ev) => {
                    this._error = ev;
                    this.emit('widget.ERROR', ev instanceof Error ? ev.message : ev);
                };
            }
            else {
                this.emit('widget.ERROR', 'Unable to open');
            }
        };
        /** @internal */
        this._processEvent = ({ data, source }) => {
            if (source === this.wnd) {
                const { type, event } = data, extra = __rest(data, ["type", "event"]);
                if (type && event) {
                    switch (event) {
                        case 'READY':
                            // the bi-di messaging channel is ready
                            this._ready = true;
                            this.emit('widget.LOAD');
                            break;
                        case 'UNLOAD':
                            this.unload();
                            this.emit('widget.UNLOAD');
                            break;
                        default:
                            break;
                    }
                    this.emit(`${type}.${event}`, extra);
                }
            }
        };
        /** @internal */
        this._send = (type, action, data = {}) => {
            var _a;
            (_a = this.wnd) === null || _a === void 0 ? void 0 : _a.postMessage(Object.assign({ type,
                action }, data), '*');
        };
        if (container) {
            if (typeof container === 'string') {
                this._container = document.querySelector(container);
            }
            else {
                this._container = container;
            }
        }
        if (!this._container) {
            throw new Error('Unable to locate the container element');
        }
        this._url = new URL(`https://${domain}`);
        if (sso) {
            const { hostId, token } = sso;
            if (!hostId || !token) {
                throw new Error('Missing SSO parameters');
            }
            this._url.pathname = '/auth';
            this._url.searchParams.set('host_id', String(hostId));
            this._url.searchParams.set('login_token_public_key', token);
        }
        window.addEventListener('message', this._processEvent);
        this._target = name;
        this._features = features;
        if (autoLoad) {
            this._load({ redirect_url: '/page_to_see' });
        }
    }
    /**
     * Unloads the widget by removing the iframe or close the tab/window.
     */
    unload() {
        var _a;
        window.removeEventListener('message', this._processEvent);
        if (this._instance) {
            if (this._instance instanceof Element) {
                if (this._instance.style.display === 'none') {
                    // detach from DOM
                    (_a = this._instance.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                }
                this._instance.remove();
            }
            else {
                this._instance.close();
            }
            this._instance = null;
        }
        this._ready = false;
    }
    /**
     * Toggles the visibility of the widget on the page.
     *
     * Not available for pop-up.
     *
     * @param visible whether the widget should be visible
     */
    toggle(visible) {
        if (this._instance instanceof HTMLElement) {
            Object.assign(this._instance.style, getStyles(visible));
        }
    }
    /**
     * Whether the widget is ready.
     */
    get isReady() {
        return this._ready;
    }
    /**
     * The widget instance.
     */
    get instance() {
        return this._instance;
    }
    /**
     * The Window or WindowProxy instance of the widget.
     */
    get wnd() {
        if (this._instance) {
            return this._instance instanceof Element
                ? this._instance.contentWindow
                : this._instance;
        }
        return null;
    }
    /**
     * Adds the `listener` function to the end of the listeners array for the event named `eventName`.
     */
    on(eventName, listener) {
        this.emitter.on(eventName, listener);
        return this;
    }
    /**
     * Removes the specified `listener` from the listener array for the event named `eventName`.
     */
    off(eventName, listener) {
        this.emitter.off(eventName, listener);
        return this;
    }
    /**
     * Adds a one-timelistener function for the event named eventName.
     * The next time eventName is triggered, this listener is removed and then invoked.
     */
    once(eventName, listener) {
        this.emitter.once(eventName, listener);
        return this;
    }
    /**
     * Synchronously calls each of the listeners registered for the event namedeventName,
     * in the order they were registered, passing the supplied arguments to each.
     * Returns true if the event had listeners, false otherwise.
     */
    emit(eventName, data) {
        return this.emitter.emit(eventName, data);
    }
    /**
     * Removes all listeners, or those of the specified `eventName`.
     *
     * It is bad practice to remove listeners added elsewhere in the code,
     * particularly when the instance was created by some other component or module.
     */
    removeAllListeners(event) {
        this.emitter.removeAllListeners(event);
        return this;
    }
}
exports.default = Widget;
