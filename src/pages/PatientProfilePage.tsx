// PatientProfilePage.tsx
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Dialog,         // ✅ ADD THIS
  DialogTitle,    // ✅ ADD THIS
  DialogContent,  // ✅ ADD THIS
  DialogActions   // ✅ ADD THIS
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import PageShell from "../components/PageShell";
import DataTable from "../components/DataTable";
import { alnuTheme } from "../theme/alnuTheme";
import { patientProfiles, type RangeKey, type HistoryRow, type ChartDataPoint } from "../data/mockPatients";
import { useMemo, useState, useRef, useEffect } from "react";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

/**
 * Install:
 *   npm i recharts
 */

/* ---------------- Types ---------------- */

type InsightTab =
  | "Weight & Dose"
  | "Side Effects"
  | "BMI"
  | "Body Measurements"
  | "Nutrition";

type ChatRole = "user" | "assistant";
type ChatMessage = { id: string; role: ChatRole; text: string; ts: number };

/* (Mock data now lives in ../data/mockPatients.ts) */

/* ---------------- UI Constants ---------------- */

const INSIGHTS_PANEL_HEIGHT = 420; // increase/decrease as needed

const text = {
  title: {
    fontSize: 16,
    fontWeight: 900,
    color: alnuTheme.colors.text.primary,
    lineHeight: 1.2,
  },
  sub: {
    fontSize: 13,
    fontWeight: 900,
    color: alnuTheme.colors.text.secondary,
    lineHeight: 1.2,
  },
  body: {
    fontSize: 13,
    fontWeight: 700,
    color: alnuTheme.colors.text.secondary,
    lineHeight: 1.3,
  },
};

/* patient data is now loaded dynamically via useParams + patientProfiles */

/* ---------------- UI Helpers ---------------- */

const SectionLabel = ({ children }: { children: string }) => (
  <Typography
    sx={{
      fontSize: 13,
      fontWeight: 900,
      color: alnuTheme.colors.text.primary,
      mb: 0.5,
    }}
  >
    {children}
  </Typography>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ minWidth: 140 }}>
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 800,
        color: alnuTheme.colors.text.secondary,
        mb: 0.25,
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: 13.5,
        fontWeight: 900,
        color: alnuTheme.colors.text.primary,
        lineHeight: 1.2,
      }}
    >
      {value}
    </Typography>
  </Box>
);

const SummaryCard = ({ body }: { body: string }) => (
  <Paper
    elevation={0}
    sx={{
      px: 2.5,
      py: 2.25,
      borderRadius: 2,
      border: `1px solid ${alnuTheme.colors.border.light}`,
      bgcolor: "#fff",
      minHeight: 100,
      display: "flex",
      alignItems: "center",
    }}
  >
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 800,
        color: alnuTheme.colors.text.primary,
        lineHeight: 1.5,
      }}
    >
      {body}
    </Typography>
  </Paper>
);

