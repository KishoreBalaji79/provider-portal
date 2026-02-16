import { Box, Drawer, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const SIDEBAR_W = 260;
const HEADER_H = 64;

export default function AppLayout() {
  const muiTheme = useTheme();
  const isMdDown = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F5F5F5" }}>
      {/* ===== Desktop Sidebar ===== */}
      {!isMdDown && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: SIDEBAR_W,
            height: "100vh",
            zIndex: 1200,
          }}
        >
          <Sidebar width={SIDEBAR_W} />
        </Box>
      )}

      {/* ===== Header (starts AFTER sidebar) ===== */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: !isMdDown ? SIDEBAR_W : 0,
          right: 0,
          height: HEADER_H,
          zIndex: 1100,
        }}
      >
        <Header
          height={HEADER_H}
          sidebarWidth={SIDEBAR_W}
          onMenuClick={() => setOpen(true)}
        />{" "}
      </Box>

      {/* ===== Mobile Drawer ===== */}
      {isMdDown && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Sidebar width={SIDEBAR_W} onNavigate={() => setOpen(false)} />
        </Drawer>
      )}

      {/* ===== Main Content ===== */}
      <Box
        sx={{
          ml: !isMdDown ? `${SIDEBAR_W}px` : 0,
          pt: `${HEADER_H}px`,
          px: 3,
          pb: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
