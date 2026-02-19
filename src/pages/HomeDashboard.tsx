import { Box, Paper, Typography, useMediaQuery, Chip, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import PageShell from "../components/PageShell";
import { alnuTheme } from "../theme/alnuTheme";

/* ---------------- Mock Aggregate Data ---------------- */

const clinicWeightTrend = [
  { month: "Sep", avgWeight: 215, activePatients: 4 },
  { month: "Oct", avgWeight: 210, activePatients: 6 },
  { month: "Nov", avgWeight: 204, activePatients: 8 },
  { month: "Dec", avgWeight: 197, activePatients: 9 },
  { month: "Jan", avgWeight: 190, activePatients: 10 },
  { month: "Feb", avgWeight: 184, activePatients: 10 },
];

const medDistribution = [
  { name: "Mounjaro", value: 4 },
  { name: "Wegovy", value: 2 },
  { name: "Ozempic", value: 2 },
  { name: "Zepbound", value: 1 },
  { name: "None", value: 1 },
];

const actionItems = [
  { id: "F6g7H8i9J0k1L2m3N4o5P6q7R8s9", name: "James Kim", issue: "Missing baseline labs", severity: "high" },
  { id: "A1b2C3d4E5f6G7h8I9j0K1l2M3n4", name: "Sarah Jenkins", issue: "Reported consecutive nausea", severity: "medium" },
  { id: "I9j0K1l2M3n4O5p6Q7r8S9t0U1v2", name: "Rachel Brown", issue: "Ready for dose titration", severity: "low" },
];

// Colors for the Pie Chart matching Alnu theme vibes
const PIE_COLORS = [
  alnuTheme.colors.primary[900], 
  alnuTheme.colors.primary[700], 
  alnuTheme.colors.primary[500], 
  alnuTheme.colors.primary[300], 
  alnuTheme.colors.border.light
];

/* ---------------- UI Components ---------------- */

const SummaryMetric = ({ label, value, trend }: { label: string, value: string, trend?: string }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 2,
      border: `1px solid ${alnuTheme.colors.border.light}`,
      bgcolor: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
    }}
  >
    <Typography sx={{ fontSize: 13, fontWeight: 800, color: alnuTheme.colors.text.secondary }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: 28, fontWeight: 900, color: alnuTheme.colors.text.primary, lineHeight: 1.1 }}>
      {value}
    </Typography>
    {trend && (
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: alnuTheme.colors.primary[700], mt: 0.5 }}>
        {trend}
      </Typography>
    )}
  </Paper>
);

export default function HomeDashboard() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const crumbs = [{ label: "Home Dashboard", to: "/" }];

  const axisStyle = { fontSize: 12, fill: alnuTheme.colors.text.secondary };
  const gridStroke = "rgba(0,0,0,0.06)";

  return (
    <PageShell title="Clinic Overview" crumbs={crumbs}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        
        {/* TOP METRICS ROW */}
        <Box sx={{ display: "grid", gridTemplateColumns: isMdDown ? "1fr 1fr" : "repeat(4, 1fr)", gap: 2 }}>
          <SummaryMetric label="Total Active Patients" value="10" trend="+2 this month" />
          <SummaryMetric label="Average Weight Loss" value="11.4%" trend="Across population" />
          <SummaryMetric label="Population Adherence" value="94%" trend="Past 30 days" />
          <SummaryMetric label="Reported Side Effects" value="3" trend="Requiring review" />
        </Box>

        {/* CHARTS ROW */}
        <Box sx={{ display: "grid", gridTemplateColumns: isMdDown ? "1fr" : "2fr 1fr", gap: 3 }}>
          
          {/* Clinic Weight Trend */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: `1px solid ${alnuTheme.colors.border.light}`, bgcolor: "#fff" }}>
            <Typography sx={{ fontSize: 16, fontWeight: 900, mb: 2, color: alnuTheme.colors.text.primary }}>
              Average Clinic Weight Trend (lbs)
            </Typography>
            <Box sx={{ height: 300, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clinicWeightTrend}>
                  <CartesianGrid stroke={gridStroke} vertical={false} />
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: 8, border: `1px solid ${alnuTheme.colors.border.light}`, boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgWeight" 
                    name="Avg Weight" 
                    stroke={alnuTheme.colors.primary[700]} 
                    strokeWidth={3} 
                    dot={{ r: 4, strokeWidth: 2 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

          {/* Medication Distribution */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: `1px solid ${alnuTheme.colors.border.light}`, bgcolor: "#fff", display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 16, fontWeight: 900, mb: 0, color: alnuTheme.colors.text.primary }}>
              Active Medications
            </Typography>
            <Box sx={{ flex: 1, minHeight: 250, width: "100%", mt: -2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={medDistribution}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {medDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>

        </Box>

        {/* BOTTOM ROW: ACTION ITEMS */}
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 1.5, color: alnuTheme.colors.text.primary }}>
            Patients Needing Attention
          </Typography>
          <Paper elevation={0} sx={{ borderRadius: 2, border: `1px solid ${alnuTheme.colors.border.light}`, bgcolor: "#fff", overflow: "hidden" }}>
            {actionItems.map((item, idx) => (
              <Box key={item.id}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, "&:hover": { bgcolor: "rgba(0,0,0,0.01)" } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip 
                      label={item.severity.toUpperCase()} 
                      size="small" 
                      sx={{ 
                        fontWeight: 900, 
                        fontSize: 10, 
                        borderRadius: 1,
                        bgcolor: item.severity === 'high' ? '#FFF0F0' : item.severity === 'medium' ? '#FFF8E6' : '#F0FDF4',
                        color: item.severity === 'high' ? '#D92D20' : item.severity === 'medium' ? '#DC6803' : '#027A48'
                      }} 
                    />
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 800 }}>{item.name}</Typography>
                      <Typography sx={{ fontSize: 13, color: alnuTheme.colors.text.secondary, fontWeight: 600 }}>{item.issue}</Typography>
                    </Box>
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => navigate(`/patients/${item.id}`)}
                    sx={{ textTransform: "none", fontWeight: 800, borderRadius: 2, borderColor: alnuTheme.colors.border.light, color: alnuTheme.colors.text.primary }}
                  >
                    Review Profile
                  </Button>
                </Box>
                {idx < actionItems.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Box>

      </Box>
    </PageShell>
  );
}