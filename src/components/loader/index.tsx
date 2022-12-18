import { CircularProgress, Box } from "@mui/material";
import { useAppSelector } from "../../rtk/store";

export default function Loader() {
  const { isLoading } = useAppSelector((state) => state.loaderSlice);
  if (!isLoading) return null;
  return (
    <Box
      style={{
        position: "fixed",
        display: "flex",
        top: 0,
        bottom: 0,
        zIndex: 1800,
        backdropFilter: "blur(2px)",
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
