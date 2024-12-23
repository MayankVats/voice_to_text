import { DeepgramSocketRefType } from "@/types";
import { RefObject } from "react";

interface InitiateMediaRecorderInput {
  mediaStreamRef: RefObject<MediaStream | null>;
  mediaRecorderRef: RefObject<MediaRecorder | null>;
  deepgramSocketRef: RefObject<DeepgramSocketRefType>;
  audioChunksRef: RefObject<Blob[]>;
}

async function initiateMediaRecorder({
  mediaStreamRef,
  mediaRecorderRef,
  deepgramSocketRef,
  audioChunksRef,
}: InitiateMediaRecorderInput) {
  try {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;

    // Create MediaRecorder
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm",
    });
    mediaRecorderRef.current = mediaRecorder;

    // Send audio data to Deepgram
    mediaRecorderRef?.current?.addEventListener("dataavailable", (event) => {
      if (
        event.data.size > 70 &&
        deepgramSocketRef?.current?.getReadyState() === WebSocket.OPEN
      ) {
        deepgramSocketRef.current.send(event.data);
        audioChunksRef.current.push(event.data);
      }
    });

    // When recording stops, create a complete audio blob
    mediaRecorderRef?.current?.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      audioChunksRef.current = [audioBlob];
    });
  } catch (error) {
    console.log(error);
  }
}

export default initiateMediaRecorder;
