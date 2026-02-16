import PageShell from "../components/PageShell";
import DataTable from "../components/DataTable";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme } from "@mui/material/styles";
import { alnuTheme } from "../theme/alnuTheme";

type PatientRow = {
  id: string;
  name: string;
  city: string;
  state: string;
  medication: string;
  dose: string;
  upcomingVisit: string;
  lastVisit: string;
  notes: string;
};

const rowsSeed: PatientRow[] = Array.from({ length: 18 }).map((_, i) => ({
  id: String(1001 + i),
  name: "Ben",
  city: "Boston",
  state: "MA",
  medication: "Med",
  dose: "1mg",
  upcomingVisit: "02/02/2026",
  lastVisit: "01/01/2026",
  notes: "Med",
}));

export default function PatientListPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const crumbs = [{ label: "Patient List", to: "/patients" }];

  // ✅ multi select state
  const [selection, setSelection] = useState<GridRowSelectionModel>([]);

  const columns: GridColDef<PatientRow>[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "Patient ID",
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 160,
        sortable: true,
        renderCell: (params) => (
          <Box sx={{ fontWeight: 800, color: alnuTheme.colors.text.primary }}>
            {params.value}
          </Box>
        ),
      },
      {
        field: "city",
        headerName: "City",
        flex: 1,
        minWidth: 120,
        sortable: true,
        hide: isSmDown,
      },
      {
        field: "state",
        headerName: "State",
        flex: 1,
        minWidth: 90,
        sortable: true,
        hide: isSmDown,
      },
      {
        field: "medication",
        headerName: "Medication",
        flex: 1,
        minWidth: 140,
        sortable: true,
      },
      {
        field: "dose",
        headerName: "Dose",
        flex: 1,
        minWidth: 90,
        sortable: true,
        hide: isMdDown,
      },
      {
        field: "upcomingVisit",
        headerName: "Upcoming Visit",
        flex: 1,
        minWidth: 150,
        sortable: true,
        hide: isMdDown,
      },
      {
        field: "lastVisit",
        headerName: "Last Visit",
        flex: 1,
        minWidth: 120,
        sortable: true,
        hide: isSmDown,
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 1,
        minWidth: 140,
        sortable: false,
        hide: isMdDown,
      },

      // ✅ Actions column (Download + View)
      {
        field: "actions",
        headerName: "",
        width: 110,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: "right",
        headerAlign: "right",
        renderCell: (params) => {
          const row = params.row as PatientRow;

          return (
            <Box
              sx={{
                display: "flex",
                gap: 0.25,
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <IconButton
                size="small"
                aria-label="Download"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Download", row.id);
                }}
              >
                <DownloadOutlinedIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                aria-label="View"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/patients/${row.id}`);
                }}
              >
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [navigate, isSmDown, isMdDown]
  );

  return (
    <PageShell title="Patient List" crumbs={crumbs}>
      <DataTable
        title={undefined}
        rows={rowsSeed}
        columns={columns}
        height={560}
        onAdd={() => console.log("Add")}
        onFilter={() => console.log("Filter")}
        rowSelectionModel={selection}
        onRowSelectionModelChange={setSelection}
        onRowClick={(row) => navigate(`/patients/${row.id}`)} // ✅ NEW
      />
    </PageShell>
  );
}
