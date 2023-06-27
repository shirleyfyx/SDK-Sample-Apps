import Widget, { WidgetOptions } from './widget';
/**
 * Dashboard service.
 */
export declare enum Service {
    /** None */
    None = "",
    /** Team (Chat) */
    Team = "Team",
    /** Drive (Content Library) */
    Drive = "Drive",
    /** Contacts (Address Book) */
    Contacts = "Contacts"
}
/**
 * Dashboard service layout options.
 */
export declare enum LayoutOption {
    /** Full UI (default) */
    full = "full",
    /** Only the list (sidebar), applicable to Team and Drive */
    list = "list",
    /** Only the main content, applicable to Team and Drive */
    main = "main",
    /** No UI */
    none = "none"
}
/**
 * Dashboard service options.
 */
export type ServiceOptions = {
    /**
     * The initial path to load.
     */
    pathname?: string;
    /**
     * The service layout.
     */
    layout?: LayoutOption;
};
/**
 * Callbridge Dashboard.
 */
export default class Dashboard extends Widget<{
    'dashboard.READY': void;
    'dashboard.NAVIGATE': {
        service: Service;
        pathname: string;
        search: string;
        hash: string;
    };
}> {
    constructor(
    /**
     * Widget options
     */
    options: WidgetOptions, 
    /**
     * Optional, the page to load after logging in
     */
    service?: Service, 
    /**
     * Optional, service options.
     */
    serviceOptions?: ServiceOptions);
    /**
     * Loads the service.
     * @param service the service to load.
     * @param options Optional, service options.
     */
    load(service: Service, options?: ServiceOptions): void;
}
