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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import PageShell from "../components/PageShell";
import DataTable from "../components/DataTable";
import { alnuTheme } from "../theme/alnuTheme";
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
} from "recharts";

/**
 * Install:
 *   npm i recharts
 */

/* ---------------- Types ---------------- */

type HistoryRow = {
  id: string;
  date: string;
  medication: string;
  dose: string;
  effects: string;
  patientSummary: string;
  nutritionSummary: string;
  adherenceSummary: string;
};

type RangeKey = "W" | "M" | "Y";
type InsightTab =
  | "Weight & Dose"
  | "Side Effects"
  | "BMI"
  | "Body Measurements"
  | "Nutrition";

type ChatRole = "user" | "assistant";
type ChatMessage = { id: string; role: ChatRole; text: string; ts: number };

/* ---------------- Mock Data ---------------- */

const historyRows: HistoryRow[] = [
  {
    id: "1",
    date: "01/05/2026",
    medication: "Med",
    dose: "1mg",
    effects: "Nausea mild",
    patientSummary: "View More",
    nutritionSummary: "View More",
    adherenceSummary: "View More",
  },
  {
    id: "2",
    date: "12/22/2025",
    medication: "Med",
    dose: "1mg",
    effects: "-",
    patientSummary: "View More",
    nutritionSummary: "View More",
    adherenceSummary: "View More",
  },
  {
    id: "3",
    date: "12/08/2025",
    medication: "Med",
    dose: "1mg",
    effects: "-",
    patientSummary: "View More",
    nutritionSummary: "View More",
    adherenceSummary: "View More",
  },
  {
    id: "4",
    date: "12/08/2025",
    medication: "Med",
    dose: "1mg",
    effects: "-",
    patientSummary: "View More",
    nutritionSummary: "View More",
    adherenceSummary: "View More",
  },
];

const chartDataByRange: Record<
  RangeKey,
  Array<{
    label: string;
    weight: number;
    dose: number;
    bmi: number;
    sideEffectsCount: number;
    waist: number;
    hip: number;
    calories: number;
    protein: number;
    carbs: number;
  }>
