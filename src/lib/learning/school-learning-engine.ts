import { TargetedIntervention } from "./intervention-types";

export interface TopicReadiness {
  topic: string;
  score: number; // percentage, e.g. 82
  status: "Mastered" | "Moderate" | "Priority Gap";
  category: string;
  estimatedTimeToClose: string;
}

export interface SubjectReadiness {
  subject: string;
  overallScore: number;
  priorityGapTopic: string;
  topics: TopicReadiness[];
}

export const INITIAL_SCHOOL_READINESS: SubjectReadiness[] = [
  {
    subject: "Mathematics",
    overallScore: 60,
    priorityGapTopic: "Trigonometry",
    topics: [
      {
        topic: "Algebra",
        score: 82,
        status: "Mastered",
        category: "Quadratic Equations, Polynomials",
        estimatedTimeToClose: "Completed",
      },
      {
        topic: "Geometry",
        score: 61,
        status: "Moderate",
        category: "Triangles, Circles, Coordinate Geometry",
        estimatedTimeToClose: "30 mins",
      },
      {
        topic: "Trigonometry",
        score: 38,
        status: "Priority Gap",
        category: "Ratios, Identities, Heights & Distances",
        estimatedTimeToClose: "15 mins",
      },
    ],
  },
  {
    subject: "Science & Physics",
    overallScore: 63,
    priorityGapTopic: "Ray Optics",
    topics: [
      {
        topic: "Mechanics & Motion",
        score: 80,
        status: "Mastered",
        category: "Laws of Motion, Work, Energy",
        estimatedTimeToClose: "Completed",
      },
      {
        topic: "Electricity & Circuits",
        score: 65,
        status: "Moderate",
        category: "Ohm's Law, Resistance, Power",
        estimatedTimeToClose: "25 mins",
      },
      {
        topic: "Ray Optics",
        score: 45,
        status: "Priority Gap",
        category: "Reflection, Refraction, Lens Formula",
        estimatedTimeToClose: "15 mins",
      },
    ],
  },
  {
    subject: "Biology & Life Sciences",
    overallScore: 63,
    priorityGapTopic: "Photosynthesis & Nutrition",
    topics: [
      {
        topic: "Cell Structure",
        score: 88,
        status: "Mastered",
        category: "Organelles, Cell Division",
        estimatedTimeToClose: "Completed",
      },
      {
        topic: "Heredity & Evolution",
        score: 60,
        status: "Moderate",
        category: "Mendelian Genetics, DNA",
        estimatedTimeToClose: "30 mins",
      },
      {
        topic: "Photosynthesis & Nutrition",
        score: 42,
        status: "Priority Gap",
        category: "Chlorophyll, Light Reaction, Stomata",
        estimatedTimeToClose: "15 mins",
      },
    ],
  },
];

