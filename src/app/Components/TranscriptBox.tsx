import { Box, Paper, Typography } from "@mui/material";

interface TranscriptBoxProps {
  transcript: string;
}

const TranscriptBox = ({ transcript }: TranscriptBoxProps) => {
  return (
    <Box sx={{ flexGrow: 1, mx: 2 }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          height: "400px",
          overflowY: "auto",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.12)",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
            "&:hover": {
              background: "#555",
            },
          },
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), repeating-linear-gradient(45deg, #f5f5f5 0px, #f5f5f5 1px, transparent 1px, transparent 10px)",
          backgroundSize: "cover, 15px 15px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: "text.primary",
            fontFamily:
              '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
            fontSize: "1rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {transcript}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TranscriptBox;