> = {
  W: [
    {
      label: "Mon",
      weight: 207,
      dose: 5.0,
      bmi: 30.1,
      sideEffectsCount: 1,
      waist: 41,
      hip: 44,
      calories: 2100,
      protein: 95,
      carbs: 240,
    },
    {
      label: "Tue",
      weight: 206.6,
      dose: 5.0,
      bmi: 30.0,
      sideEffectsCount: 0,
      waist: 40.8,
      hip: 43.8,
      calories: 1950,
      protein: 110,
      carbs: 210,
    },
    {
      label: "Wed",
      weight: 206.2,
      dose: 5.0,
      bmi: 29.9,
      sideEffectsCount: 1,
      waist: 40.7,
      hip: 43.7,
      calories: 2200,
      protein: 85,
      carbs: 270,
    },
    {
      label: "Thu",
      weight: 205.8,
      dose: 5.0,
      bmi: 29.8,
      sideEffectsCount: 2,
      waist: 40.6,
      hip: 43.6,
      calories: 2350,
      protein: 80,
      carbs: 290,
    },
    {
      label: "Fri",
      weight: 205.4,
      dose: 5.0,
      bmi: 29.7,
      sideEffectsCount: 0,
      waist: 40.5,
      hip: 43.5,
      calories: 2050,
      protein: 120,
      carbs: 200,
    },
    {
      label: "Sat",
      weight: 205.2,
      dose: 5.0,
      bmi: 29.6,
      sideEffectsCount: 1,
      waist: 40.4,
      hip: 43.4,
      calories: 1900,
      protein: 130,
      carbs: 180,
    },
    {
      label: "Sun",
      weight: 205.0,
      dose: 5.0,
      bmi: 29.6,
      sideEffectsCount: 0,
      waist: 40.4,
      hip: 43.4,
      calories: 2000,
      protein: 125,
      carbs: 190,
    },
  ],
  M: [
    {
      label: "Jan",
      weight: 200,
      dose: 2.5,
      bmi: 31.2,
      sideEffectsCount: 2,
      waist: 43,
      hip: 46,
      calories: 2350,
      protein: 90,
      carbs: 260,
    },
    {
      label: "Feb",
      weight: 197,
      dose: 3.0,
      bmi: 30.8,
      sideEffectsCount: 1,
      waist: 42.3,
      hip: 45.4,
      calories: 2250,
      protein: 100,
      carbs: 245,
    },
    {
      label: "Mar",
      weight: 198,
      dose: 4.0,
      bmi: 30.9,
      sideEffectsCount: 1,
      waist: 42.1,
      hip: 45.2,
      calories: 2300,
      protein: 95,
      carbs: 255,
    },
    {
      label: "Apr",
      weight: 206,
      dose: 4.5,
      bmi: 30.5,
      sideEffectsCount: 2,
      waist: 41.4,
      hip: 44.6,
      calories: 2400,
      protein: 80,
      carbs: 290,
    },
    {
      label: "May",
      weight: 218,
      dose: 5.0,
      bmi: 30.1,
      sideEffectsCount: 3,
      waist: 40.9,
      hip: 44.1,
      calories: 2550,
      protein: 75,
      carbs: 320,
    },
    {
      label: "Jun",
      weight: 205,
      dose: 5.0,
      bmi: 29.6,
      sideEffectsCount: 1,
      waist: 40.4,
      hip: 43.4,
      calories: 2100,
      protein: 115,
      carbs: 220,
    },
  ],
  Y: [
    {
      label: "2025 Q3",
      weight: 250,
      dose: 1.0,
      bmi: 36.2,
      sideEffectsCount: 4,
      waist: 47,
      hip: 50,
      calories: 2700,
      protein: 70,
      carbs: 340,
    },
    {
      label: "2025 Q4",
      weight: 230,
      dose: 3.0,
      bmi: 33.5,
      sideEffectsCount: 3,
      waist: 45,
      hip: 48,
      calories: 2550,
      protein: 85,
      carbs: 310,
    },
    {
      label: "2026 Q1",
      weight: 207,
      dose: 5.0,
      bmi: 30.1,
      sideEffectsCount: 2,
      waist: 41,
      hip: 44,
      calories: 2250,
      protein: 105,
      carbs: 250,
    },
  ],
};

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

const patient = {
  name: "Max",
  id: "#1001",
  email: "max@alnuhealth.com", // set "" to verify no empty gap
};

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
      p: 2,
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
        lineHeight: 1.4,
      }}
    >
      {body}
    </Typography>
  </Paper>
);

