import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { alnuTheme } from "../theme/alnuTheme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ✅ import your logo image
import AlnuLogo from "../assets/logo/alnu-logo-sage.svg"; // change if svg

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F5F5",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 420, textAlign: "center" }}>
        {/* ✅ Image Logo (like Figma) */}
        <Box sx={{ mb: 1 }}>
          <Box
            component="img"
            src={AlnuLogo}
            alt="AlnuHealth"
            sx={{
              height: 38,
              objectFit: "contain",
              mb: 0.75,
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            color: alnuTheme.colors.text.secondary,
            mb: 3,
          }}
        >
          Sign in to access your account
        </Typography>

        {/* ✅ Card */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "#fff",
            border: "1px solid #E5E5E5",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
            {/* Email */}
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="You@example.com"
              fullWidth
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: "#777" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontWeight: 600,
                },
              }}
            />

            {/* Password */}
            <TextField
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              type="password"
              placeholder="••••••••••••"
              fullWidth
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#777" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontWeight: 600,
                },
              }}
            />

            {/* Forgot password */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                component="button"
                onClick={() => alert("Forgot password flow")}
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1E56F0",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forget your password ?
              </Link>
            </Box>

            {/* Login */}
            <Button
              variant="contained"
              onClick={() => navigate("/patients")}
              sx={{
                mt: 0.5,
                py: 1.2,
                borderRadius: 2,
                bgcolor: "#0F2418",
                "&:hover": { bgcolor: "#143020" },
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Login
            </Button>

            {/* OR */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography sx={{ fontSize: 12, color: "#777" }}>OR</Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* Google */}
            <Button
              variant="outlined"
              sx={{
                py: 1.1,
                borderRadius: 2,
                borderColor: "#E0E0E0",
                color: "#000",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#E0E0E0",
                  bgcolor: "rgba(0,0,0,0.03)",
                },
              }}
              startIcon={
                <Box
                  component="img"
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  sx={{ width: 18, height: 18 }}
                />
              }
            >
              Sign in with Google
            </Button>

            {/* Apple */}
            <Button
              variant="outlined"
              sx={{
                py: 1.1,
                borderRadius: 2,
                borderColor: "#E0E0E0",
                color: "#000",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#E0E0E0",
                  bgcolor: "rgba(0,0,0,0.03)",
                },
              }}
              startIcon={
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                  sx={{ width: 16, height: 18 }}
                />
              }
            >
              Sign in with Apple
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
