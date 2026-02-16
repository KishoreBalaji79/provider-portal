import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export type Crumb = { label: string; to?: string };

export default function BreadcrumbsBar({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumbs sx={{ mb: 0 }}>
      {items.map((c, idx) =>
        c.to ? (
          <Link
            key={idx}
            component={RouterLink}
            to={c.to}
            underline="hover"
            color="inherit"
            sx={{ fontSize: 13 }}
          >
            {c.label}
          </Link>
        ) : (
          <Typography key={idx} sx={{ fontSize: 13, fontWeight: 600 }}>
            {c.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}