function InsightChart({ tab, range }: { tab: InsightTab; range: RangeKey }) {
  const data = chartDataByRange[range];

  const axisStyle = {
    fontSize: 12,
    fill: alnuTheme.colors.text.secondary,
  };

  const gridStroke = "rgba(0,0,0,0.08)";

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
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="sideEffectsCount"
                name="Side Effects"
                fill={alnuTheme.colors.primary[500]}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="label"
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              {tab === "Weight & Dose" && (
                <>
                  <Line
                    type="monotone"
                    dataKey="weight"
                    name="Weight"
                    stroke={alnuTheme.colors.primary[700]}
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="dose"
                    name="Dose"
                    stroke={alnuTheme.colors.primary[300]}
                    strokeWidth={2.5}
                    dot={false}
                  />
                </>
              )}
              {tab === "BMI" && (
                <Line
                  type="monotone"
                  dataKey="bmi"
                  name="BMI"
                  stroke={alnuTheme.colors.primary[700]}
                  strokeWidth={2.5}
                  dot={false}
                />
              )}
              {tab === "Body Measurements" && (
                <>
                  <Line
                    type="monotone"
                    dataKey="waist"
                    name="Waist"
                    stroke={alnuTheme.colors.primary[700]}
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="hip"
                    name="Hip"
                    stroke={alnuTheme.colors.primary[300]}
                    strokeWidth={2.5}
                    dot={false}
                  />
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
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="protein"
                    name="Protein (g)"
                    stroke={alnuTheme.colors.primary[400]}
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="carbs"
                    name="Carbs (g)"
                    stroke={alnuTheme.colors.primary[200]}
                    strokeWidth={2.5}
                    dot={false}
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

function buildBotReply(input: string): string {
  const q = input.trim().toLowerCase();

  if (
    q.includes("eaten") ||
    q.includes("ate") ||
    q.includes("food") ||
    q.includes("last 4")
  ) {
    return (
      "Overall Summary: Max’s intake over the past 3–4 days shows consistently low protein, higher refined carbs, and slightly elevated calories.\n\n" +
      "What Max Ate:\n" +
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

function ChatBotPanel() {
  const [draft, setDraft] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Ask anything about Max’s trends (nutrition, adherence, side effects).",
      ts: Date.now(),
    },
  ]);

  const quickFaq = useMemo(
    () => [
      {
        q: "What has Max eaten for the last 4 days?",
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
      text: buildBotReply(clean),
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

          {/* ✅ chat transcript (scrollable) */}
          <Box
            sx={{
              border: `1px solid ${alnuTheme.colors.border.light}`,
              p: 1.25,
              flex: 1,
              minHeight: 140,
              bgcolor: "rgba(0,0,0,0.01)",
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
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "88%",
                      px: 1.25,
                      py: 0.9,
                      borderRadius: 2,
                      whiteSpace: "pre-line",
                      fontSize: 13,
                      fontWeight: 700,
                      border: `1px solid ${alnuTheme.colors.border.light}`,
                      bgcolor: isUser ? "rgba(0,0,0,0.03)" : "#fff",
                      color: alnuTheme.colors.text.primary,
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

  const crumbs = [
    { label: "Patient List", to: "/patients" },
    { label: "Patient Profile" },
    { label: `${patient.name || "Patient"} - 1001` },
  ];

  const [historySelection, setHistorySelection] =
    useState<GridRowSelectionModel>([]);

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
            p: { xs: 1.25, md: 2 },
          }}
        >
          {/** ---- Standard typography tokens ---- */}
          {/** (inline here so you can copy-paste; feel free to move outside) */}
          {(() => {
            const sectionTitleSx = {
              fontSize: 16,
              fontWeight: 900,
              color: alnuTheme.colors.text.primary,
              lineHeight: 1.2,
            } as const;

            const labelSx = {
              fontSize: 12.5,
              fontWeight: 800,
              color: alnuTheme.colors.text.secondary,
              lineHeight: 1.2,
            } as const;

            const valueSx = {
              fontSize: 15,
              fontWeight: 900,
              color: alnuTheme.colors.text.primary,
              lineHeight: 1.25,
            } as const;

            const dividerSx = { mt: 1, mb: 1.5 } as const;

            return (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMdDown ? "1fr" : "220px 1fr 320px",
                  gap: { xs: 1.75, md: 2.25 },
                  alignItems: "start",
                }}
              >
                {/* LEFT: identity */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    pt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 124,
                      height: 124,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `1px solid ${alnuTheme.colors.border.light}`,
                      bgcolor: "#F3F5F4",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {/* Replace with <img /> if needed */}
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "#F3F5F4",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 36,
                        fontWeight: 900,
                        color: alnuTheme.colors.text.primary,
                      }}
                    >
                      {patient.name?.[0]?.toUpperCase() || "M"}
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", px: 2.25, textAlign: "left" }}>
                    <Typography
                      sx={{ fontSize: 18, fontWeight: 900, lineHeight: 1.15 }}
                    >
                      {patient.name || "Max"}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 14,
                        fontWeight: 900,
                        color: alnuTheme.colors.text.secondary,
                      }}
                    >
                      {patient.id || "#1001"}
                    </Typography>

                    {!!patient.email && (
                      <Typography
                        sx={{
                          mt: 0.75,
                          fontSize: 13,
                          fontWeight: 700,
                          color: alnuTheme.colors.text.secondary,
                        }}
                      >
                        {patient.email}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* MIDDLE: demographics + baseline */}
                <Box sx={{ pt: 0.25 }}>
                  <Typography sx={sectionTitleSx}>Demographics</Typography>
                  <Divider sx={dividerSx} />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: isMdDown ? "1fr" : "1fr 1fr",
                      gap: 2.5,
                      mb: 2.25,
                    }}
                  >
                    <Box>
                      <Typography sx={labelSx}>Sex</Typography>
                      <Typography sx={valueSx}>Male</Typography>
                    </Box>

                    <Box>
                      <Typography sx={labelSx}>Age</Typography>
                      <Typography sx={valueSx}>30</Typography>
                    </Box>
                  </Box>

                  <Typography sx={sectionTitleSx}>Patient Baseline</Typography>
                  <Divider sx={dividerSx} />
                  {/* ✅ Weights in ONE row */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: isMdDown
                        ? "1fr"
                        : "repeat(3, minmax(0, 1fr))",
                      gap: { xs: 2, md: 3 },
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography sx={labelSx}>Starting Weight</Typography>
                      <Typography sx={valueSx}>250 lbs</Typography>
                    </Box>

                    <Box>
                      <Typography sx={labelSx}>Current Weight</Typography>
                      <Typography sx={valueSx}>207 lbs</Typography>
                    </Box>

                    <Box>
                      <Typography sx={labelSx}>
                        Total Body Weight Loss
                      </Typography>
                      <Typography sx={valueSx}>43 lbs</Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: isMdDown
                        ? "1fr"
                        : "repeat(3, minmax(0, 1fr))",
                      gap: { xs: 2, md: 3 },
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography sx={labelSx}>
                        Medication Start Date
                      </Typography>
                      <Typography sx={valueSx}>21 September 2025</Typography>
                    </Box>
                    <Box>
                      <Typography sx={labelSx}>Adherence</Typography>
                      <Typography sx={valueSx}>92%</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* RIGHT: edit button + cards stacked + side effects below dose */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {/* Edit button */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                        height: 44,
                        boxShadow: "0px 10px 18px rgba(0,0,0,0.10)",
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Box>

                  {/* Medication card */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${alnuTheme.colors.border.light}`,
                      bgcolor: "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={labelSx}>Medication</Typography>
                        <Typography sx={{ ...valueSx, fontSize: 15.5 }}>
                          Wegovy
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={labelSx}>Duration</Typography>
                        <Typography sx={{ ...valueSx, fontSize: 15.5 }}>
                          5 Months
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Dose card */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${alnuTheme.colors.border.light}`,
                      bgcolor: "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={labelSx}>Dose</Typography>
                        <Typography sx={{ ...valueSx, fontSize: 15.5 }}>
                          5.0 mg
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={labelSx}>Duration</Typography>
                        <Typography sx={{ ...valueSx, fontSize: 15.5 }}>
                          3 Months
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={labelSx}>Type</Typography>
                        <Typography sx={{ ...valueSx, fontSize: 15.5 }}>
                          Injection
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  {/* ✅ Side effects card (smaller list) */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${alnuTheme.colors.border.light}`,
                      bgcolor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{ ...labelSx, fontSize: 13, fontWeight: 900, mb: 1 }}
                    >
                      Recurring Side Effects
                    </Typography>

                    <Box
                      component="ul"
                      sx={{
                        m: 0,
                        pl: 2.25,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.6,
                        fontSize: 13.5,
                        fontWeight: 800,
                        color: alnuTheme.colors.text.primary,
                      }}
                    >
                      <li>Nausea (3x, mild)</li>
                      <li>Constipation (1x, mild)</li>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            );
          })()}
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

              <SummaryCard body="Steady weight loss over the past 5 months." />
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

              <SummaryCard body="Medication taken consistently with no missed doses reported." />
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

              <SummaryCard body="Meeting protein goals consistently with opportunity to improve fiber intake." />
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

              <InsightChart tab={tab} range={range} />
            </Box>

            {/* Right: interactive chat */}
            <ChatBotPanel />
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
              rows={historyRows}
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
    </PageShell>
  );
}