function InsightChart({ tab, range, chartData }: { tab: InsightTab; range: RangeKey; chartData: Record<RangeKey, ChartDataPoint[]> }) {
  const data = chartData[range];

  const axisStyle = {
    fontSize: 12,
    fill: alnuTheme.colors.text.secondary,
  };

  const gridStroke = "rgba(0,0,0,0.08)";

  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    fill: alnuTheme.colors.text.secondary,
  } as const;

  const dotStyle = (color: string) => ({
    r: 3.5,
    fill: color,
    strokeWidth: 2,
    stroke: "#fff",
  });

  const yDomain: [string, string] = (() => {
    switch (tab) {
      case "Weight & Dose":  return ["dataMin - 5", "dataMax + 10"];
      case "BMI":            return ["dataMin - 1", "dataMax + 2"];
      case "Body Measurements": return ["dataMin - 2", "dataMax + 3"];
      case "Nutrition":      return ["dataMin - 80", "dataMax + 80"];
      default:               return ["auto", "auto"];
    }
  })();

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#fff",
        border: `1px solid ${alnuTheme.colors.border.light}`,
        borderRadius: 2,
        p: 2,
        height: INSIGHTS_PANEL_HEIGHT,
      }}
    >
      <Box sx={{ height: "100%", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          {tab === "Side Effects" ? (
            <BarChart data={data}>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="label"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                domain={[0, "dataMax + 2"]}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="sideEffectsCount"
                name="Side Effects"
                fill={alnuTheme.colors.primary[500]}
                radius={[6, 6, 0, 0]}
              >
                <LabelList dataKey="sideEffectsCount" position="top" style={labelStyle} />
              </Bar>
            </BarChart>
          ) : tab === "Weight & Dose" ? (
            <LineChart data={data} margin={{ top: 20, right: 12, bottom: 4, left: 4 }}>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="label"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="weight"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 5", "dataMax + 10"]}
                label={{ value: "Weight (lbs)", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: alnuTheme.colors.text.tertiary, fontWeight: 700 }, offset: 0 }}
              />
              <YAxis
                yAxisId="dose"
                orientation="right"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax + 2"]}
                label={{ value: "Dose (mg)", angle: 90, position: "insideRight", style: { fontSize: 11, fill: alnuTheme.colors.text.tertiary, fontWeight: 700 }, offset: 0 }}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="weight"
                type="monotone"
                dataKey="weight"
                name="Weight (lbs)"
                stroke={alnuTheme.colors.primary[700]}
                strokeWidth={2.5}
                dot={dotStyle(alnuTheme.colors.primary[700])}
                activeDot={{ r: 5 }}
              >
                <LabelList dataKey="weight" position="top" style={labelStyle} />
              </Line>
              <Line
                yAxisId="dose"
                type="monotone"
                dataKey="dose"
                name="Dose (mg)"
                stroke={alnuTheme.colors.primary[300]}
                strokeWidth={2.5}
                dot={dotStyle(alnuTheme.colors.primary[300])}
                activeDot={{ r: 5 }}
              >
                <LabelList dataKey="dose" position="bottom" style={labelStyle} />
              </Line>
            </LineChart>
          ) : (
            <LineChart data={data} margin={{ top: 20, right: 12, bottom: 4, left: 4 }}>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="label"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                domain={yDomain}
              />
              <Tooltip />
              <Legend />
              {tab === "BMI" && (
                <Line
                  type="monotone"
                  dataKey="bmi"
                  name="BMI"
                  stroke={alnuTheme.colors.primary[700]}
                  strokeWidth={2.5}
                  dot={dotStyle(alnuTheme.colors.primary[700])}
                  activeDot={{ r: 5 }}
                >
                  <LabelList dataKey="bmi" position="top" style={labelStyle} />
                </Line>
              )}
              {tab === "Body Measurements" && (
                <>
                  <Line
                    type="monotone"
                    dataKey="waist"
                    name="Waist"
                    stroke={alnuTheme.colors.primary[700]}
                    strokeWidth={2.5}
                    dot={dotStyle(alnuTheme.colors.primary[700])}
                    activeDot={{ r: 5 }}
                  >
                    <LabelList dataKey="waist" position="top" style={labelStyle} />
                  </Line>
                  <Line
                    type="monotone"
                    dataKey="hip"
                    name="Hip"
                    stroke={alnuTheme.colors.primary[300]}
                    strokeWidth={2.5}
                    dot={dotStyle(alnuTheme.colors.primary[300])}
                    activeDot={{ r: 5 }}
                  >
                    <LabelList dataKey="hip" position="bottom" style={labelStyle} />
                  </Line>
                </>
              )}
              {tab === "Nutrition" && (
                <>
                  <Line
                    type="monotone"
                    dataKey="calories"
                    name="Calories"
                    stroke={alnuTheme.colors.primary[700]}
                    strokeWidth={2.5}
                    dot={dotStyle(alnuTheme.colors.primary[700])}
                    activeDot={{ r: 5 }}
                  >
                    <LabelList dataKey="calories" position="top" style={labelStyle} />
                  </Line>
                  <Line
                    type="monotone"
                    dataKey="protein"
                    name="Protein (g)"
                    stroke={alnuTheme.colors.primary[400]}
                    strokeWidth={2.5}
                    dot={dotStyle(alnuTheme.colors.primary[400])}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="carbs"
                    name="Carbs (g)"
                    stroke={alnuTheme.colors.primary[200]}
                    strokeWidth={2.5}
                    dot={dotStyle(alnuTheme.colors.primary[200])}
                    activeDot={{ r: 5 }}
                  />
                </>
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

/* ---------------- Chatbot (interactive) ---------------- */

function buildBotReply(input: string, patientName: string): string {
  const q = input.trim().toLowerCase();

  if (
    q.includes("eaten") ||
    q.includes("ate") ||
    q.includes("food") ||
    q.includes("last 4")
  ) {
    return (
      `Overall Summary: ${patientName}’s intake over the past 3–4 days shows consistently low protein, higher refined carbs, and slightly elevated calories.\n\n` +
      `What ${patientName} Ate:\n` +
      "Day 1: Bagel + cream cheese; chicken caesar wrap; chips; pasta alfredo\n" +
      "Day 2: Muffin + latte; BBQ chicken sandwich; granola bar; takeout pad thai\n" +
      "Day 3: Cereal + milk; burrito + chips; late-night cookies\n\n" +
      "Quick wins: Add protein at breakfast + swap one refined-carb snack for fruit/Greek yogurt."
    );
  }

  if (q.includes("nutrition")) {
    return (
      "This week’s nutrition focus:\n" +
      "• Protein: aim 25–35g per meal\n" +
      "• Fiber: add 1 veggie serving at lunch + dinner\n" +
      "• Hydration: 2–3L/day\n\n" +
      "Want a 3-day simple meal template?"
    );
  }

  if (q.includes("adherence") || q.includes("missed") || q.includes("dose")) {
    return (
      "Adherence is strong (92%). To improve consistency:\n" +
      "• Set a weekly injection reminder + 24h backup\n" +
      "• Add a 1-tap “Log dose” after injection time\n" +
      "• Monitor symptoms near dose changes\n\n" +
      "Ask: “What caused the adherence dip?” for a deeper breakdown."
    );
  }

  if (
    q.includes("side effect") ||
    q.includes("nausea") ||
    q.includes("constipation")
  ) {
    return (
      "Recurring mild nausea/constipation often improves with:\n" +
      "• Hydration: 2–3L/day\n" +
      "• Fiber: increase slowly (beans/veggies; consider chia)\n" +
      "• Smaller meals around injection day\n\n" +
      "If symptoms worsen or persist, it’s best to flag for clinical review."
    );
  }

  return (
    "Got it. I can summarize trends (weight, dose, side effects, nutrition) and suggest next steps.\n\n" +
    "Try asking:\n" +
    "• “What changed this month?”\n" +
    "• “Any red flags?”\n" +
    "• “Give me 3 action items for next week.”"
  );
}

// ✅ Updated ChatBotPanel()
// - FAQ area becomes scrollable with a visible scrollbar
// - Keeps the transcript scrollable
// - Better spacing + “sticky” FAQ label so it looks clean
// - Adds subtle background + hover to FAQ rows
// - Keeps your expand arrow + “Ask this” button behavior

function ChatBotPanel({ patientName }: { patientName: string }) {
  const [draft, setDraft] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      role: "assistant",
      text: `Ask anything about ${patientName}’s trends (nutrition, adherence, side effects).`,
      ts: Date.now(),
    },
  ]);

  const quickFaq = useMemo(
    () => [
      {
        q: `What has ${patientName} eaten for the last 4 days?`,
        preview:
          "Summary: low protein + higher refined carbs. Quick win: add protein at breakfast + swap one snack for fruit/Greek yogurt.",
      },
      {
        q: "Any nutrition changes you recommend this week?",
        preview:
          "Focus: 25–35g protein/meal + add 1 veggie serving lunch/dinner + 2–3L hydration.",
      },
      {
        q: "Why is adherence at 92% and how to improve it?",
        preview:
          "Use reminders + 1-tap logging + monitor symptoms during dose changes.",
      },
      {
        q: "What do recurring side effects indicate?",
        preview:
          "Often improves with hydration, slow fiber increase, smaller meals near injection day.",
      },
      // add more items and FAQ will scroll nicely
    ],
    []
  );

  const toggleFaq = (idx: number) =>
    setExpandedFaq((prev) => (prev === idx ? null : idx));

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: clean,
      ts: Date.now(),
    };

    const botMsg: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      role: "assistant",
      text: buildBotReply(clean, patientName),
      ts: Date.now() + 1,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setDraft("");
  };

  // ✅ scrollbar styling (works in Chromium + Firefox; Safari will still show default)
  const scrollSx = {
    overflowY: "auto",
    scrollbarGutter: "stable",
    "&::-webkit-scrollbar": { width: 10 },
    "&::-webkit-scrollbar-track": { background: "rgba(0,0,0,0.04)", borderRadius: 12 },
    "&::-webkit-scrollbar-thumb": { background: "rgba(0,0,0,0.18)", borderRadius: 12 },
    "&::-webkit-scrollbar-thumb:hover": { background: "rgba(0,0,0,0.28)" },
  } as const;

  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 900, mb: 1 }}>
        On Demand Patient Insights
      </Typography>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "#fff",
          border: `1px solid ${alnuTheme.colors.border.light}`,
          borderRadius: 2,
          overflow: "hidden",
          height: INSIGHTS_PANEL_HEIGHT,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* green header bar (like figma) */}
        <Box
          sx={{
            bgcolor: alnuTheme.colors.primary[500],
            color: "#fff",
            px: 2,
            py: 1.25,
            fontWeight: 900,
            fontSize: 13,
          }}
        >
          Ask a question
        </Box>

        {/* content */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            flex: 1,
            minHeight: 0, // important for nested scroll areas
          }}
        >
          {/* ✅ FAQ SECTION (scrollable) */}
          <Paper
            elevation={0}
            sx={{
              border: `1px solid ${alnuTheme.colors.border.light}`,
              overflow: "hidden",
              bgcolor: "#fff",
              // ✅ fixed area so it can scroll (tune this height)
              height: 140,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* sticky label */}
            <Box
              sx={{
                px: 1.25,
                py: 0.9,
                borderBottom: `1px solid ${alnuTheme.colors.border.light}`,
                bgcolor: "rgba(0,0,0,0.02)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: alnuTheme.colors.text.secondary,
                  fontWeight: 900,
                }}
              >
                FAQ
              </Typography>
            </Box>

            {/* scroll list */}
            <Box sx={{ flex: 1, minHeight: 0, ...scrollSx }}>
              <List dense disablePadding>
                {quickFaq.map((item, idx) => {
                  const isOpen = expandedFaq === idx;

                  return (
                    <Box
                      key={item.q}
                      sx={{
                        borderBottom:
                          idx === quickFaq.length - 1
                            ? "none"
                            : `1px solid ${alnuTheme.colors.border.light}`,
                        bgcolor: "#fff",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          px: 1.25,
                          py: 0.75,
                          "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                        }}
                      >
                        {/* click question -> SEND */}
                        <Box
                          onClick={() => send(item.q)}
                          role="button"
                          tabIndex={0}
                          style={{ flex: 1, cursor: "pointer" }}
                        >
                          <Typography
                            sx={{
                              fontSize: 12.5,
                              fontWeight: 800,
                              color: alnuTheme.colors.text.primary,
                            }}
                          >
                            {item.q}
                          </Typography>
                        </Box>

                        {/* click arrow -> EXPAND */}
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFaq(idx);
                          }}
                          sx={{ borderRadius: 2 }}
                        >
                          <KeyboardArrowDownRoundedIcon
                            fontSize="small"
                            sx={{
                              color: alnuTheme.colors.text.secondary,
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 160ms ease",
                            }}
                          />
                        </IconButton>
                      </Box>

                      {isOpen && (
                        <Box sx={{ px: 1.25, pb: 1, pt: 0.25, bgcolor: "rgba(0,0,0,0.01)" }}>
                          <Typography
                            sx={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: alnuTheme.colors.text.secondary,
                              lineHeight: 1.35,
                            }}
                          >
                            {item.preview}
                          </Typography>

                          <Box sx={{ mt: 0.75, display: "flex", gap: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => send(item.q)}
                              sx={{
                                textTransform: "none",
                                fontWeight: 900,
                                borderRadius: 2,
                                height: 28,
                              }}
                            >
                              Ask this
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </List>
            </Box>
          </Paper>

          {/* chat transcript (scrollable) */}
          <Box
            sx={{
              borderRadius: 2,
              p: 1.5,
              flex: 1,
              minHeight: 140,
              bgcolor: alnuTheme.colors.background.secondary,
              ...scrollSx,
            }}
          >
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <Box
                  key={m.id}
                  sx={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    mb: 1.25,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "85%",
                      px: 1.5,
                      py: 1,
                      whiteSpace: "pre-line",
                      fontSize: 13,
                      fontWeight: 700,
                      lineHeight: 1.45,
                      borderRadius: isUser
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                      bgcolor: isUser
                        ? alnuTheme.colors.primary[950]
                        : "#fff",
                      color: isUser
                        ? "#fff"
                        : alnuTheme.colors.text.primary,
                      boxShadow: isUser
                        ? "none"
                        : "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                  >
                    {m.text}
                  </Box>
                </Box>
              );
            })}
            <div ref={bottomRef} />
          </Box>

          {/* input row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size="small" sx={{ borderRadius: 2 }}>
              <AddOutlinedIcon />
            </IconButton>

            <TextField
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              placeholder="Enter message here"
              size="small"
              fullWidth
              multiline={false}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 36,
                  borderRadius: 2,
                  fontSize: 13,
                  fontWeight: 700,
                },
              }}
            />

            <IconButton size="small" sx={{ borderRadius: 2 }}>
              <MicNoneOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}


/* ---------------- Page ---------------- */

export default function PatientProfilePage() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const profile = id ? patientProfiles[id] : undefined;

  if (!profile) {
    return (
      <PageShell title="Patient Profile" crumbs={[{ label: "Patient List", to: "/patients" }]}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 900, mb: 2 }}>Patient not found</Typography>
          <Button variant="contained" onClick={() => navigate("/patients")}>
            Back to Patient List
          </Button>
        </Box>
      </PageShell>
    );
  }

  const crumbs = [
    { label: "Patient List", to: "/patients" },
    { label: "Patient Profile" },
    { label: `${profile.name} - ${profile.displayId}` },
  ];
  const [modalConfig, setModalConfig] = useState({ open: false, title: "", content: "" });

  const [historySelection, setHistorySelection] = useState<GridRowSelectionModel>([]);

  const historyColumns: GridColDef<HistoryRow>[] = useMemo(
    () => [
      {
        field: "date",
        headerName: "Date of visit",
        flex: 1,
        minWidth: 140,
        sortable: true,
      },
      {
        field: "medication",
        headerName: "Medication",
        flex: 1,
        minWidth: 120,
        sortable: true,
      },
      {
        field: "dose",
        headerName: "Dose",
        flex: 1,
        minWidth: 90,
        sortable: true,
      },
      {
        field: "effects",
        headerName: "Side Effects",
        flex: 1,
        minWidth: 160,
        sortable: true,
      },
      {
        field: "patientSummary",
        headerName: "Patient Summary",
        flex: 1,
        minWidth: 170,
        sortable: false,
        renderCell: () => (
          <Button
            variant="text"
            size="small"
            sx={{ fontWeight: 900, textTransform: "none" }}
          >
            View More
          </Button>
        ),
      },
      {
        field: "nutritionSummary",
        headerName: "Nutrition Summary",
        flex: 1,
        minWidth: 180,
        sortable: false,
        hide: isMdDown,
        renderCell: () => (
          <Button
            variant="text"
            size="small"
            sx={{ fontWeight: 900, textTransform: "none" }}
          >
            View More
          </Button>
        ),
      },
      {
        field: "adherenceSummary",
        headerName: "Adherence Summary",
        flex: 1,
        minWidth: 180,
        sortable: false,
        hide: isMdDown,
        renderCell: () => (
          <Button
            variant="text"
            size="small"
            sx={{ fontWeight: 900, textTransform: "none" }}
          >
            View More
          </Button>
        ),
      },
      {
        field: "actions",
        headerName: "",
        width: 80,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        align: "right",
        headerAlign: "right",
        renderCell: (params) => {
          const row = params.row as HistoryRow;
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <IconButton
                size="small"
                aria-label="Download"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("download", row.id);
                }}
              >
                <DownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [isMdDown]
  );

  const [tab, setTab] = useState<InsightTab>("Weight & Dose");
  const [range, setRange] = useState<RangeKey>("M");
  const tabs: InsightTab[] = [
    "Weight & Dose",
    "Side Effects",
    "BMI",
    "Body Measurements",
    "Nutrition",
  ];
  const ranges: RangeKey[] = ["W", "M", "Y"];

  const chipSx = (active: boolean) => ({
    height: 26,
    borderRadius: 1.5,
    bgcolor: active ? "rgba(0,0,0,0.06)" : "#fff",
    border: `1px solid ${alnuTheme.colors.border.light}`,
    fontWeight: 900,
    fontSize: 12,
  });

  return (
    <PageShell title="Patient Profile" crumbs={crumbs}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* TOP PROFILE CARD */}

        <Paper
          elevation={0}
          sx={{
            bgcolor: "#fff",
            border: `1px solid ${alnuTheme.colors.border.light}`,
            borderRadius: 2,
            p: { xs: 1.5, md: 2.5 },
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* ── ROW 1: Identity header + Edit button ── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                width: 56,
                height: 56,
                minWidth: 56,
                borderRadius: "50%",
                bgcolor: alnuTheme.colors.background.accent,
                border: `1px solid ${alnuTheme.colors.border.light}`,
                display: "grid",
                placeItems: "center",
                fontSize: 22,
                fontWeight: 900,
                color: alnuTheme.colors.text.primary,
              }}
            >
              {profile.name[0].toUpperCase()}
            </Box>

            {/* Name / ID / Email */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 18, fontWeight: 900, lineHeight: 1.2 }}>
                  {profile.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: alnuTheme.colors.text.secondary,
                  }}
                >
                  {profile.displayId}
                </Typography>
              </Box>
              {!!profile.email && (
                <Typography
                  sx={{
                    mt: 0.25,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: alnuTheme.colors.text.tertiary,
                  }}
                >
                  {profile.email}
                </Typography>
              )}
            </Box>

            {/* Edit button */}
            <Button
              variant="contained"
              startIcon={<EditOutlinedIcon />}
              sx={{
                bgcolor: alnuTheme.colors.primary[950],
                "&:hover": { bgcolor: alnuTheme.colors.primary[900] },
                textTransform: "none",
                fontWeight: 900,
                borderRadius: 999,
                px: 2.25,
                height: 40,
                boxShadow: alnuTheme.shadows.md,
                whiteSpace: "nowrap",
              }}
            >
              Edit Profile
            </Button>
          </Box>

          <Divider />

          {/* ── ROW 2: All stats in a dense flowing row ── */}
          {(() => {
            const lbl = {
              fontSize: 11.5,
              fontWeight: 800,
              color: alnuTheme.colors.text.tertiary,
              textTransform: "uppercase" as const,
              letterSpacing: 0.3,
              mb: 0.4,
            };
            const val = {
              fontSize: 14.5,
              fontWeight: 900,
              color: alnuTheme.colors.text.primary,
              lineHeight: 1.25,
            };

            return (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMdDown
                    ? "repeat(2, 1fr)"
                    : "repeat(7, 1fr)",
                  gap: { xs: 2, md: 0 },
                  py: 2,
                }}
              >
                {[
                  { label: "Sex", value: profile.sex },
                  { label: "Age", value: String(profile.age) },
                  { label: "Starting Wt", value: `${profile.startingWeight} lbs` },
                  { label: "Current Wt", value: `${profile.currentWeight} lbs` },
                  { label: "Total Loss", value: `${profile.totalWeightLoss} lbs` },
                  { label: "Med. Start", value: profile.medicationStartDate },
                  { label: "Adherence", value: profile.adherence },
                ].map((s, i) => (
                  <Box
                    key={s.label}
                    sx={{
                      px: { xs: 0, md: 2 },
                      borderRight:
                        !isMdDown && i < 6
                          ? `1px solid ${alnuTheme.colors.border.light}`
                          : "none",
                      "&:first-of-type": { pl: 0 },
                    }}
                  >
                    <Typography sx={lbl}>{s.label}</Typography>
                    <Typography sx={val}>{s.value}</Typography>
                  </Box>
                ))}
              </Box>
            );
          })()}

          <Divider />

          {/* ── ROW 3: Medication + Dose + Side Effects ── */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMdDown ? "1fr" : "1fr 1.2fr 1fr",
              gap: 0,
              pt: 2,
            }}
          >
            {/* Medication */}
            <Box
              sx={{
                pr: { xs: 0, md: 2.5 },
                borderRight: isMdDown
                  ? "none"
                  : `1px solid ${alnuTheme.colors.border.light}`,
                pb: { xs: 2, md: 0 },
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: alnuTheme.colors.text.primary,
                  mb: 1.5,
                }}
              >
                Medication
              </Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography
                    sx={{ fontSize: 11.5, fontWeight: 800, color: alnuTheme.colors.text.tertiary, textTransform: "uppercase", letterSpacing: 0.3, mb: 0.4 }}
                  >
                    Name
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 900, color: alnuTheme.colors.text.primary }}>
                    {profile.medication}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: 11.5, fontWeight: 800, color: alnuTheme.colors.text.tertiary, textTransform: "uppercase", letterSpacing: 0.3, mb: 0.4 }}
                  >
                    Duration
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 900, color: alnuTheme.colors.text.primary }}>
                    {profile.medicationDuration}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Dose */}
            <Box
              sx={{
                px: { xs: 0, md: 2.5 },
                borderRight: isMdDown
                  ? "none"
                  : `1px solid ${alnuTheme.colors.border.light}`,
                pb: { xs: 2, md: 0 },
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: alnuTheme.colors.text.primary,
                  mb: 1.5,
                }}
              >
                Current Dose
              </Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography
                    sx={{ fontSize: 11.5, fontWeight: 800, color: alnuTheme.colors.text.tertiary, textTransform: "uppercase", letterSpacing: 0.3, mb: 0.4 }}
                  >
                    Amount
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 900, color: alnuTheme.colors.text.primary }}>
                    {profile.doseAmount}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: 11.5, fontWeight: 800, color: alnuTheme.colors.text.tertiary, textTransform: "uppercase", letterSpacing: 0.3, mb: 0.4 }}
                  >
                    Duration
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 900, color: alnuTheme.colors.text.primary }}>
                    {profile.doseDuration}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: 11.5, fontWeight: 800, color: alnuTheme.colors.text.tertiary, textTransform: "uppercase", letterSpacing: 0.3, mb: 0.4 }}
                  >
                    Type
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 900, color: alnuTheme.colors.text.primary }}>
                    {profile.doseType}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Side Effects */}
            <Box sx={{ pl: { xs: 0, md: 2.5 } }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: alnuTheme.colors.text.primary,
                  mb: 1.5,
                }}
              >
                Recurring Side Effects
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.75,
                }}
              >
                {profile.sideEffects.map((se) => (
                  <Box
                    key={se}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        minWidth: 6,
                        borderRadius: "50%",
                        bgcolor: alnuTheme.colors.primary[500],
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 800,
                        color: alnuTheme.colors.text.primary,
                        lineHeight: 1.3,
                      }}
                    >
                      {se}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* PATIENT INSIGHTS */}
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMdDown ? "1fr" : "repeat(3, 1fr)",
              gap: 2.5,
              mb: 2,
            }}
          >
            {/* Weight Loss */}
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: alnuTheme.colors.text.secondary,
                  mb: 1,
                }}
              >
                Weight Loss Journey Summary
              </Typography>

              <SummaryCard body={profile.weightLossSummary} />
            </Box>

            {/* Adherence */}
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: alnuTheme.colors.text.secondary,
                  mb: 1,
                }}
              >
                Adherence Summary
              </Typography>

              <SummaryCard body={profile.adherenceSummary} />
            </Box>

            {/* Nutrition */}
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: alnuTheme.colors.text.secondary,
                  mb: 1,
                }}
              >
                Nutrition Summary
              </Typography>

              <SummaryCard body={profile.nutritionSummary} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMdDown ? "1fr" : "1fr 380px",
              gap: 3,
              alignItems: "stretch",
            }}
          >
            {/* Left: chart */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  mb: 1.25,
                  alignItems: "center",
                }}
              >
                {tabs.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    onClick={() => setTab(t)}
                    sx={chipSx(tab === t)}
                  />
                ))}
                <Box sx={{ flex: 1 }} />
                <Box sx={{ display: "flex", gap: 1 }}>
                  {ranges.map((r) => (
                    <Chip
                      key={r}
                      label={r}
                      size="small"
                      onClick={() => setRange(r)}
                      sx={{
                        ...chipSx(range === r),
                        width: 36,
                        justifyContent: "center",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <InsightChart tab={tab} range={range} chartData={profile.chartDataByRange} />
            </Box>

            {/* Right: interactive chat */}
            <ChatBotPanel patientName={profile.name} />
          </Box>
        </Box>

        {/* PATIENT HISTORY */}
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 900, mb: 1.25 }}>
            Patient History
          </Typography>

          <Paper
            elevation={0}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              border: `1px solid ${alnuTheme.colors.border.light}`,
              p: 1.5,
            }}
          >
            <DataTable
              title={undefined}
              rows={profile.historyRows}
              columns={historyColumns}
              height={360}
              showToolbar={false}
              enableSearch={false}
              rowSelectionModel={historySelection}
              onRowSelectionModelChange={setHistorySelection}
            />
          </Paper>
        </Box>
      </Box>
      <Dialog 
        open={modalConfig.open} 
        onClose={() => setModalConfig({ ...modalConfig, open: false })}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: 18 }}>
          {modalConfig.title}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 14, color: alnuTheme.colors.text.secondary, lineHeight: 1.6 }}>
            {modalConfig.content}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setModalConfig({ ...modalConfig, open: false })}
            variant="contained"
            sx={{ bgcolor: alnuTheme.colors.primary[950], "&:hover": { bgcolor: alnuTheme.colors.primary[900] }, textTransform: 'none', fontWeight: 800, borderRadius: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </PageShell>
  );
}
