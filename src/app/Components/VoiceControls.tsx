import { Mic, Pause, PlayArrow, Stop } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface VoiceControlsProps {
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  isRecording: boolean;
  onPlayback: () => void;
}

const VoiceControls = ({
  onStart,
  onPause,
  onStop,
  isRecording,
  onPlayback,
}: VoiceControlsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        gap: 3,
        width: { xs: "100%", md: "auto" },
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={onStart}
        color="primary"
        disabled={isRecording}
        sx={{
          width: 64,
          height: 64,
          border: "2px solid",
          borderColor: isRecording ? "grey.400" : "primary.main",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
          },
          "&.Mui-disabled": {
            borderColor: "grey.500",
            color: "grey.500",
          },
        }}
      >
        <Mic sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        onClick={onPause}
        color="warning"
        disabled={!isRecording}
        sx={{
          width: 64,
          height: 64,
          border: "2px solid",
          borderColor: !isRecording ? "grey.400" : "warning.main",
          "&:hover": {
            backgroundColor: "warning.main",
            color: "white",
          },
          "&.Mui-disabled": {
            borderColor: "grey.500",
            color: "grey.500",
          },
        }}
      >
        <Pause sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        onClick={onStop}
        color="error"
        disabled={!isRecording}
        sx={{
          width: 64,
          height: 64,
          border: "2px solid",
          borderColor: !isRecording ? "grey.400" : "error.main",
          "&:hover": {
            backgroundColor: "error.main",
            color: "white",
          },
          "&.Mui-disabled": {
            borderColor: "grey.500",
            color: "grey.500",
          },
        }}
      >
        <Stop sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        onClick={onPlayback}
        color="success"
        disabled={isRecording}
        sx={{
          width: 64,
          height: 64,
          border: "2px solid",
          borderColor: isRecording ? "grey.400" : "success.main",
          "&:hover": {
            backgroundColor: "success.main",
            color: "white",
          },
          "&.Mui-disabled": {
            borderColor: "grey.500",
            color: "grey.500",
          },
        }}
      >
        <PlayArrow sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

export default VoiceControls;
