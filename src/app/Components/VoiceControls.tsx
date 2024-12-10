import { Mic, Pause, Stop } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface VoiceControlsProps {
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  isRecording: boolean;
}

const VoiceControls = ({
  onStart,
  onPause,
  onStop,
  isRecording,
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
            backgroundColor: "primary.main",
            color: "white",
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
            borderColor: "white",
            color: "white",
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
            borderColor: "white",
            color: "white",
          },
        }}
      >
        <Stop sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

export default VoiceControls;