// 7-Stage School Intervention: TRIGONOMETRY (Priority Gap)
export const TRIGONOMETRY_INTERVENTION: TargetedIntervention = {
  id: "intervention-trigonometry",
  topic: "Trigonometric Ratios & Right-Angled Triangles",
  skillDomain: "Class 10 & 12 Mathematics",
  estimatedDuration: "15 minutes",
  targetDeficit: "Current: 38% ➔ Target: 75% (+37% Gain)",

  // Step 1: Concept Explanation
  conceptExplanation: {
    title: "Understanding sin, cos, and tan (The Right-Angled Triangle)",
    summary:
      "Trigonometry is simply the relationship between the angles and sides of a right-angled triangle. Every ratio is just a fraction of two sides relative to an angle θ.",
    coreRules: [
      "Hypotenuse (H): The longest side, always opposite to the 90° right angle.",
      "Opposite (O): The side directly across from your chosen reference angle θ.",
      "Adjacent (A): The side next to your angle θ (between θ and the 90° angle).",
      "Mnemonic Formula: 'Some People Have, Curly Brown Hair, Turned Permanent Black':",
      "• sin θ = Opposite / Hypotenuse (P / H)",
      "• cos θ = Adjacent / Hypotenuse (B / H)",
      "• tan θ = Opposite / Adjacent (P / B) = sin θ / cos θ",
    ],
    syntaxSnippet: `In a right triangle with angle θ:
sin(θ) = Opposite / Hypotenuse
cos(θ) = Adjacent / Hypotenuse
tan(θ) = Opposite / Adjacent

Pythagoras Theorem:
Hypotenuse² = Opposite² + Adjacent²`,
  },

  // Step 2: Real-World Example
  realWorldExample: {
    domain: "Measuring a Village School Flagpole Height",
    scenario:
      "You are standing 10 meters away from a school flagpole on level ground. You look up at the top with an angle of 45°.",
    tableA: {
      name: "Known Measurements",
      schema: ["Distance from Pole (Adjacent)", "Angle of Elevation (θ)", "tan(45°) Value"],
      sampleRows: [["10 meters", "45°", "1.0"]],
    },
    tableB: {
      name: "Trigonometric Calculation",
      schema: ["Formula", "Substitution", "Calculated Height (Opposite)"],
      sampleRows: [["tan(θ) = Height / Distance", "1.0 = Height / 10m", "Height = 10 meters"]],
    },
    expectedOutputExplanation:
      "Because tan(45°) = 1, the height of the flagpole is equal to the distance you stand from its base: exactly 10 meters!",
    codeSnippet: `tan(45°) = Height / 10
1 = Height / 10
Height = 10 meters`,
  },

  // Steps 3-6: Guided Question & Adaptive Branching
  guidedQuestion: {
    id: "trig-gq-1",
    title: "Guided Interactive Question: Calculating the Shadow Length",
    difficulty: "Intermediate",
    questionText:
      "A 5-meter tall telephone pole casts a shadow on the ground when the sun is at an angle of 45° to the ground. How long is the shadow?",
    codeSnippet: `Height (Opposite) = 5m
Angle θ = 45°
tan(45°) = 1 = Opposite / Adjacent (Shadow)`,
    options: [
      {
        id: "opt-1",
        text: "5 meters",
        isCorrect: true,
        explanation:
          "Correct! Since tan(45°) = 1, tan(45°) = Height / Shadow => 1 = 5 / Shadow => Shadow = 5 meters.",
      },
      {
        id: "opt-2",
        text: "10 meters",
        isCorrect: false,
        explanation: "Incorrect. You multiplied instead of using tan(45°) = 1.",
      },
      {
        id: "opt-3",
        text: "2.5 meters",
        isCorrect: false,
        explanation: "Incorrect. tan(45°) = 1, so the opposite and adjacent sides must be equal.",
      },
      {
        id: "opt-4",
        text: "7.07 meters",
        isCorrect: false,
        explanation: "Incorrect. That would be the hypotenuse (5√2), not the shadow on the ground.",
      },
    ],
    hint: "Remember: tan(45°) = 1. What does that say about the Opposite side and Adjacent side?",
    simplifiedFallbackExample: {
      analogyText:
        "Think of a square cut in half diagonally. The two sides forming the 90° corner are always equal! At 45°, Height = Shadow.",
      simplifiedQuestionText: "If height is 3 meters at angle 45°, how long is the shadow?",
      simplifiedOptions: [
        {
          id: "sim-1",
          text: "3 meters (Equal to height)",
          isCorrect: true,
          explanation: "Great job! At 45 degrees, the shadow length always equals the height.",
        },
        {
          id: "sim-2",
          text: "6 meters",
          isCorrect: false,
          explanation: "At 45 degrees, the sides must be equal.",
        },
      ],
    },
    harderFollowUpQuestion: {
      questionText:
        "If the angle of the sun changes to 30°, and tan(30°) = 1/√3 (approx 0.577), how long is the shadow of the 5-meter pole?",
      codeSnippet: `tan(30°) = 5 / Shadow
1/√3 = 5 / Shadow => Shadow = 5√3`,
      options: [
        {
          id: "hard-1",
          text: "5√3 meters (approx 8.66m)",
          isCorrect: true,
          explanation: "Brilliant! As the sun goes lower in the sky (30°), the shadow gets longer: 5√3 meters.",
        },
        {
          id: "hard-2",
          text: "5/√3 meters",
          isCorrect: false,
          explanation: "Check the algebra: Shadow = 5 / tan(30°) = 5 * √3.",
        },
      ],
    },
  },

  // Step 7: Mini-Assessment Reassessment Probes
  miniAssessment: {
    title: "Trigonometry Quick Reassessment (3 Probes)",
    passScorePercentage: 66,
    questions: [
      {
        id: "trig-q1",
        questionText: "In a right triangle ABC with angle B = 90°, which side is the Hypotenuse?",
        options: [
          { id: "q1-a", text: "Side AC (opposite to angle B)", isCorrect: true, explanation: "Correct, hypotenuse is always opposite to the 90° angle." },
          { id: "q1-b", text: "Side AB", isCorrect: false, explanation: "AB forms the right angle." },
          { id: "q1-c", text: "Side BC", isCorrect: false, explanation: "BC forms the right angle." },
        ],
      },
      {
        id: "trig-q2",
        questionText: "What is the relationship between sin θ, cos θ, and tan θ?",
        options: [
          { id: "q2-a", text: "tan θ = sin θ / cos θ", isCorrect: true, explanation: "Correct! (Opp/Hyp) / (Adj/Hyp) = Opp/Adj = tan θ." },
          { id: "q2-b", text: "tan θ = cos θ / sin θ", isCorrect: false, explanation: "That is cot θ, not tan θ." },
          { id: "q2-c", text: "tan θ = sin θ * cos θ", isCorrect: false, explanation: "Incorrect formula." },
        ],
      },
      {
        id: "trig-q3",
        questionText: "If sin θ = 3/5, what is cos θ in a standard 3-4-5 right triangle?",
        options: [
          { id: "q3-a", text: "4/5", isCorrect: true, explanation: "Correct! Using Pythagoras: 5² - 3² = 16 => Base = 4 => cos θ = 4/5." },
          { id: "q3-b", text: "3/4", isCorrect: false, explanation: "That is tan θ, not cos θ." },
          { id: "q3-c", text: "5/4", isCorrect: false, explanation: "cos θ cannot be greater than 1." },
        ],
      },
    ],
  },
};

