/* ------------------------------------------------------------------ */
/*  Centralized mock data for the provider-portal prototype           */
/* ------------------------------------------------------------------ */

// ---- Shared types ------------------------------------------------

export type PatientRow = {
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

export type ChartDataPoint = {
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
};

export type RangeKey = "W" | "M" | "Y";

export type HistoryRow = {
  id: string;
  date: string;
  medication: string;
  dose: string;
  effects: string;
  patientSummary: string;
  nutritionSummary: string;
  adherenceSummary: string;
};

export type PatientProfile = {
  name: string;
  displayId: string;
  email: string;
  sex: string;
  age: number;
  startingWeight: number;
  currentWeight: number;
  totalWeightLoss: number;
  medicationStartDate: string;
  adherence: string;
  medication: string;
  medicationDuration: string;
  doseAmount: string;
  doseDuration: string;
  doseType: string;
  sideEffects: string[];
  weightLossSummary: string;
  adherenceSummary: string;
  nutritionSummary: string;
  chartDataByRange: Record<RangeKey, ChartDataPoint[]>;
  historyRows: HistoryRow[];
};

// ---- Patient list (used by PatientListPage) ----------------------

export const patientRows: PatientRow[] = [
  { id: "M7ejDhNOOiJdnOggWpc1GgOvsMH2", name: "Ben Scire", city: "New York", state: "NY", medication: "mounjaro", dose: "2.50mg", upcomingVisit: "TBD", lastVisit: "02/12/2026", notes: "-" },
  { id: "A1b2C3d4E5f6G7h8I9j0K1l2M3n4", name: "Sarah Jenkins", city: "Boston", state: "MA", medication: "wegovy", dose: "0.25mg", upcomingVisit: "TBD", lastVisit: "02/17/2026", notes: "-" },
  { id: "B2c3D4e5F6g7H8i9J0k1L2m3N4o5", name: "David Miller", city: "Boston", state: "MA", medication: "ozempic", dose: "1.00mg", upcomingVisit: "TBD", lastVisit: "02/10/2026", notes: "-" },
  { id: "C3d4E5f6G7h8I9j0K1l2M3n4O5p6", name: "Elena Rodriguez", city: "Boston", state: "MA", medication: "mounjaro", dose: "5.00mg", upcomingVisit: "TBD", lastVisit: "02/15/2026", notes: "-" },
  { id: "D4e5F6g7H8i9J0k1L2m3N4o5P6q7", name: "Marcus Thompson", city: "Boston", state: "MA", medication: "zepbound", dose: "2.50mg", upcomingVisit: "TBD", lastVisit: "02/14/2026", notes: "-" },
  { id: "E5f6G7h8I9j0K1l2M3n4O5p6Q7r8", name: "Chloe Williams", city: "Boston", state: "MA", medication: "wegovy", dose: "1.00mg", upcomingVisit: "TBD", lastVisit: "01/28/2026", notes: "-" },
  { id: "F6g7H8i9J0k1L2m3N4o5P6q7R8s9", name: "James Kim", city: "Boston", state: "MA", medication: "Wegovy", dose: "-", upcomingVisit: "TBD", lastVisit: "01/15/2026", notes: "-" },
  { id: "G7h8I9j0K1l2M3n4O5p6Q7r8S9t0", name: "Nina Patel", city: "Boston", state: "MA", medication: "ozempic", dose: "0.50mg", upcomingVisit: "TBD", lastVisit: "02/05/2026", notes: "-" },
  { id: "H8i9J0k1L2m3N4o5P6q7R8s9T0u1", name: "Omar Hassan", city: "Boston", state: "MA", medication: "mounjaro", dose: "7.50mg", upcomingVisit: "TBD", lastVisit: "02/01/2026", notes: "-" },
  { id: "I9j0K1l2M3n4O5p6Q7r8S9t0U1v2", name: "Rachel Brown", city: "Boston", state: "MA", medication: "zepbound", dose: "2.50mg", upcomingVisit: "TBD", lastVisit: "01/20/2026", notes: "-" },
];

// ---- Per-patient profiles (used by PatientProfilePage) -----------

export const patientProfiles: Record<string, PatientProfile> = {

  /* ============================================================== */
  /*  1 · Ben Scire  (existing hardcoded data, preserved exactly)   */
  /* ============================================================== */
  "M7ejDhNOOiJdnOggWpc1GgOvsMH2": {
    name: "Ben Scire",
    displayId: "#1001",
    email: "ben@alnuhealth.com",
    sex: "Male",
    age: 30,
    startingWeight: 250,
    currentWeight: 207,
    totalWeightLoss: 43,
    medicationStartDate: "21 September 2025",
    adherence: "92%",
    medication: "Mounjaro",
    medicationDuration: "5 Months",
    doseAmount: "2.5 mg",
    doseDuration: "5 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (3x, mild)", "Constipation (1x, mild)"],
    weightLossSummary: "Steady weight loss over the past 5 months.",
    adherenceSummary: "Medication taken consistently with no missed doses reported.",
    nutritionSummary: "Meeting protein goals consistently with opportunity to improve fiber intake.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 136.2, dose: 2.5, bmi: 18.5, sideEffectsCount: 0, waist: 31.2, hip: 35.2, calories: 1650, protein: 95, carbs: 160 },
        { label: "Tue", weight: 136.0, dose: 2.5, bmi: 18.4, sideEffectsCount: 1, waist: 31.1, hip: 35.1, calories: 1580, protein: 105, carbs: 145 },
        { label: "Wed", weight: 136.1, dose: 2.5, bmi: 18.4, sideEffectsCount: 0, waist: 31.1, hip: 35.1, calories: 1720, protein: 85, carbs: 180 },
        { label: "Thu", weight: 135.9, dose: 2.5, bmi: 18.4, sideEffectsCount: 0, waist: 31.0, hip: 35.0, calories: 1600, protein: 90, carbs: 150 },
        { label: "Fri", weight: 135.8, dose: 2.5, bmi: 18.4, sideEffectsCount: 0, waist: 31.0, hip: 35.0, calories: 1850, protein: 110, carbs: 190 },
        { label: "Sat", weight: 135.8, dose: 2.5, bmi: 18.4, sideEffectsCount: 0, waist: 31.0, hip: 35.0, calories: 1900, protein: 100, carbs: 200 },
        { label: "Sun", weight: 135.6, dose: 2.5, bmi: 18.4, sideEffectsCount: 0, waist: 30.9, hip: 34.9, calories: 1750, protein: 115, carbs: 170 },
      ],
      M: [
        { label: "Sep", weight: 140.0, dose: 2.5, bmi: 19.0, sideEffectsCount: 2, waist: 32.0, hip: 36.0, calories: 2000, protein: 80, carbs: 220 },
        { label: "Oct", weight: 139.2, dose: 2.5, bmi: 18.9, sideEffectsCount: 1, waist: 31.8, hip: 35.8, calories: 1950, protein: 85, carbs: 210 },
        { label: "Nov", weight: 138.5, dose: 2.5, bmi: 18.8, sideEffectsCount: 0, waist: 31.6, hip: 35.6, calories: 1850, protein: 95, carbs: 190 },
        { label: "Dec", weight: 137.8, dose: 2.5, bmi: 18.7, sideEffectsCount: 1, waist: 31.5, hip: 35.5, calories: 1900, protein: 90, carbs: 200 },
        { label: "Jan", weight: 136.8, dose: 2.5, bmi: 18.5, sideEffectsCount: 0, waist: 31.3, hip: 35.3, calories: 1700, protein: 105, carbs: 160 },
        { label: "Feb", weight: 135.8, dose: 2.5, bmi: 18.4, sideEffectsCount: 1, waist: 31.0, hip: 35.0, calories: 1650, protein: 110, carbs: 150 },
      ],
      Y: [
        { label: "2025 Q3", weight: 140.0, dose: 2.5, bmi: 19.0, sideEffectsCount: 3, waist: 32.0, hip: 36.0, calories: 2100, protein: 75, carbs: 230 },
        { label: "2025 Q4", weight: 138.0, dose: 2.5, bmi: 18.7, sideEffectsCount: 2, waist: 31.5, hip: 35.5, calories: 1900, protein: 90, carbs: 200 },
        { label: "2026 Q1", weight: 136.0, dose: 2.5, bmi: 18.4, sideEffectsCount: 1, waist: 31.1, hip: 35.1, calories: 1680, protein: 105, carbs: 155 },
      ],
    },
    historyRows: [
      { id: "se_5", date: "02/17/2026", medication: "mounjaro", dose: "2.5mg", effects: "Mild Nausea - Woke up feeling slightly nauseous", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_5", date: "02/16/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "580 kcal, 35g protein", adherenceSummary: "-" },
      { id: "nut_4", date: "02/15/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "420 kcal, 14g protein", adherenceSummary: "-" },
      { id: "inj_5", date: "02/12/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_3", date: "02/10/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "310 kcal, 22g protein", adherenceSummary: "-" },
      { id: "se_4", date: "02/08/2026", medication: "mounjaro", dose: "2.5mg", effects: "Mild Constipation - Lasted one day", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_4", date: "02/05/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_2", date: "02/04/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "650 kcal, 45g protein", adherenceSummary: "-" },
      { id: "inj_3", date: "01/29/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "nut_1", date: "01/27/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "520 kcal, 30g protein", adherenceSummary: "-" },
      { id: "se_3", date: "01/25/2026", medication: "mounjaro", dose: "2.5mg", effects: "Mild Headache", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_2", date: "01/22/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_0", date: "01/20/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "480 kcal, 25g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "01/15/2026", medication: "mounjaro", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
    ],
  },

  /* ============================================================== */
  /*  2 · Sarah Jenkins                                             */
  /* ============================================================== */
  "A1b2C3d4E5f6G7h8I9j0K1l2M3n4": {
    name: "Sarah Jenkins",
    displayId: "#1002",
    email: "sarah.jenkins@email.com",
    sex: "Female",
    age: 42,
    startingWeight: 195,
    currentWeight: 172,
    totalWeightLoss: 23,
    medicationStartDate: "3 November 2025",
    adherence: "88%",
    medication: "Wegovy",
    medicationDuration: "3 Months",
    doseAmount: "0.25 mg",
    doseDuration: "3 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (2x, mild)", "Fatigue (1x, mild)"],
    weightLossSummary: "Consistent downward trend since starting Wegovy in November.",
    adherenceSummary: "One missed dose in December; otherwise strong compliance.",
    nutritionSummary: "Calorie intake trending down; protein could be higher at breakfast.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 172.8, dose: 0.25, bmi: 28.6, sideEffectsCount: 0, waist: 34.5, hip: 40.2, calories: 1420, protein: 72, carbs: 140 },
        { label: "Tue", weight: 172.5, dose: 0.25, bmi: 28.5, sideEffectsCount: 1, waist: 34.4, hip: 40.1, calories: 1380, protein: 80, carbs: 130 },
        { label: "Wed", weight: 172.3, dose: 0.25, bmi: 28.5, sideEffectsCount: 0, waist: 34.4, hip: 40.1, calories: 1510, protein: 68, carbs: 155 },
        { label: "Thu", weight: 172.1, dose: 0.25, bmi: 28.4, sideEffectsCount: 0, waist: 34.3, hip: 40.0, calories: 1350, protein: 85, carbs: 125 },
        { label: "Fri", weight: 172.0, dose: 0.25, bmi: 28.4, sideEffectsCount: 0, waist: 34.3, hip: 40.0, calories: 1600, protein: 78, carbs: 165 },
        { label: "Sat", weight: 172.2, dose: 0.25, bmi: 28.5, sideEffectsCount: 0, waist: 34.3, hip: 40.0, calories: 1720, protein: 65, carbs: 185 },
        { label: "Sun", weight: 172.0, dose: 0.25, bmi: 28.4, sideEffectsCount: 0, waist: 34.2, hip: 39.9, calories: 1480, protein: 90, carbs: 142 },
      ],
      M: [
        { label: "Sep", weight: 195.0, dose: 0, bmi: 32.3, sideEffectsCount: 0, waist: 37.0, hip: 42.5, calories: 2100, protein: 60, carbs: 240 },
        { label: "Oct", weight: 193.5, dose: 0, bmi: 32.0, sideEffectsCount: 0, waist: 36.8, hip: 42.3, calories: 2050, protein: 62, carbs: 235 },
        { label: "Nov", weight: 188.0, dose: 0.25, bmi: 31.1, sideEffectsCount: 2, waist: 36.0, hip: 41.6, calories: 1800, protein: 70, carbs: 200 },
        { label: "Dec", weight: 182.4, dose: 0.25, bmi: 30.2, sideEffectsCount: 1, waist: 35.4, hip: 41.0, calories: 1650, protein: 75, carbs: 175 },
        { label: "Jan", weight: 176.8, dose: 0.25, bmi: 29.3, sideEffectsCount: 0, waist: 34.8, hip: 40.4, calories: 1520, protein: 80, carbs: 155 },
        { label: "Feb", weight: 172.0, dose: 0.25, bmi: 28.4, sideEffectsCount: 1, waist: 34.2, hip: 39.9, calories: 1450, protein: 82, carbs: 140 },
      ],
      Y: [
        { label: "2025 Q3", weight: 195.0, dose: 0, bmi: 32.3, sideEffectsCount: 0, waist: 37.0, hip: 42.5, calories: 2100, protein: 60, carbs: 240 },
        { label: "2025 Q4", weight: 185.0, dose: 0.25, bmi: 30.6, sideEffectsCount: 3, waist: 35.7, hip: 41.3, calories: 1730, protein: 72, carbs: 188 },
        { label: "2026 Q1", weight: 172.0, dose: 0.25, bmi: 28.4, sideEffectsCount: 1, waist: 34.2, hip: 39.9, calories: 1480, protein: 82, carbs: 148 },
      ],
    },
    historyRows: [
      { id: "se_3", date: "02/17/2026", medication: "wegovy", dose: "0.25mg", effects: "Mild Nausea - morning after injection", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_5", date: "02/15/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "510 kcal, 32g protein", adherenceSummary: "-" },
      { id: "inj_4", date: "02/12/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_4", date: "02/10/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "620 kcal, 40g protein", adherenceSummary: "-" },
      { id: "se_2", date: "02/06/2026", medication: "wegovy", dose: "0.25mg", effects: "Fatigue - felt tired all day", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_3", date: "02/05/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "nut_3", date: "02/01/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "480 kcal, 28g protein", adherenceSummary: "-" },
      { id: "inj_2", date: "01/29/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_2", date: "01/25/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "550 kcal, 35g protein", adherenceSummary: "-" },
      { id: "se_1", date: "01/20/2026", medication: "wegovy", dose: "0.25mg", effects: "Mild Nausea - resolved by afternoon", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_1", date: "01/15/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_1", date: "01/10/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "430 kcal, 22g protein", adherenceSummary: "-" },
    ],
  },

  /* ============================================================== */
  /*  3 · David Miller                                              */
  /* ============================================================== */
  "B2c3D4e5F6g7H8i9J0k1L2m3N4o5": {
    name: "David Miller",
    displayId: "#1003",
    email: "david.miller@email.com",
    sex: "Male",
    age: 55,
    startingWeight: 260,
    currentWeight: 234,
    totalWeightLoss: 26,
    medicationStartDate: "15 August 2025",
    adherence: "95%",
    medication: "Ozempic",
    medicationDuration: "6 Months",
    doseAmount: "1.0 mg",
    doseDuration: "4 Months",
    doseType: "Injection",
    sideEffects: ["Diarrhea (2x, mild)", "Injection site redness (1x)"],
    weightLossSummary: "Gradual, steady progress; on track for 10% total body weight loss target.",
    adherenceSummary: "Excellent adherence — only one late dose since August.",
    nutritionSummary: "High carb intake at dinner; protein and fiber goals met at lunch.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 234.8, dose: 1.0, bmi: 33.1, sideEffectsCount: 0, waist: 42.1, hip: 44.5, calories: 1980, protein: 105, carbs: 195 },
        { label: "Tue", weight: 234.5, dose: 1.0, bmi: 33.0, sideEffectsCount: 0, waist: 42.0, hip: 44.4, calories: 1850, protein: 110, carbs: 180 },
        { label: "Wed", weight: 234.6, dose: 1.0, bmi: 33.1, sideEffectsCount: 1, waist: 42.0, hip: 44.4, calories: 2050, protein: 95, carbs: 215 },
        { label: "Thu", weight: 234.2, dose: 1.0, bmi: 33.0, sideEffectsCount: 0, waist: 41.9, hip: 44.3, calories: 1920, protein: 100, carbs: 190 },
        { label: "Fri", weight: 234.0, dose: 1.0, bmi: 33.0, sideEffectsCount: 0, waist: 41.9, hip: 44.3, calories: 2100, protein: 108, carbs: 210 },
        { label: "Sat", weight: 234.3, dose: 1.0, bmi: 33.0, sideEffectsCount: 0, waist: 41.9, hip: 44.3, calories: 2200, protein: 90, carbs: 240 },
        { label: "Sun", weight: 234.0, dose: 1.0, bmi: 33.0, sideEffectsCount: 0, waist: 41.8, hip: 44.2, calories: 1900, protein: 115, carbs: 185 },
      ],
      M: [
        { label: "Sep", weight: 255.0, dose: 0.5, bmi: 35.9, sideEffectsCount: 1, waist: 44.5, hip: 46.8, calories: 2300, protein: 85, carbs: 260 },
        { label: "Oct", weight: 250.2, dose: 0.5, bmi: 35.3, sideEffectsCount: 2, waist: 43.8, hip: 46.2, calories: 2200, protein: 90, carbs: 245 },
        { label: "Nov", weight: 246.0, dose: 1.0, bmi: 34.7, sideEffectsCount: 1, waist: 43.2, hip: 45.6, calories: 2100, protein: 95, carbs: 225 },
        { label: "Dec", weight: 242.0, dose: 1.0, bmi: 34.1, sideEffectsCount: 0, waist: 42.7, hip: 45.1, calories: 2050, protein: 100, carbs: 210 },
        { label: "Jan", weight: 238.0, dose: 1.0, bmi: 33.6, sideEffectsCount: 0, waist: 42.3, hip: 44.7, calories: 1980, protein: 105, carbs: 195 },
        { label: "Feb", weight: 234.0, dose: 1.0, bmi: 33.0, sideEffectsCount: 1, waist: 41.8, hip: 44.2, calories: 1950, protein: 108, carbs: 190 },
      ],
      Y: [
        { label: "2025 Q3", weight: 255.0, dose: 0.5, bmi: 35.9, sideEffectsCount: 3, waist: 44.5, hip: 46.8, calories: 2300, protein: 85, carbs: 260 },
        { label: "2025 Q4", weight: 244.0, dose: 1.0, bmi: 34.4, sideEffectsCount: 3, waist: 43.0, hip: 45.4, calories: 2080, protein: 97, carbs: 218 },
        { label: "2026 Q1", weight: 234.0, dose: 1.0, bmi: 33.0, sideEffectsCount: 1, waist: 41.8, hip: 44.2, calories: 1960, protein: 107, carbs: 192 },
      ],
    },
    historyRows: [
      { id: "nut_5", date: "02/10/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "720 kcal, 48g protein", adherenceSummary: "-" },
      { id: "se_3", date: "02/08/2026", medication: "ozempic", dose: "1.0mg", effects: "Mild Diarrhea - resolved same day", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_5", date: "02/06/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_4", date: "02/02/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "680 kcal, 42g protein", adherenceSummary: "-" },
      { id: "inj_4", date: "01/30/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_3", date: "01/26/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "590 kcal, 38g protein", adherenceSummary: "-" },
      { id: "se_2", date: "01/22/2026", medication: "ozempic", dose: "1.0mg", effects: "Injection site redness", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_3", date: "01/20/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "nut_2", date: "01/15/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "610 kcal, 44g protein", adherenceSummary: "-" },
      { id: "se_1", date: "01/10/2026", medication: "ozempic", dose: "1.0mg", effects: "Mild Diarrhea", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_2", date: "01/08/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_1", date: "01/03/2026", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "540 kcal, 30g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "12/28/2025", medication: "ozempic", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
    ],
  },

  /* ============================================================== */
  /*  4 · Elena Rodriguez                                           */
  /* ============================================================== */
  "C3d4E5f6G7h8I9j0K1l2M3n4O5p6": {
    name: "Elena Rodriguez",
    displayId: "#1004",
    email: "elena.rodriguez@email.com",
    sex: "Female",
    age: 36,
    startingWeight: 185,
    currentWeight: 158,
    totalWeightLoss: 27,
    medicationStartDate: "1 October 2025",
    adherence: "97%",
    medication: "Mounjaro",
    medicationDuration: "4 Months",
    doseAmount: "5.0 mg",
    doseDuration: "2 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (1x, moderate)", "Decreased appetite (ongoing, mild)"],
    weightLossSummary: "Strong progress — approaching goal weight of 150 lbs.",
    adherenceSummary: "Near-perfect adherence; no missed doses in the last 3 months.",
    nutritionSummary: "Balanced macros overall; could benefit from more hydration and fiber.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 158.6, dose: 5.0, bmi: 25.8, sideEffectsCount: 0, waist: 30.8, hip: 38.2, calories: 1380, protein: 82, carbs: 130 },
        { label: "Tue", weight: 158.4, dose: 5.0, bmi: 25.7, sideEffectsCount: 0, waist: 30.7, hip: 38.1, calories: 1420, protein: 88, carbs: 125 },
        { label: "Wed", weight: 158.2, dose: 5.0, bmi: 25.7, sideEffectsCount: 1, waist: 30.7, hip: 38.1, calories: 1350, protein: 90, carbs: 118 },
        { label: "Thu", weight: 158.0, dose: 5.0, bmi: 25.7, sideEffectsCount: 0, waist: 30.6, hip: 38.0, calories: 1480, protein: 78, carbs: 148 },
        { label: "Fri", weight: 157.8, dose: 5.0, bmi: 25.6, sideEffectsCount: 0, waist: 30.6, hip: 38.0, calories: 1550, protein: 85, carbs: 155 },
        { label: "Sat", weight: 158.0, dose: 5.0, bmi: 25.7, sideEffectsCount: 0, waist: 30.6, hip: 38.0, calories: 1680, protein: 72, carbs: 178 },
        { label: "Sun", weight: 157.6, dose: 5.0, bmi: 25.6, sideEffectsCount: 0, waist: 30.5, hip: 37.9, calories: 1400, protein: 92, carbs: 128 },
      ],
      M: [
        { label: "Sep", weight: 185.0, dose: 0, bmi: 30.1, sideEffectsCount: 0, waist: 34.0, hip: 41.5, calories: 1950, protein: 65, carbs: 220 },
        { label: "Oct", weight: 180.0, dose: 2.5, bmi: 29.3, sideEffectsCount: 1, waist: 33.2, hip: 40.8, calories: 1750, protein: 72, carbs: 195 },
        { label: "Nov", weight: 174.0, dose: 2.5, bmi: 28.3, sideEffectsCount: 0, waist: 32.4, hip: 40.0, calories: 1600, protein: 78, carbs: 170 },
        { label: "Dec", weight: 168.0, dose: 5.0, bmi: 27.3, sideEffectsCount: 1, waist: 31.6, hip: 39.2, calories: 1520, protein: 82, carbs: 150 },
        { label: "Jan", weight: 163.0, dose: 5.0, bmi: 26.5, sideEffectsCount: 0, waist: 31.0, hip: 38.6, calories: 1450, protein: 85, carbs: 138 },
        { label: "Feb", weight: 158.0, dose: 5.0, bmi: 25.7, sideEffectsCount: 0, waist: 30.5, hip: 37.9, calories: 1420, protein: 88, carbs: 130 },
      ],
      Y: [
        { label: "2025 Q3", weight: 185.0, dose: 0, bmi: 30.1, sideEffectsCount: 0, waist: 34.0, hip: 41.5, calories: 1950, protein: 65, carbs: 220 },
        { label: "2025 Q4", weight: 171.0, dose: 5.0, bmi: 27.8, sideEffectsCount: 2, waist: 32.0, hip: 39.6, calories: 1560, protein: 80, carbs: 160 },
        { label: "2026 Q1", weight: 158.0, dose: 5.0, bmi: 25.7, sideEffectsCount: 0, waist: 30.5, hip: 37.9, calories: 1430, protein: 87, carbs: 132 },
      ],
    },
    historyRows: [
      { id: "nut_5", date: "02/15/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "490 kcal, 38g protein", adherenceSummary: "-" },
      { id: "inj_5", date: "02/13/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_4", date: "02/10/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "520 kcal, 42g protein", adherenceSummary: "-" },
      { id: "se_2", date: "02/07/2026", medication: "mounjaro", dose: "5.0mg", effects: "Decreased appetite - skipped lunch", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_4", date: "02/06/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "nut_3", date: "02/02/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "460 kcal, 35g protein", adherenceSummary: "-" },
      { id: "inj_3", date: "01/30/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_2", date: "01/25/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "540 kcal, 40g protein", adherenceSummary: "-" },
      { id: "se_1", date: "01/20/2026", medication: "mounjaro", dose: "5.0mg", effects: "Moderate Nausea - lasted several hours", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_2", date: "01/18/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_1", date: "01/12/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "500 kcal, 32g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "01/05/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
    ],
  },

  /* ============================================================== */
  /*  5 · Marcus Thompson                                           */
  /* ============================================================== */
  "D4e5F6g7H8i9J0k1L2m3N4o5P6q7": {
    name: "Marcus Thompson",
    displayId: "#1005",
    email: "marcus.t@email.com",
    sex: "Male",
    age: 48,
    startingWeight: 230,
    currentWeight: 215,
    totalWeightLoss: 15,
    medicationStartDate: "10 December 2025",
    adherence: "85%",
    medication: "Zepbound",
    medicationDuration: "2 Months",
    doseAmount: "2.5 mg",
    doseDuration: "2 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (2x, mild)", "Headache (2x, mild)", "Constipation (1x, mild)"],
    weightLossSummary: "Early stage — losing at a healthy pace of ~2 lbs/week.",
    adherenceSummary: "Missed two doses in January; reminder system recommended.",
    nutritionSummary: "High calorie weekends; weekday intake is on target.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 215.5, dose: 2.5, bmi: 31.8, sideEffectsCount: 0, waist: 39.2, hip: 42.0, calories: 1780, protein: 98, carbs: 175 },
        { label: "Tue", weight: 215.2, dose: 2.5, bmi: 31.7, sideEffectsCount: 1, waist: 39.1, hip: 41.9, calories: 1650, protein: 105, carbs: 158 },
        { label: "Wed", weight: 215.4, dose: 2.5, bmi: 31.8, sideEffectsCount: 0, waist: 39.1, hip: 41.9, calories: 1820, protein: 92, carbs: 188 },
        { label: "Thu", weight: 215.0, dose: 2.5, bmi: 31.7, sideEffectsCount: 0, waist: 39.0, hip: 41.8, calories: 1700, protein: 100, carbs: 165 },
        { label: "Fri", weight: 214.8, dose: 2.5, bmi: 31.7, sideEffectsCount: 1, waist: 39.0, hip: 41.8, calories: 1950, protein: 88, carbs: 205 },
        { label: "Sat", weight: 215.2, dose: 2.5, bmi: 31.8, sideEffectsCount: 0, waist: 39.0, hip: 41.8, calories: 2150, protein: 82, carbs: 235 },
        { label: "Sun", weight: 214.8, dose: 2.5, bmi: 31.7, sideEffectsCount: 0, waist: 38.9, hip: 41.7, calories: 1850, protein: 95, carbs: 190 },
      ],
      M: [
        { label: "Sep", weight: 230.0, dose: 0, bmi: 34.0, sideEffectsCount: 0, waist: 41.5, hip: 44.0, calories: 2400, protein: 80, carbs: 280 },
        { label: "Oct", weight: 229.0, dose: 0, bmi: 33.8, sideEffectsCount: 0, waist: 41.3, hip: 43.8, calories: 2350, protein: 82, carbs: 272 },
        { label: "Nov", weight: 228.0, dose: 0, bmi: 33.7, sideEffectsCount: 0, waist: 41.1, hip: 43.6, calories: 2280, protein: 85, carbs: 260 },
        { label: "Dec", weight: 225.0, dose: 2.5, bmi: 33.2, sideEffectsCount: 3, waist: 40.5, hip: 43.0, calories: 2000, protein: 90, carbs: 218 },
        { label: "Jan", weight: 220.0, dose: 2.5, bmi: 32.5, sideEffectsCount: 2, waist: 39.8, hip: 42.4, calories: 1850, protein: 95, carbs: 195 },
        { label: "Feb", weight: 215.0, dose: 2.5, bmi: 31.7, sideEffectsCount: 1, waist: 39.0, hip: 41.8, calories: 1800, protein: 98, carbs: 180 },
      ],
      Y: [
        { label: "2025 Q3", weight: 230.0, dose: 0, bmi: 34.0, sideEffectsCount: 0, waist: 41.5, hip: 44.0, calories: 2400, protein: 80, carbs: 280 },
        { label: "2025 Q4", weight: 226.0, dose: 2.5, bmi: 33.4, sideEffectsCount: 3, waist: 40.8, hip: 43.3, calories: 2140, protein: 87, carbs: 240 },
        { label: "2026 Q1", weight: 215.0, dose: 2.5, bmi: 31.7, sideEffectsCount: 3, waist: 39.0, hip: 41.8, calories: 1820, protein: 96, carbs: 188 },
      ],
    },
    historyRows: [
      { id: "se_4", date: "02/14/2026", medication: "zepbound", dose: "2.5mg", effects: "Mild Headache - evening", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_4", date: "02/12/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "650 kcal, 42g protein", adherenceSummary: "-" },
      { id: "inj_4", date: "02/10/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "se_3", date: "02/05/2026", medication: "zepbound", dose: "2.5mg", effects: "Mild Nausea - after breakfast", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_3", date: "02/03/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "580 kcal, 38g protein", adherenceSummary: "-" },
      { id: "inj_3", date: "02/01/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_2", date: "01/28/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "710 kcal, 45g protein", adherenceSummary: "-" },
      { id: "se_2", date: "01/24/2026", medication: "zepbound", dose: "2.5mg", effects: "Mild Constipation", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_2", date: "01/22/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "se_1", date: "01/15/2026", medication: "zepbound", dose: "2.5mg", effects: "Mild Nausea + Headache", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_1", date: "01/10/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "620 kcal, 36g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "01/05/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
    ],
  },

  /* ============================================================== */
  /*  6 · Chloe Williams                                            */
  /* ============================================================== */
  "E5f6G7h8I9j0K1l2M3n4O5p6Q7r8": {
    name: "Chloe Williams",
    displayId: "#1006",
    email: "chloe.w@email.com",
    sex: "Female",
    age: 29,
    startingWeight: 175,
    currentWeight: 152,
    totalWeightLoss: 23,
    medicationStartDate: "20 September 2025",
    adherence: "96%",
    medication: "Wegovy",
    medicationDuration: "5 Months",
    doseAmount: "1.0 mg",
    doseDuration: "2 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (2x, mild)", "Dizziness (1x, mild)"],
    weightLossSummary: "Excellent progress — 13% total body weight lost.",
    adherenceSummary: "Very consistent; one late injection logged in November.",
    nutritionSummary: "Good macro balance; weekend snacking slightly above target.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 152.4, dose: 1.0, bmi: 26.0, sideEffectsCount: 0, waist: 29.8, hip: 37.5, calories: 1320, protein: 78, carbs: 125 },
        { label: "Tue", weight: 152.2, dose: 1.0, bmi: 25.9, sideEffectsCount: 0, waist: 29.7, hip: 37.4, calories: 1280, protein: 82, carbs: 118 },
        { label: "Wed", weight: 152.0, dose: 1.0, bmi: 25.9, sideEffectsCount: 0, waist: 29.7, hip: 37.4, calories: 1410, protein: 75, carbs: 140 },
        { label: "Thu", weight: 151.8, dose: 1.0, bmi: 25.9, sideEffectsCount: 1, waist: 29.6, hip: 37.3, calories: 1250, protein: 88, carbs: 110 },
        { label: "Fri", weight: 151.6, dose: 1.0, bmi: 25.8, sideEffectsCount: 0, waist: 29.6, hip: 37.3, calories: 1500, protein: 80, carbs: 152 },
        { label: "Sat", weight: 152.0, dose: 1.0, bmi: 25.9, sideEffectsCount: 0, waist: 29.6, hip: 37.3, calories: 1650, protein: 68, carbs: 178 },
        { label: "Sun", weight: 151.5, dose: 1.0, bmi: 25.8, sideEffectsCount: 0, waist: 29.5, hip: 37.2, calories: 1380, protein: 85, carbs: 130 },
      ],
      M: [
        { label: "Sep", weight: 175.0, dose: 0.25, bmi: 29.8, sideEffectsCount: 1, waist: 33.0, hip: 40.5, calories: 1850, protein: 62, carbs: 210 },
        { label: "Oct", weight: 170.0, dose: 0.5, bmi: 29.0, sideEffectsCount: 1, waist: 32.2, hip: 39.8, calories: 1700, protein: 68, carbs: 188 },
        { label: "Nov", weight: 165.0, dose: 0.5, bmi: 28.1, sideEffectsCount: 0, waist: 31.4, hip: 39.0, calories: 1580, protein: 72, carbs: 168 },
        { label: "Dec", weight: 160.0, dose: 1.0, bmi: 27.3, sideEffectsCount: 1, waist: 30.6, hip: 38.2, calories: 1480, protein: 76, carbs: 148 },
        { label: "Jan", weight: 156.0, dose: 1.0, bmi: 26.6, sideEffectsCount: 0, waist: 30.1, hip: 37.7, calories: 1380, protein: 80, carbs: 132 },
        { label: "Feb", weight: 152.0, dose: 1.0, bmi: 25.9, sideEffectsCount: 0, waist: 29.5, hip: 37.2, calories: 1350, protein: 83, carbs: 125 },
      ],
      Y: [
        { label: "2025 Q3", weight: 175.0, dose: 0.25, bmi: 29.8, sideEffectsCount: 1, waist: 33.0, hip: 40.5, calories: 1850, protein: 62, carbs: 210 },
        { label: "2025 Q4", weight: 162.0, dose: 1.0, bmi: 27.6, sideEffectsCount: 2, waist: 31.0, hip: 38.6, calories: 1530, protein: 74, carbs: 158 },
        { label: "2026 Q1", weight: 152.0, dose: 1.0, bmi: 25.9, sideEffectsCount: 0, waist: 29.5, hip: 37.2, calories: 1360, protein: 82, carbs: 128 },
      ],
    },
    historyRows: [
      { id: "nut_4", date: "01/28/2026", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "450 kcal, 30g protein", adherenceSummary: "-" },
      { id: "inj_4", date: "01/26/2026", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "se_2", date: "01/22/2026", medication: "wegovy", dose: "1.0mg", effects: "Mild Dizziness - resolved quickly", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_3", date: "01/20/2026", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "510 kcal, 35g protein", adherenceSummary: "-" },
      { id: "inj_3", date: "01/18/2026", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "nut_2", date: "01/14/2026", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "480 kcal, 32g protein", adherenceSummary: "-" },
      { id: "se_1", date: "01/10/2026", medication: "wegovy", dose: "1.0mg", effects: "Mild Nausea - morning", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_2", date: "01/08/2026", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_1", date: "01/05/2026", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "520 kcal, 28g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "12/30/2025", medication: "wegovy", dose: "1.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
    ],
  },

  /* ============================================================== */
  /*  7 · James Kim                                                 */
  /* ============================================================== */
  "F6g7H8i9J0k1L2m3N4o5P6q7R8s9": {
    name: "James Kim",
    displayId: "#1007",
    email: "james.kim@email.com",
    sex: "Male",
    age: 38,
    startingWeight: 210,
    currentWeight: 210,
    totalWeightLoss: 0,
    medicationStartDate: "12 January 2026",
    adherence: "100%",
    medication: "Wegovy",
    medicationDuration: "1 Month",
    doseAmount: "0.25 mg",
    doseDuration: "1 Month",
    doseType: "Injection",
    sideEffects: ["Injection site bruising (1x)"],
    weightLossSummary: "Just started — too early to assess weight loss trend.",
    adherenceSummary: "Perfect adherence since starting one month ago.",
    nutritionSummary: "Baseline diet logged; initial nutrition plan in progress.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 210.2, dose: 0.25, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2100, protein: 85, carbs: 230 },
        { label: "Tue", weight: 210.0, dose: 0.25, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2050, protein: 90, carbs: 222 },
        { label: "Wed", weight: 210.3, dose: 0.25, bmi: 30.2, sideEffectsCount: 1, waist: 38.0, hip: 41.5, calories: 2200, protein: 80, carbs: 248 },
        { label: "Thu", weight: 209.8, dose: 0.25, bmi: 30.1, sideEffectsCount: 0, waist: 37.9, hip: 41.4, calories: 1980, protein: 92, carbs: 210 },
        { label: "Fri", weight: 210.0, dose: 0.25, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2150, protein: 88, carbs: 238 },
        { label: "Sat", weight: 210.4, dose: 0.25, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2350, protein: 78, carbs: 268 },
        { label: "Sun", weight: 210.0, dose: 0.25, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2080, protein: 86, carbs: 225 },
      ],
      M: [
        { label: "Sep", weight: 210.0, dose: 0, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2400, protein: 75, carbs: 280 },
        { label: "Oct", weight: 210.5, dose: 0, bmi: 30.2, sideEffectsCount: 0, waist: 38.1, hip: 41.6, calories: 2380, protein: 76, carbs: 275 },
        { label: "Nov", weight: 211.0, dose: 0, bmi: 30.3, sideEffectsCount: 0, waist: 38.2, hip: 41.6, calories: 2420, protein: 74, carbs: 282 },
        { label: "Dec", weight: 212.0, dose: 0, bmi: 30.5, sideEffectsCount: 0, waist: 38.3, hip: 41.7, calories: 2500, protein: 72, carbs: 295 },
        { label: "Jan", weight: 211.0, dose: 0.25, bmi: 30.3, sideEffectsCount: 1, waist: 38.2, hip: 41.6, calories: 2150, protein: 85, carbs: 240 },
        { label: "Feb", weight: 210.0, dose: 0.25, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2100, protein: 88, carbs: 230 },
      ],
      Y: [
        { label: "2025 Q3", weight: 210.0, dose: 0, bmi: 30.2, sideEffectsCount: 0, waist: 38.0, hip: 41.5, calories: 2400, protein: 75, carbs: 280 },
        { label: "2025 Q4", weight: 211.5, dose: 0, bmi: 30.4, sideEffectsCount: 0, waist: 38.2, hip: 41.7, calories: 2460, protein: 73, carbs: 288 },
        { label: "2026 Q1", weight: 210.0, dose: 0.25, bmi: 30.2, sideEffectsCount: 1, waist: 38.0, hip: 41.5, calories: 2120, protein: 86, carbs: 235 },
      ],
    },
    historyRows: [
      { id: "inj_2", date: "01/19/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "se_1", date: "01/15/2026", medication: "wegovy", dose: "0.25mg", effects: "Injection site bruising", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_1", date: "01/12/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_2", date: "01/18/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "780 kcal, 42g protein", adherenceSummary: "-" },
      { id: "nut_1", date: "01/14/2026", medication: "wegovy", dose: "0.25mg", effects: "-", patientSummary: "View More", nutritionSummary: "820 kcal, 38g protein", adherenceSummary: "-" },
    ],
  },

  /* ============================================================== */
  /*  8 · Nina Patel                                                */
  /* ============================================================== */
  "G7h8I9j0K1l2M3n4O5p6Q7r8S9t0": {
    name: "Nina Patel",
    displayId: "#1008",
    email: "nina.patel@email.com",
    sex: "Female",
    age: 33,
    startingWeight: 168,
    currentWeight: 148,
    totalWeightLoss: 20,
    medicationStartDate: "5 October 2025",
    adherence: "94%",
    medication: "Ozempic",
    medicationDuration: "4 Months",
    doseAmount: "0.5 mg",
    doseDuration: "3 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (3x, mild)", "Headache (1x, mild)"],
    weightLossSummary: "On track — 12% body weight lost with steady downward curve.",
    adherenceSummary: "Solid adherence; one missed dose due to travel in December.",
    nutritionSummary: "Protein goals met consistently; reducing late-night snacking.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 148.5, dose: 0.5, bmi: 25.4, sideEffectsCount: 0, waist: 29.2, hip: 37.0, calories: 1350, protein: 80, carbs: 128 },
        { label: "Tue", weight: 148.3, dose: 0.5, bmi: 25.3, sideEffectsCount: 1, waist: 29.1, hip: 36.9, calories: 1300, protein: 85, carbs: 120 },
        { label: "Wed", weight: 148.1, dose: 0.5, bmi: 25.3, sideEffectsCount: 0, waist: 29.1, hip: 36.9, calories: 1420, protein: 78, carbs: 142 },
        { label: "Thu", weight: 148.0, dose: 0.5, bmi: 25.3, sideEffectsCount: 0, waist: 29.0, hip: 36.8, calories: 1280, protein: 88, carbs: 115 },
        { label: "Fri", weight: 147.8, dose: 0.5, bmi: 25.2, sideEffectsCount: 0, waist: 29.0, hip: 36.8, calories: 1500, protein: 82, carbs: 150 },
        { label: "Sat", weight: 148.2, dose: 0.5, bmi: 25.3, sideEffectsCount: 0, waist: 29.0, hip: 36.8, calories: 1620, protein: 70, carbs: 172 },
        { label: "Sun", weight: 147.8, dose: 0.5, bmi: 25.2, sideEffectsCount: 0, waist: 28.9, hip: 36.7, calories: 1380, protein: 86, carbs: 132 },
      ],
      M: [
        { label: "Sep", weight: 168.0, dose: 0, bmi: 28.7, sideEffectsCount: 0, waist: 32.5, hip: 39.8, calories: 1900, protein: 62, carbs: 218 },
        { label: "Oct", weight: 164.0, dose: 0.25, bmi: 28.0, sideEffectsCount: 2, waist: 31.8, hip: 39.2, calories: 1720, protein: 68, carbs: 192 },
        { label: "Nov", weight: 159.0, dose: 0.5, bmi: 27.2, sideEffectsCount: 1, waist: 31.0, hip: 38.4, calories: 1580, protein: 74, carbs: 168 },
        { label: "Dec", weight: 155.0, dose: 0.5, bmi: 26.5, sideEffectsCount: 0, waist: 30.2, hip: 37.6, calories: 1480, protein: 78, carbs: 148 },
        { label: "Jan", weight: 151.0, dose: 0.5, bmi: 25.8, sideEffectsCount: 1, waist: 29.5, hip: 37.0, calories: 1400, protein: 82, carbs: 135 },
        { label: "Feb", weight: 148.0, dose: 0.5, bmi: 25.3, sideEffectsCount: 0, waist: 29.0, hip: 36.8, calories: 1360, protein: 84, carbs: 128 },
      ],
      Y: [
        { label: "2025 Q3", weight: 168.0, dose: 0, bmi: 28.7, sideEffectsCount: 0, waist: 32.5, hip: 39.8, calories: 1900, protein: 62, carbs: 218 },
        { label: "2025 Q4", weight: 157.0, dose: 0.5, bmi: 26.8, sideEffectsCount: 3, waist: 30.6, hip: 38.0, calories: 1530, protein: 76, carbs: 158 },
        { label: "2026 Q1", weight: 148.0, dose: 0.5, bmi: 25.3, sideEffectsCount: 1, waist: 29.0, hip: 36.8, calories: 1380, protein: 83, carbs: 130 },
      ],
    },
    historyRows: [
      { id: "nut_5", date: "02/05/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "460 kcal, 32g protein", adherenceSummary: "-" },
      { id: "inj_4", date: "02/03/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "se_3", date: "01/30/2026", medication: "ozempic", dose: "0.5mg", effects: "Mild Nausea - evening", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_4", date: "01/28/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "490 kcal, 35g protein", adherenceSummary: "-" },
      { id: "inj_3", date: "01/25/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_3", date: "01/22/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "520 kcal, 38g protein", adherenceSummary: "-" },
      { id: "se_2", date: "01/18/2026", medication: "ozempic", dose: "0.5mg", effects: "Mild Headache", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_2", date: "01/15/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "se_1", date: "01/10/2026", medication: "ozempic", dose: "0.5mg", effects: "Mild Nausea - after injection", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_2", date: "01/08/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "440 kcal, 30g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "01/05/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_1", date: "01/02/2026", medication: "ozempic", dose: "0.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "410 kcal, 26g protein", adherenceSummary: "-" },
    ],
  },

  /* ============================================================== */
  /*  9 · Omar Hassan                                               */
  /* ============================================================== */
  "H8i9J0k1L2m3N4o5P6q7R8s9T0u1": {
    name: "Omar Hassan",
    displayId: "#1009",
    email: "omar.hassan@email.com",
    sex: "Male",
    age: 44,
    startingWeight: 245,
    currentWeight: 218,
    totalWeightLoss: 27,
    medicationStartDate: "1 September 2025",
    adherence: "90%",
    medication: "Mounjaro",
    medicationDuration: "5 Months",
    doseAmount: "7.5 mg",
    doseDuration: "2 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (4x, mild-moderate)", "Constipation (2x, mild)", "Fatigue (1x)"],
    weightLossSummary: "Strong results — 11% total body weight lost across 5 months.",
    adherenceSummary: "Two missed doses total; both during holiday travel.",
    nutritionSummary: "High protein intake; fiber and vegetable servings below target.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 218.6, dose: 7.5, bmi: 31.4, sideEffectsCount: 1, waist: 40.0, hip: 43.2, calories: 1850, protein: 110, carbs: 178 },
        { label: "Tue", weight: 218.2, dose: 7.5, bmi: 31.3, sideEffectsCount: 0, waist: 39.9, hip: 43.1, calories: 1780, protein: 115, carbs: 165 },
        { label: "Wed", weight: 218.0, dose: 7.5, bmi: 31.3, sideEffectsCount: 0, waist: 39.9, hip: 43.1, calories: 1920, protein: 102, carbs: 195 },
        { label: "Thu", weight: 217.8, dose: 7.5, bmi: 31.3, sideEffectsCount: 1, waist: 39.8, hip: 43.0, calories: 1750, protein: 118, carbs: 160 },
        { label: "Fri", weight: 217.5, dose: 7.5, bmi: 31.2, sideEffectsCount: 0, waist: 39.8, hip: 43.0, calories: 2000, protein: 105, carbs: 205 },
        { label: "Sat", weight: 218.0, dose: 7.5, bmi: 31.3, sideEffectsCount: 0, waist: 39.8, hip: 43.0, calories: 2180, protein: 95, carbs: 240 },
        { label: "Sun", weight: 217.5, dose: 7.5, bmi: 31.2, sideEffectsCount: 0, waist: 39.7, hip: 42.9, calories: 1880, protein: 112, carbs: 182 },
      ],
      M: [
        { label: "Sep", weight: 245.0, dose: 2.5, bmi: 35.2, sideEffectsCount: 2, waist: 44.0, hip: 46.5, calories: 2300, protein: 88, carbs: 265 },
        { label: "Oct", weight: 240.0, dose: 2.5, bmi: 34.5, sideEffectsCount: 1, waist: 43.2, hip: 45.8, calories: 2150, protein: 95, carbs: 240 },
        { label: "Nov", weight: 235.0, dose: 5.0, bmi: 33.8, sideEffectsCount: 2, waist: 42.4, hip: 45.0, calories: 2050, protein: 100, carbs: 220 },
        { label: "Dec", weight: 229.0, dose: 5.0, bmi: 32.9, sideEffectsCount: 1, waist: 41.5, hip: 44.2, calories: 1950, protein: 105, carbs: 200 },
        { label: "Jan", weight: 223.0, dose: 7.5, bmi: 32.1, sideEffectsCount: 2, waist: 40.6, hip: 43.5, calories: 1880, protein: 110, carbs: 185 },
        { label: "Feb", weight: 218.0, dose: 7.5, bmi: 31.3, sideEffectsCount: 1, waist: 39.8, hip: 43.0, calories: 1850, protein: 112, carbs: 178 },
      ],
      Y: [
        { label: "2025 Q3", weight: 245.0, dose: 2.5, bmi: 35.2, sideEffectsCount: 3, waist: 44.0, hip: 46.5, calories: 2300, protein: 88, carbs: 265 },
        { label: "2025 Q4", weight: 232.0, dose: 5.0, bmi: 33.3, sideEffectsCount: 4, waist: 42.0, hip: 44.6, calories: 2000, protein: 102, carbs: 210 },
        { label: "2026 Q1", weight: 218.0, dose: 7.5, bmi: 31.3, sideEffectsCount: 3, waist: 39.8, hip: 43.0, calories: 1860, protein: 111, carbs: 180 },
      ],
    },
    historyRows: [
      { id: "se_5", date: "02/01/2026", medication: "mounjaro", dose: "7.5mg", effects: "Mild Nausea - morning after dose increase", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_5", date: "01/31/2026", medication: "mounjaro", dose: "7.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_5", date: "01/28/2026", medication: "mounjaro", dose: "7.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "680 kcal, 50g protein", adherenceSummary: "-" },
      { id: "se_4", date: "01/25/2026", medication: "mounjaro", dose: "7.5mg", effects: "Mild Constipation", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_4", date: "01/24/2026", medication: "mounjaro", dose: "7.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "nut_4", date: "01/20/2026", medication: "mounjaro", dose: "7.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "720 kcal, 55g protein", adherenceSummary: "-" },
      { id: "se_3", date: "01/16/2026", medication: "mounjaro", dose: "5.0mg", effects: "Fatigue - lasted all afternoon", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_3", date: "01/14/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "nut_3", date: "01/10/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "600 kcal, 45g protein", adherenceSummary: "-" },
      { id: "se_2", date: "01/05/2026", medication: "mounjaro", dose: "5.0mg", effects: "Moderate Nausea - needed rest", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_2", date: "01/03/2026", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "se_1", date: "12/28/2025", medication: "mounjaro", dose: "5.0mg", effects: "Mild Constipation", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_2", date: "12/22/2025", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "640 kcal, 42g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "12/18/2025", medication: "mounjaro", dose: "5.0mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
    ],
  },

  /* ============================================================== */
  /*  10 · Rachel Brown                                             */
  /* ============================================================== */
  "I9j0K1l2M3n4O5p6Q7r8S9t0U1v2": {
    name: "Rachel Brown",
    displayId: "#1010",
    email: "rachel.brown@email.com",
    sex: "Female",
    age: 51,
    startingWeight: 220,
    currentWeight: 198,
    totalWeightLoss: 22,
    medicationStartDate: "15 October 2025",
    adherence: "91%",
    medication: "Zepbound",
    medicationDuration: "4 Months",
    doseAmount: "2.5 mg",
    doseDuration: "4 Months",
    doseType: "Injection",
    sideEffects: ["Nausea (2x, mild)", "Abdominal pain (1x, mild)", "Heartburn (1x)"],
    weightLossSummary: "Steady 10% loss — consistent 1.5 lbs/week average.",
    adherenceSummary: "Good adherence overall; two late doses in November.",
    nutritionSummary: "Solid protein intake; could reduce sodium and processed carbs.",
    chartDataByRange: {
      W: [
        { label: "Mon", weight: 198.5, dose: 2.5, bmi: 32.0, sideEffectsCount: 0, waist: 36.8, hip: 42.5, calories: 1580, protein: 88, carbs: 155 },
        { label: "Tue", weight: 198.2, dose: 2.5, bmi: 31.9, sideEffectsCount: 0, waist: 36.7, hip: 42.4, calories: 1520, protein: 92, carbs: 145 },
        { label: "Wed", weight: 198.0, dose: 2.5, bmi: 31.9, sideEffectsCount: 1, waist: 36.7, hip: 42.4, calories: 1650, protein: 82, carbs: 170 },
        { label: "Thu", weight: 197.8, dose: 2.5, bmi: 31.9, sideEffectsCount: 0, waist: 36.6, hip: 42.3, calories: 1480, protein: 95, carbs: 138 },
        { label: "Fri", weight: 197.5, dose: 2.5, bmi: 31.8, sideEffectsCount: 0, waist: 36.6, hip: 42.3, calories: 1700, protein: 86, carbs: 175 },
        { label: "Sat", weight: 198.0, dose: 2.5, bmi: 31.9, sideEffectsCount: 0, waist: 36.6, hip: 42.3, calories: 1850, protein: 78, carbs: 198 },
        { label: "Sun", weight: 197.5, dose: 2.5, bmi: 31.8, sideEffectsCount: 0, waist: 36.5, hip: 42.2, calories: 1550, protein: 90, carbs: 152 },
      ],
      M: [
        { label: "Sep", weight: 220.0, dose: 0, bmi: 35.5, sideEffectsCount: 0, waist: 40.5, hip: 46.0, calories: 2200, protein: 70, carbs: 260 },
        { label: "Oct", weight: 218.0, dose: 0, bmi: 35.1, sideEffectsCount: 0, waist: 40.2, hip: 45.7, calories: 2150, protein: 72, carbs: 252 },
        { label: "Nov", weight: 213.0, dose: 2.5, bmi: 34.3, sideEffectsCount: 2, waist: 39.2, hip: 44.8, calories: 1850, protein: 80, carbs: 205 },
        { label: "Dec", weight: 208.0, dose: 2.5, bmi: 33.5, sideEffectsCount: 1, waist: 38.2, hip: 43.8, calories: 1720, protein: 85, carbs: 182 },
        { label: "Jan", weight: 203.0, dose: 2.5, bmi: 32.7, sideEffectsCount: 1, waist: 37.3, hip: 42.9, calories: 1620, protein: 88, carbs: 162 },
        { label: "Feb", weight: 198.0, dose: 2.5, bmi: 31.9, sideEffectsCount: 0, waist: 36.5, hip: 42.2, calories: 1570, protein: 90, carbs: 155 },
      ],
      Y: [
        { label: "2025 Q3", weight: 220.0, dose: 0, bmi: 35.5, sideEffectsCount: 0, waist: 40.5, hip: 46.0, calories: 2200, protein: 70, carbs: 260 },
        { label: "2025 Q4", weight: 210.0, dose: 2.5, bmi: 33.9, sideEffectsCount: 3, waist: 38.7, hip: 44.3, calories: 1790, protein: 82, carbs: 194 },
        { label: "2026 Q1", weight: 198.0, dose: 2.5, bmi: 31.9, sideEffectsCount: 1, waist: 36.5, hip: 42.2, calories: 1590, protein: 89, carbs: 158 },
      ],
    },
    historyRows: [
      { id: "se_3", date: "01/20/2026", medication: "zepbound", dose: "2.5mg", effects: "Heartburn - after spicy meal", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_5", date: "01/18/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "560 kcal, 40g protein", adherenceSummary: "-" },
      { id: "inj_4", date: "01/16/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_4", date: "01/12/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "620 kcal, 44g protein", adherenceSummary: "-" },
      { id: "se_2", date: "01/08/2026", medication: "zepbound", dose: "2.5mg", effects: "Mild Abdominal Pain", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "inj_3", date: "01/06/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: left thigh" },
      { id: "nut_3", date: "01/02/2026", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "530 kcal, 36g protein", adherenceSummary: "-" },
      { id: "inj_2", date: "12/30/2025", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: right thigh" },
      { id: "se_1", date: "12/25/2025", medication: "zepbound", dose: "2.5mg", effects: "Mild Nausea - Christmas day", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "-" },
      { id: "nut_2", date: "12/20/2025", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "580 kcal, 38g protein", adherenceSummary: "-" },
      { id: "inj_1", date: "12/15/2025", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "-", adherenceSummary: "Injection Site: abdomen" },
      { id: "nut_1", date: "12/10/2025", medication: "zepbound", dose: "2.5mg", effects: "-", patientSummary: "View More", nutritionSummary: "500 kcal, 32g protein", adherenceSummary: "-" },
    ],
  },
};
