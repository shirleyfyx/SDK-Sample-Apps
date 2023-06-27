"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutOption = exports.Service = void 0;
const widget_1 = __importDefault(require("./widget"));
/**
 * Dashboard service.
 */
var Service;
(function (Service) {
    /** None */
    Service["None"] = "";
    /** Team (Chat) */
    Service["Team"] = "Team";
    /** Drive (Content Library) */
    Service["Drive"] = "Drive";
    /** Contacts (Address Book) */
    Service["Contacts"] = "Contacts";
})(Service = exports.Service || (exports.Service = {}));
/**
 * Dashboard service layout options.
 */
var LayoutOption;
(function (LayoutOption) {
    /** Full UI (default) */
    LayoutOption["full"] = "full";
    /** Only the list (sidebar), applicable to Team and Drive */
    LayoutOption["list"] = "list";
    /** Only the main content, applicable to Team and Drive */
    LayoutOption["main"] = "main";
    /** No UI */
    LayoutOption["none"] = "none";
})(LayoutOption = exports.LayoutOption || (exports.LayoutOption = {}));
/**
 * Callbridge Dashboard.
 */
class Dashboard extends widget_1.default {
    constructor(
    /**
     * Widget options
     */
    options, 
    /**
     * Optional, the page to load after logging in
     */
    service = Service.None, 
    /**
     * Optional, service options.
     */
    serviceOptions = {}) {
        super(options);
        switch (service) {
            case Service.Team:
            case Service.Drive:
            case Service.Contacts:
                this.once('dashboard.READY', () => this.load(service, serviceOptions));
                break;
        }
        this._load({
            redirect_url: `/conf/loading`,
        });
    }
    /**
     * Loads the service.
     * @param service the service to load.
     * @param options Optional, service options.
     */
    load(service, options = {}) {
        this._send('dashboard', 'load', Object.assign({ service }, options));
    }
}
exports.default = Dashboard;
