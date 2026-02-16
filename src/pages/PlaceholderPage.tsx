import { Paper, Typography } from "@mui/material";
import PageShell from "../components/PageShell";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <PageShell title={title}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
        <Typography>This page is a placeholder in the prototype.</Typography>
      </Paper>
    </PageShell>
  );
}
