import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { alnuTheme } from "../theme/alnuTheme";
import AlnuLogo from "../assets/logo/alnu-logo.svg";

const nav = [
  { label: "Home Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
  { label: "Patient List", to: "/patients", icon: <PeopleAltIcon /> },
  { label: "Reports & Analytics", to: "/reports", icon: <AssessmentIcon /> },
  {
    label: "Alerts & Notifications",
    to: "/alerts",
    icon: <NotificationsActiveIcon />,
  },
];

export default function Sidebar({
  width,
  topOffset = 0,
  onNavigate,
}: {
  width: number;
  topOffset?: number;
  onNavigate?: () => void;
}) {
  return (
    <Box
      sx={{
        width,
        height: "100vh",
        bgcolor: alnuTheme.colors.primary[500],
        borderRight: "1px solid rgba(255,255,255,0.10)",
        boxSizing: "border-box",

        // IMPORTANT: do NOT add heavy horizontal padding here,
        // because it makes the selected white bar not reach the edge like Figma
        pt: `calc(${topOffset}px + 18px)`,
      }}
    >
      {/* Brand */}
      {/* Brand Logo (SVG from Figma) */}
      <Box
        sx={{
          px: 3,
          pb: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={AlnuLogo}
          alt="AlnuHealth"
          sx={{
            height: 28, 
            width: "auto",
            display: "block",
          }}
        />
      </Box>

      <List sx={{ px: 2, mt: 1, m: 0 }}>
        {nav.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.to}
            onClick={onNavigate}
            sx={{
              position: "relative",

              // spacing
              mb: 1.25,
              px: 2,
              py: 1.35,

              // default colors
              color: "rgba(255,255,255,0.92)",
              "& .MuiListItemIcon-root": { color: "rgba(255,255,255,0.92)" },

              // icon sizing similar to Figma
              "& .MuiSvgIcon-root": { fontSize: 24 },

              // text similar to Figma
              "& .MuiListItemText-primary": {
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: -0.2,
              },

              // no hover background like figma (optional)
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },

              // ✅ ACTIVE (selected)
              "&.active": {
                bgcolor: "#fff",
                color: "#0B0F0D",

                // left-only rounded corners like Figma
                borderRadius: "18px 0 0 18px",

                // make the white bar reach near the sidebar edge
                mr: -2, // pulls right edge out to match Figma feel
                "&:hover": { bgcolor: "#fff" },
                "& .MuiListItemIcon-root": { color: "#0B0F0D" },
              },

              // ✅ Left indicator pill (outside)
              "&.active::before": {
                content: '""',
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                width: 14,
                height: 54,
                borderRadius: "0 18px 18px 0",
                bgcolor: alnuTheme.colors.primary[950],
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 44 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
