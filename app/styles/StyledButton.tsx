import { styled } from "@mui/system";

const StyledIconButton = styled("span")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  color: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  // Add additional button-like styles as needed
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(1),
  borderRadius: "50%",
}));

export default StyledIconButton;
