import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { alnuTheme } from "../theme/alnuTheme";

type Props<T extends { id: string }> = {
  title?: string;
  rows: T[];
  columns: GridColDef<T>[];
  height?: number;

  // toolbar controls
  onAdd?: () => void;
  onFilter?: () => void;
  showToolbar?: boolean; // default true
  enableSearch?: boolean; // default true

  // ✅ row click (for navigation)
  onRowClick?: (row: T) => void;

  // DataGrid selection passthrough
  rowSelectionModel?: GridRowSelectionModel;
  onRowSelectionModelChange?: (model: GridRowSelectionModel) => void;

  // DataGrid options
  checkboxSelection?: boolean; // default true
};

export default function DataTable<T extends { id: string }>({
  title,
  rows,
  columns,
  height = 560,

  onAdd,
  onFilter,
  showToolbar = true,
  enableSearch = true,

  // ✅ new
  onRowClick,

  rowSelectionModel,
  onRowSelectionModelChange,

  checkboxSelection = true,
}: Props<T>) {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    if (!enableSearch) return rows;
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
  }, [rows, query, enableSearch]);

  const toolbarVisible =
    showToolbar &&
    (Boolean(title) || Boolean(onAdd) || Boolean(onFilter) || enableSearch);

  // ✅ prevent navigation when clicking checkbox/actions/buttons
  const shouldIgnoreRowClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return false;

    // Ignore clicks inside these interactive elements
    const ignoredSelectors = [
      ".MuiDataGrid-cellCheckbox",
      ".MuiCheckbox-root",
      ".MuiIconButton-root",
      "button",
      "a",
      '[role="button"]',
      '[role="checkbox"]',
      'input',
      'svg',
      "path",
    ];

    return ignoredSelectors.some((sel) => target.closest(sel));
  };

  return (
    <Box>
      {/* ✅ Toolbar (optional) */}
      {toolbarVisible && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 1.25,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 900,
              color: alnuTheme.colors.text.secondary,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              flexWrap: "wrap",
            }}
          >
            {onFilter && (
              <Button
                variant="outlined"
                startIcon={<FilterAltOutlinedIcon />}
                onClick={onFilter}
                sx={{
                  height: 40,
                  borderRadius: alnuTheme.borderRadius.md,
                  borderColor: alnuTheme.colors.border.light,
                  color: alnuTheme.colors.text.primary,
                  bgcolor: "#fff",
                  fontWeight: 800,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: alnuTheme.colors.background.accent,
                    borderColor: alnuTheme.colors.border.main,
                  },
                }}
              >
                Filter
              </Button>
            )}

            {enableSearch && (
              <TextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                size="small"
                sx={{
                  width: { xs: 180, sm: 240, md: 320 },
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    borderRadius: alnuTheme.borderRadius.md,
                    bgcolor: "#fff",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ color: alnuTheme.colors.text.tertiary }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {onAdd && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
                sx={{
                  height: 40,
                  bgcolor: alnuTheme.colors.primary[950],
                  "&:hover": { bgcolor: alnuTheme.colors.primary[900] },
                  borderRadius: alnuTheme.borderRadius.md,
                  px: 2,
                  fontWeight: 900,
                  textTransform: "none",
                }}
              >
                Add
              </Button>
            )}
          </Box>
        </Box>
      )}

      {/* ✅ DataGrid */}
      <Box sx={{ height, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={onRowSelectionModelChange}
          pageSizeOptions={[10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}

          // ✅ navigate on row click
          onRowClick={(params: GridRowParams<T>, event) => {
            if (!onRowClick) return;
            if (shouldIgnoreRowClick(event as React.MouseEvent)) return;
            onRowClick(params.row);
          }}

          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: alnuTheme.colors.background.accent,
              borderBottom: `1px solid ${alnuTheme.colors.border.light}`,
              fontWeight: 900,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid rgba(0,0,0,0.04)`,
            },

            // ✅ make row feel clickable
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(0,0,0,0.02)",
              cursor: onRowClick ? "pointer" : "default",
            },
          }}
        />
      </Box>
    </Box>
  );
}
