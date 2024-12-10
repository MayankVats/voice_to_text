"use client";

import { Box, Container, Snackbar, SnackbarContent } from "@mui/material";
import { useState, useRef } from "react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import VoiceControls from "./Components/VoiceControls";
import TranscriptBox from "./Components/TranscriptBox";
import initiateMediaRecorder from "./utils/initiateMediaRecorder";
import { DeepgramSocketRefType } from "@/types";

export default function Home() {
  const [transcript, setTranscript] = useState("Text will appear here...");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const deepgramSocketRef = useRef<DeepgramSocketRefType>(null);

  const initializeDeepgram = () => {
    const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

    // Create a WebSocket connection to Deepgram
    const deepgramSocket = deepgram.listen.live({
      language: "en",
      smart_format: true,
      model: "nova",
    });

    deepgramSocket.on(LiveTranscriptionEvents.Open, () => {
      console.log("Deepgram WebSocket connection opened");

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "recording"
      ) {
        mediaRecorderRef.current.start(250); // Send data every 250ms
      }

      if (isStopped) {
        setIsStopped(false);
        setTranscript("");
      }

      setIsRecording(true);
      setIsSnackbarOpen(true);

      // Handle incoming transcription results
      deepgramSocket.on(LiveTranscriptionEvents.Transcript, (message) => {
        const transcription =
          message?.channel?.alternatives[0]?.transcript || "";

        if (transcription) {
          setTranscript((prev) => prev + " " + transcription);
        }
      });

      deepgramSocket.on(LiveTranscriptionEvents.Error, (error) => {
        console.error("Deepgram error:", error);
        setTranscript(
          (prev) => prev + "\nError: Transcription service error occurred."
        );
      });

      deepgramSocket.on(LiveTranscriptionEvents.Close, () => {
        console.log("Deepgram connection closed");
        setIsPaused(false);
      });
    });

    return deepgramSocket;
  };

  const handleStart = async () => {
    try {
      if (isPaused && mediaStreamRef.current && mediaRecorderRef.current) {
        mediaRecorderRef.current.resume();

        mediaStreamRef.current.getTracks().forEach((track) => {
          track.enabled = true;
        });

        setIsPaused(false);
        setIsRecording(true);
        setIsSnackbarOpen(true);
      }

      if (!mediaRecorderRef.current) {
        await initiateMediaRecorder({
          mediaStreamRef,
          mediaRecorderRef,
          deepgramSocketRef,
        });
      }

      deepgramSocketRef.current = isPaused
        ? deepgramSocketRef.current
        : initializeDeepgram();
    } catch (error) {
      console.error("Error starting recording:", error);
      setTranscript(
        "Error: Could not start recording. Please check permissions."
      );
    }
  };

  const handlePause = () => {
    // Pause MediaRecorder
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
    }

    // Disable audio tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.enabled = false;
      });
    }

    setIsPaused(true);
    setIsRecording(false);
  };

  const handleStop = () => {
    if (isStopped) {
      return;
    }

    // Stop MediaRecorder
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }

    // Close Deepgram connection
    if (deepgramSocketRef.current) {
      const closeStreamMsg = JSON.stringify({ type: "CloseStream" });
      deepgramSocketRef.current.send(closeStreamMsg);
      deepgramSocketRef.current = null;
    }

    setIsRecording(false);
    setIsStopped(true);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={isSnackbarOpen}
          onClose={handleSnackbarClose}
          message="Recording Started"
          key={"Recording Started"}
          autoHideDuration={5000}
        >
          <SnackbarContent
            message={
              isRecording
                ? "Recording Started"
                : isPaused
                ? "Recording Paused"
                : isStopped
                ? "Recording Stopped"
                : null
            }
            sx={{
              bgcolor: "primary.main",
              color: "white",
            }}
          />
        </Snackbar>
        <VoiceControls
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          isRecording={isRecording}
        />
        <TranscriptBox transcript={transcript} />
      </Box>
    </Container>
  );
}
