import { ListenLiveClient } from "@deepgram/sdk";

export enum RecordingState {
  IDLE = "IDLE",
  CONNECTING = "CONNECTING",
  RECORDING = "RECORDING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export type DeepgramSocketRefType = WebSocket | ListenLiveClient | null;
