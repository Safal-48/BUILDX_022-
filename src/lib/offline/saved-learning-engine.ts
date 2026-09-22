/**
 * Offline & Saved Learning Engine
 * 
 * Implements genuine local storage caching for students on shared family phones,
 * low-end devices, or limited mobile data.
 * All resources in this module execute 100% locally without network calls.
 */

export type OfflineResourceType = "notes" | "lesson" | "quiz" | "checklist";

export interface OfflineQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface OfflineResource {
  id: string;
  type: OfflineResourceType;
  title: string;
  subject: string;
  categoryLabel: string;
  description: string;
  content: string;
  sizeKb: number;
  lastUpdated: string;
  tags: string[];
  isSavedLocally: boolean;
  quizQuestions?: OfflineQuizQuestion[];
}

export const PRELOADED_OFFLINE_RESOURCES: OfflineResource[] = [
  // =========================================================================
  // 1. DOWNLOADABLE NOTES
  // =========================================================================
  {
    id: "note-trig-01",
    type: "notes",
    title: "Trigonometry Core Formulas & Ratio Mnemonics",
    subject: "Mathematics (Class 10-12)",
    categoryLabel: "Formula Revision Sheet",
    description: "Compact revision sheet covering sin, cos, tan triangle ratios, standard angles (0°–90°), and core Pythagorean identities.",
    sizeKb: 14,
    lastUpdated: "2026-09-22",
    tags: ["Formulas", "Trigonometry", "Exam Prep"],
    isSavedLocally: true,
    content: `=====================================================
SKILLORA OFFLINE STUDY NOTES: TRIGONOMETRY CORE FORMULAS
Curriculum: Class 10 & 12 Board Prep
Saved locally on device (0 KB data required)
=====================================================

1. THE GOLDEN MNEMONIC (RIGHT TRIANGLE RATIOS):
   "Some People Have, Curly Brown Hair, Through Proper Brushing"

   - Some People Have:
     sin(theta) = Perpendicular / Hypotenuse (P / H)
     cosec(theta) = Hypotenuse / Perpendicular (H / P)

   - Curly Brown Hair:
     cos(theta) = Base / Hypotenuse (B / H)
     sec(theta) = Hypotenuse / Base (H / B)

   - Through Proper Brushing:
     tan(theta) = Perpendicular / Base (P / B)
     cot(theta) = Base / Perpendicular (B / P)

2. CORE PYTHAGOREAN IDENTITIES:
   - sin^2(theta) + cos^2(theta) = 1
   - 1 + tan^2(theta) = sec^2(theta)
   - 1 + cot^2(theta) = cosec^2(theta)

3. STANDARD ANGLE VALUES QUICK TABLE:
   Angle:        0°      30°       45°       60°       90°
   -------------------------------------------------------
   sin(theta):   0       1/2       1/sqrt(2) sqrt(3)/2 1
   cos(theta):   1       sqrt(3)/2 1/sqrt(2) 1/2       0
   tan(theta):   0       1/sqrt(3) 1         sqrt(3)   Undefined

   * Key Insight: When height equals shadow length, tan(45°) = 1.

4. HEIGHTS & DISTANCES EXAM TIP:
   - Angle of Elevation: Looking UP from ground to top of tower/tree.
   - Angle of Depression: Looking DOWN from cliff/building to ground.
   Always sketch the right triangle first and label P, B, and H before calculating.
=====================================================`,
  },
  {
    id: "note-photo-02",
    type: "notes",
    title: "Photosynthesis Kitchen Analogy & Chemical Equation",
    subject: "Biology & General Science",
    categoryLabel: "Concept Clarity Notes",
    description: "Simple Hinglish & English explanation of plant food synthesis, chlorophyll pigment role, and oxygen release.",
    sizeKb: 12,
    lastUpdated: "2026-09-22",
    tags: ["Biology", "Photosynthesis", "Hinglish"],
    isSavedLocally: true,
    content: `=====================================================
SKILLORA OFFLINE STUDY NOTES: PHOTOSYNTHESIS EXPLAINED
Language: English + Simple Hinglish Analogy
Saved locally on device (0 KB data required)
=====================================================

1. THE PLANT KITCHEN ANALOGY (SIMPLE HINGLISH):
   Paudhe apna khana kaise banate hain? Samajhiye ek restaurant kitchen ki tarah:
   
   - Patti (Leaf) = Plant ka Kitchen (Rasoi).
   - Chlorophyll = Master Chef (Green color pigment jo sunlight ko absorb karta hai).
   - Sunlight = Gas Burner (Energy source).
   - Water (H2O) = Zameen se roots pipeline ke through upar bhejti hain.
   - Carbon Dioxide (CO2) = Hawa se patte ke chhote chhed (Stomata) ke through andar aati hai.

2. BALANCED CHEMICAL EQUATION:
   6CO2 + 6H2O + Sunlight (with Chlorophyll) ---> C6H12O6 (Glucose) + 6O2 (Oxygen)

3. TWO PHASES OF PHOTOSYNTHESIS:
   A. Light-Dependent Reactions (Thylakoids):
      Sunlight splits water molecules into Hydrogen and Oxygen (Photolysis).
      Oxygen is released into the atmosphere.

   B. Light-Independent Reactions / Calvin Cycle (Stroma):
      Carbon Dioxide is converted into food (Glucose) using stored energy.

4. EXAM VIVA QUESTIONS:
   Q: Why are leaves green?
   A: Because chlorophyll reflects green light and absorbs blue & red wavelengths.

   Q: What happens to glucose after synthesis?
   A: It is converted into Starch and stored in roots, stems, and fruits.
=====================================================`,
  },
  {
    id: "note-circuits-03",
    type: "notes",
    title: "Electric Circuits, Ohm's Law & Workshop Safety",
    subject: "Physics & Vocational ITI",
    categoryLabel: "Technical Workshop Sheet",
    description: "Formulas for V=IR, series vs parallel resistance, power calculation (P=VI), and domestic wiring safety tips.",
    sizeKb: 15,
    lastUpdated: "2026-09-22",
    tags: ["Physics", "ITI Electrician", "Ohm's Law"],
    isSavedLocally: true,
    content: `=====================================================
SKILLORA OFFLINE STUDY NOTES: ELECTRIC CIRCUITS & OHM'S LAW
Curriculum: Class 10/12 Science & ITI Electrician
Saved locally on device (0 KB data required)
=====================================================

1. OHM'S LAW:
   Voltage (V) = Current (I) x Resistance (R)
   Units:
   - V in Volts (V)
   - I in Amperes (A)
   - R in Ohms (Omega)

2. RESISTANCE FORMULAS:
   A. Series Combination:
      R_total = R1 + R2 + R3
      - Current (I) remains constant across each resistor.
      - Voltage divides across each resistor (V = V1 + V2 + V3).

   B. Parallel Combination (Home Wiring):
      1 / R_total = 1/R1 + 1/R2 + 1/R3
      - Voltage (V) remains the same across all branches (230V in India).
      - If one appliance stops working, others continue operating safely.

3. ELECTRICAL POWER:
   - P = V x I  (Watts)
   - P = I^2 x R
   - P = V^2 / R
   - Energy (kWh) = Power (kW) x Time (Hours)
   * 1 Board of Trade Unit = 1 kWh = 3.6 x 10^6 Joules.

4. WORKSHOP & HOME SAFETY RULES:
   - Always connect Fuse and Switches on the LIVE wire (Phase), never on Neutral.
   - Earth wire (Green) provides a low-resistance path to ground in case of metallic leakage.
   - Never touch electrical equipment with wet hands (Water reduces skin resistance).
=====================================================`,
  },
  {
    id: "note-sch-04",
    type: "notes",
    title: "MahaDBT & NSP Scholarship Mandatory Document Checklist",
    subject: "Scholarships & Financial Aid",
    categoryLabel: "Government Verification Guide",
    description: "Step-by-step checklist of documents required for Post-Matric, EBC, and Central scholarships with common rejection pitfalls.",
    sizeKb: 11,
    lastUpdated: "2026-09-22",
    tags: ["Scholarships", "MahaDBT", "Checklist"],
    isSavedLocally: true,
    content: `=====================================================
SKILLORA OFFLINE ADVISORY: SCHOLARSHIP DOCUMENT CHECKLIST
Applicable for: MahaDBT (Maharashtra) & National Scholarship Portal (NSP)
Saved locally on device (0 KB data required)
=====================================================

1. TOP 5 MANDATORY DOCUMENTS TO KEEP SCANNED (PDF < 250 KB):
   [ ] Income Certificate (Tahshildar / Sub-Divisional Officer issued)
       * Must be for current financial year (Valid up to 31 March).
   [ ] Domicile Certificate of Maharashtra / Residential Certificate.
   [ ] Marksheet of Previous Qualifying Exam (Class 10 or 12).
   [ ] Aadhaar Card with active mobile number linked.
   [ ] Bank Passbook copy (Nationalized / Scheduled Bank only).

2. CRITICAL NPCI AADHAAR SEEDING STEP:
   - Ensure your bank account is mapped to NPCI (National Payments Corporation of India).
   - Direct Benefit Transfer (DBT) will FAIL if your bank account is only linked for KYC
     but not seeded on the NPCI mapper.
   - Check status by dialing *99*99*1# or visiting your local branch manager.

3. CASTE & CATEGORY PAPERS (FOR SC/ST/OBC/VJNT/SBC):
   [ ] Caste Certificate (Sub-Divisional Magistrate).
   [ ] Caste Validity Certificate (Crucial for professional degree/diploma).
   [ ] Non-Creamy Layer Certificate (NCL) for OBC/VJNT/SBC categories.

4. COMMON MISTAKES THAT CAUSE REJECTION:
   - Name mismatch between Aadhaar and Class 10 Marksheet.
   - Submitting expired Income Certificate issued by Sarpanch or Police Patil instead of Tahsildar.
   - Providing joint account with parents instead of student's independent savings account.
=====================================================`,
  },

  // =========================================================================
  // 2. OFFLINE TEXT LESSONS
  // =========================================================================
  {
    id: "lesson-quad-01",
    type: "lesson",
    title: "Class 10 Algebra: Quadratic Equations Step-by-Step",
    subject: "Mathematics",
    categoryLabel: "Complete Text Lesson",
    description: "Self-paced offline lesson teaching how to identify quadratic equations, solve by splitting the middle term, and calculate roots using formula.",
    sizeKb: 18,
    lastUpdated: "2026-09-22",
    tags: ["Math", "Algebra", "Lessons"],
    isSavedLocally: true,
    content: `Standard Form: ax^2 + bx + c = 0 (where a != 0)

Step 1: The Discriminant Test (D = b^2 - 4ac)
- If D > 0: Two distinct real roots exist.
- If D = 0: Two equal real roots exist (-b / 2a).
- If D < 0: No real roots exist (roots are imaginary).

Step 2: Quadratic Formula (Shreedhar Acharya Method)
x = (-b ± sqrt(b^2 - 4ac)) / (2a)

Worked Example: Solve x^2 - 5x + 6 = 0
Here a = 1, b = -5, c = 6
D = (-5)^2 - 4(1)(6) = 25 - 24 = 1
x = (5 ± sqrt(1)) / 2 = (5 ± 1) / 2
Root 1: (5 + 1) / 2 = 3
Root 2: (5 - 1) / 2 = 2
Roots are 3 and 2.`,
  },
  {
    id: "lesson-bio-02",
    type: "lesson",
    title: "Class 10 Biology: Plant Nutrition & Stomata Function",
    subject: "Science & Biology",
    categoryLabel: "Complete Text Lesson",
    description: "Detailed text lesson on autotrophic nutrition, opening and closing mechanism of guard cells, and xylem/phloem transport.",
    sizeKb: 16,
    lastUpdated: "2026-09-22",
    tags: ["Biology", "Life Processes", "Lessons"],
    isSavedLocally: true,
    content: `Autotrophic Nutrition in Plants

1. Structure of Stomata:
Stomata are tiny microscopic pores present on the epidermis of leaves and young stems.
Each stoma is bordered by two specialized bean-shaped cells known as Guard Cells.

2. How Guard Cells Work:
- When water flows into guard cells, they swell, become turgid, and curve outward, OPENING the pore.
- When guard cells lose water, they shrink, become flaccid, and straighten, CLOSING the pore.

3. Dual Functions of Stomata:
- Massive gas exchange (CO2 intake and O2 release for photosynthesis and respiration).
- Transpiration: Evaporative loss of water vapor that creates suction pull for xylem sap.`,
  },

  // =========================================================================
  // 3. OFFLINE PRACTICE PROBES (Instant Local Evaluation)
  // =========================================================================
  {
    id: "quiz-offline-01",
    type: "quiz",
    title: "Offline Quick Diagnostic Quiz (5 Board & ITI Questions)",
    subject: "Mixed (Maths, Physics & General Science)",
    categoryLabel: "Interactive Practice Probe",
    description: "Self-contained interactive quiz that scores your answers locally with detailed explanations, zero internet required.",
    sizeKb: 10,
    lastUpdated: "2026-09-22",
    tags: ["Practice", "Instant Grading", "Zero Data"],
    isSavedLocally: true,
    content: "Interactive 5-question diagnostic quiz stored locally.",
    quizQuestions: [
      {
        id: "q1",
        question: "If a 12-meter pole casts a shadow of 12 meters on the ground, what is the angle of elevation of the sun?",
        options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
        correctOptionIndex: 1,
        explanation: "tan(theta) = Perpendicular / Base = 12 / 12 = 1. Since tan(45°) = 1, the angle of elevation is 45 degrees.",
      },
      {
        id: "q2",
        question: "Which gas is released into the atmosphere as a byproduct during the light reaction of photosynthesis?",
        options: ["Carbon Dioxide (CO2)", "Nitrogen (N2)", "Oxygen (O2)", "Methane (CH4)"],
        correctOptionIndex: 2,
        explanation: "During photolysis of water in the light reaction, H2O molecules are split, releasing Oxygen (O2) gas.",
      },
      {
        id: "q3",
        question: "According to Ohm's Law, if voltage is doubled while resistance remains constant, what happens to the electric current?",
        options: ["Current is halved", "Current remains unchanged", "Current is doubled", "Current becomes zero"],
        correctOptionIndex: 2,
        explanation: "From V = I x R, current I = V / R. If V doubles while R is constant, current I also doubles proportionally.",
      },
      {
        id: "q4",
        question: "Which wire in domestic electrical AC supply should always be connected to the control switch?",
        options: ["Neutral wire", "Earth wire", "Live (Phase) wire", "Ground return"],
        correctOptionIndex: 2,
        explanation: "Switches must always disconnect the Live wire so that no high voltage remains on the appliance when switched off.",
      },
      {
        id: "q5",
        question: "Under the MahaDBT scholarship guidelines, what is the maximum annual family income limit for the Rajarshi Shahu Maharaj EBC scheme?",
        options: ["₹2,50,000", "₹5,00,000", "₹8,00,000", "₹12,00,000"],
        correctOptionIndex: 2,
        explanation: "The statutory family income ceiling for the EBC tuition fee reimbursement scheme in Maharashtra is ₹8,00,000 per annum.",
      },
    ],
  },
];

/**
 * Downloads a string as a clean .txt file directly to device storage.
 * Works completely offline in the browser without any server round-trip.
 */
export function downloadNotesAsTxt(filename: string, content: string) {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

