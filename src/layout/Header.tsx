import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useTheme } from "@mui/material/styles";
import { alnuTheme } from "../theme/alnuTheme";

export default function Header({
  height,
  sidebarWidth,
  onMenuClick,
}: {
  height: number;
  sidebarWidth: number;
  onMenuClick?: () => void;
}) {
  const muiTheme = useTheme();
  const isMdDown = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height,
        bgcolor: alnuTheme.colors.primary[500],

        // ✅ overlap sidebar by 1px to remove seam
        border: "none",
        width: { xs: "100%", md: `calc(100% - ${sidebarWidth - 1}px)` },

        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height,
          px: { xs: 1.5, md: 3 },
          display: "flex",
          justifyContent: "space-between",
          borderLeft: "none",
          borderRight: "none",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Mobile only hamburger */}
          {isMdDown && (
            <IconButton
              onClick={onMenuClick}
              sx={{ color: "rgba(255,255,255,0.95)" }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "rgba(255,255,255,0.90)",
              whiteSpace: "nowrap",
            }}
          >
            Hello Julia
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            sx={{ color: "rgba(255,255,255,0.92)" }}
            aria-label="Notifications"
          >
            <NotificationsNoneIcon />
          </IconButton>

          <Box
            sx={{
              textAlign: "right",
              lineHeight: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
              Julia
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.78)", fontSize: 12 }}>
              000222
            </Typography>
          </Box>

          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontWeight: 800,
            }}
          >
            J
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