// 7-Stage School Intervention: PHOTOSYNTHESIS
export const PHOTOSYNTHESIS_INTERVENTION: TargetedIntervention = {
  id: "intervention-photosynthesis",
  topic: "Photosynthesis & Cellular Nutrition in Plants",
  skillDomain: "Class 10 & 12 Biology",
  estimatedDuration: "15 minutes",
  targetDeficit: "Current: 42% ➔ Target: 75% (+33% Gain)",

  conceptExplanation: {
    title: "How Plants Make Food: Sunlight, Water, and Carbon Dioxide",
    summary:
      "Photosynthesis (प्रकाश संश्लेषण) is the biochemical process by which green plants convert light energy into chemical energy (glucose) using water and carbon dioxide.",
    coreRules: [
      "Light Energy: Absorbed by the green pigment Chlorophyll inside chloroplasts.",
      "Water (H₂O): Taken up by roots from the soil through xylem vessels.",
      "Carbon Dioxide (CO₂): Diffuses through tiny pores called Stomata under the leaf surface.",
      "Chemical Equation: 6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ (Glucose) + 6O₂ (Oxygen gas released).",
    ],
    syntaxSnippet: `Photosynthesis Equation:
6 CO₂ (Carbon Dioxide) + 6 H₂O (Water) + Sunlight
➔ C₆H₁₂O₆ (Glucose / Food) + 6 O₂ (Oxygen released)`,
  },

  realWorldExample: {
    domain: "Why do crops grow faster in sunny weather?",
    scenario:
      "During clear monsoon breaks in rural Maharashtra, crops like rice and soybean show rapid green growth because abundant sunlight and water accelerate photosynthesis.",
    tableA: {
      name: "Inputs Needed",
      schema: ["Component", "Source", "Role"],
      sampleRows: [
        ["Sunlight", "Sun", "Energy driver"],
        ["Chlorophyll", "Leaf chloroplast", "Traps light"],
        ["Water", "Roots from soil", "Donates electrons & H+"],
        ["Carbon Dioxide", "Atmosphere via stomata", "Carbon backbone for sugar"],
      ],
    },
    tableB: {
      name: "Outputs Produced",
      schema: ["Product", "Usage in Plant"],
      sampleRows: [
        ["Glucose (C₆H₁₂O₆)", "Stored as starch for plant growth"],
        ["Oxygen (O₂)", "Released into air for humans and animals to breathe"],
      ],
    },
    expectedOutputExplanation:
      "Leaves act as natural solar-powered food factories for the entire planet!",
    codeSnippet: `Input: Sunlight + CO₂ + H₂O
Output: Sugar (Plant Food) + Oxygen (Life Air)`,
  },

  guidedQuestion: {
    id: "photo-gq-1",
    title: "Guided Interactive Question: Stomata Function",
    difficulty: "Intermediate",
    questionText:
      "Through which microscopic structures on the underside of a leaf does Carbon Dioxide (CO₂) enter the plant for photosynthesis?",
    codeSnippet: `Atmospheric CO₂ ➔ [ ? ] ➔ Chloroplasts in Leaf Cells`,
    options: [
      {
        id: "stoma-1",
        text: "Stomata (surrounded by guard cells)",
        isCorrect: true,
        explanation: "Correct! Stomata are tiny pore openings that regulate gas exchange (CO₂ in, O₂ and water vapor out).",
      },
      {
        id: "stoma-2",
        text: "Root hairs",
        isCorrect: false,
        explanation: "Root hairs absorb water and minerals from soil, not gaseous CO₂.",
      },
      {
        id: "stoma-3",
        text: "Xylem vessels",
        isCorrect: false,
        explanation: "Xylem transports water upward from the roots.",
      },
      {
        id: "stoma-4",
        text: "Bark lenticels only",
        isCorrect: false,
        explanation: "Lenticels are in woody stems; photosynthesis occurs mainly via leaf stomata.",
      },
    ],
    hint: "Think about the tiny pores on the green leaves that open and close using guard cells.",
  },

  miniAssessment: {
    title: "Photosynthesis Quick Reassessment",
    passScorePercentage: 66,
    questions: [
      {
        id: "photo-q1",
        questionText: "What green pigment absorbs sunlight energy for photosynthesis?",
        options: [
          { id: "q1-a", text: "Chlorophyll", isCorrect: true, explanation: "Correct! Chlorophyll traps red and blue light energy." },
          { id: "q1-b", text: "Hemoglobin", isCorrect: false, explanation: "Hemoglobin is in animal blood, not plants." },
          { id: "q1-c", text: "Carotene only", isCorrect: false, explanation: "Chlorophyll is the primary pigment." },
        ],
      },
      {
        id: "photo-q2",
        questionText: "What gas is released as a byproduct during photosynthesis?",
        options: [
          { id: "q2-a", text: "Oxygen (O₂)", isCorrect: true, explanation: "Correct! Water molecules split, releasing oxygen gas." },
          { id: "q2-b", text: "Carbon Dioxide (CO₂)", isCorrect: false, explanation: "CO₂ is consumed, not released." },
          { id: "q2-c", text: "Nitrogen gas", isCorrect: false, explanation: "Nitrogen is absorbed through soil nitrates." },
        ],
      },
    ],
  },
};

export function getInterventionByTopic(topicSlug: string): TargetedIntervention {
  const normalized = topicSlug.toLowerCase();
  if (normalized.includes("trig")) {
    return TRIGONOMETRY_INTERVENTION;
  }
  if (normalized.includes("photo") || normalized.includes("bio")) {
    return PHOTOSYNTHESIS_INTERVENTION;
  }
  return TRIGONOMETRY_INTERVENTION; // Default to priority gap
}
