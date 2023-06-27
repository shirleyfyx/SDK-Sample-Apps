"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const widget_1 = __importDefault(require("./widget"));
/**
 * Callbridge Room.
 */
class Room extends widget_1.default {
    /**
     * @param options
     */
    constructor(options) {
        super(options);
        /**
         * Manages the video input device.
         * @param deviceId device id.
         */
        this.setVideoInput = (deviceId) => {
            this._send('device', 'setVideoInput', { deviceId });
        };
        /**
         * Manages the audio input device.
         * @param deviceId device id.
         */
        this.setAudioInput = (deviceId) => {
            this._send('device', 'setAudioInput', { deviceId });
        };
        /**
         * Manages the audio output device.
         * @param deviceId device id.
         */
        this.setAudioOutput = (deviceId) => {
            this._send('device', 'setAudioOutput', { deviceId });
        };
        /**
         * Manages my camera.
         * @param enable whether to turn on my camera.
         */
        this.setCamera = (enable) => {
            this._send('conference', enable === true ? 'startCamera' : 'stopCamera');
        };
        /**
         * Manages my microphone.
         * @param mute whether to mute my microphone.
         */
        this.setMute = (mute) => {
            this._send('conference', mute === true ? 'mute' : 'unmute');
        };
        /**
         * Manages incoming video.
         * @param enable whether to receive remote video streams.
         */
        this.setIncomingVideo = (enable) => {
            this._send('conference', enable === true ? 'enableIncomingVideo' : 'disableIncomingVideo');
        };
        /**
         * Sets the global audio output volume.
         * @param volume valid range: 0 - 1. (default: 1).
         */
        this.setVolume = (volume) => {
            if (typeof volume === 'number') {
                if (volume < 0 || volume > 1) {
                    throw new RangeError('volume');
                }
            }
            else {
                throw new TypeError();
            }
            this._send('conference', 'setVolume', { volumn: volume });
        };
        /**
         * Mutes a remote participant, requires Moderator.
         * @param participantId participant id.
         */
        this.muteParticipant = (participantId) => {
            if (participantId > 0) {
                this._send('participant', 'mute', { id: participantId });
            }
        };
        /**
         * Adjusts the audio output volume and/or stereo position of a remote participant.
         * @param participantId participant id.
         * @param settings audio settings.
         */
        this.adjustParticipantAudio = (participantId, settings) => {
            const { volume, pan } = settings;
            if (typeof volume !== 'number' && typeof pan !== 'number') {
                throw new TypeError();
            }
            if (typeof volume === 'number') {
                if (volume < 0 || volume > 1) {
                    throw new RangeError('volume');
                }
            }
            if (typeof pan === 'number') {
                if (pan < -1 || pan > 1) {
                    throw new RangeError('pan');
                }
            }
            if (participantId > 0) {
                this._send('participant', 'adjustAudio', {
                    id: participantId,
                    volume,
                    pan,
                });
            }
        };
    }
}
exports.default = Room;
