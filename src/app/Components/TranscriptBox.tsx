import { Box, Paper, Typography } from "@mui/material";

interface TranscriptBoxProps {
  transcript: string;
}

const TranscriptBox = ({ transcript }: TranscriptBoxProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "400px",
          overflowY: "auto",
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography variant="body1">{transcript}</Typography>
      </Paper>
    </Box>
  );
};

export default TranscriptBox;
