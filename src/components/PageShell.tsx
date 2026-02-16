import { Box, Typography } from "@mui/material";
import BreadcrumbsBar, { Crumb } from "../layout/BreadcrumbsBar";
import { ReactNode } from "react";
import { alnuTheme } from "../theme/alnuTheme";

export default function PageShell({
  title,
  crumbs,
  actions,
  children,
}: {
  title: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Box sx={{ minWidth: 200 }}>
          <Typography
            sx={{
              mt: 1.5,
              fontSize: 22,
              fontWeight: 600,
              color: alnuTheme.colors.text.primary,
            }}
          >
            {title}
          </Typography>

          {crumbs && crumbs.length > 0 && (
            <Box sx={{ mt: 0.75 }}>
              <BreadcrumbsBar items={crumbs} />
            </Box>
          )}
        </Box>
      </Box>

      {children}
    </Box>
  );
}
