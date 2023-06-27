import Room from './room';
import { WidgetOptions } from './widget';
/**
 * Meeting options.
 */
export type MeetingOptions = {
    /**
     * If provided, the user will not be prompted for name when entering meeting room.
     */
    name?: string;
    /**
     * If set, the user will skip the video/audio device selection dialog when entering meeting room, and use the system default or previously used devices.
     */
    skipJoin?: boolean;
    /**
     * If set, the user will enter the meeting room with the device turned off.
     */
    mute?: {
        /**
         * Microphone.
         */
        mic?: boolean;
        /**
         * Camera.
         */
        camera?: boolean;
    };
    /**
     * If set, the user will enter the meeting room with camera off and without a participant tile to others. They can still hear and be heard by others.
     */
    observer?: boolean;
    /**
     * If provided, the user will enter the meeting room as a moderator.
     */
    moderatorToken?: string;
    /**
     * If provided, sets the maximum sending video resolution.
     */
    resolution?: 180 | 360 | 720 | 1080;
    /**
     * If provided, sets the initial meeting view upon entering. The default view is gallery view.
     */
    view?: 'gallery' | 'bottom_speaker' | 'left_side_speaker';
    /**
     * If provided, sets the maximum on-screen tiles in the gallery view page.
     */
    tiles?: number;
    /**
     * If set, emits audio level events.
     */
    audioLevel?: boolean;
    /**
     * If set, renders the participants as a strip with fixed tile height and 6 tiles.
     */
    stripLayout?: boolean;
    /**
     * Mobile Only. If set, automatically switches speaker view to bottom vs. left based on the device orientation.
     */
    autoView?: boolean;
    /**
     * SSO Only. If provided, the user will be redirected to the provided URL after exiting a call.
     */
    afterCallUrl?: string;
};
/**
 * Callbridge Meeting Room.
 */
export default class Meeting extends Room {
    constructor(
    /**
     * Widget options
     */
    options: WidgetOptions, 
    /**
     * The room to join
     */
    roomId: string, 
    /**
     * Meeting options
     */
    meetingOptions?: MeetingOptions);
}
