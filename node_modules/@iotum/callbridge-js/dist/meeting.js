"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = __importDefault(require("./room"));
/**
 * Callbridge Meeting Room.
 */
class Meeting extends room_1.default {
    constructor(
    /**
     * Widget options
     */
    options, 
    /**
     * The room to join
     */
    roomId, 
    /**
     * Meeting options
     */
    meetingOptions = {}) {
        super(options);
        const { target: { autoClose } = {} } = options;
        const { name, skipJoin, mute: { mic: muteMic, camera: muteCamera } = {}, observer, moderatorToken, resolution, view, tiles, audioLevel, stripLayout, autoView, afterCallUrl, } = meetingOptions;
        this._load({
            redirect_url: `/conf/call/${roomId}`,
            name,
            skip_join: skipJoin,
            observer,
            moderator_token: moderatorToken,
            res: resolution,
            view,
            tiles,
            audio_level: audioLevel,
            strip_layout: stripLayout,
            auto_view: autoView,
            after_call_url: afterCallUrl,
            auto_close: autoClose,
            mute: [muteMic && 'mic', muteCamera && 'camera'].filter(Boolean).join(',') ||
                undefined,
        });
    }
}
exports.default = Meeting;
