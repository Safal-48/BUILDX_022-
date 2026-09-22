/**
 * Student Career & Opportunity Hub Engine
 * 
 * Provides:
 * 1. 8 Student Opportunity Categories (Higher Ed, ITI, Internships, Apprenticeships,
 *    Skill Programs, Scholarships, Jobs, Career Fairs)
 * 2. "Opportunities Near You" local clusters (Nagpur, MIHAN, Hingna, Butibori)
 * 3. Explainable Career Recommendations with strict non-guarantee disclaimers
 * 4. Realistic demo dataset clearly labelled as [DEMO Opportunity]
 */

export type OpportunityCategory =
  | "higher_education"
  | "iti_courses"
  | "internships"
  | "apprenticeships"
  | "skill_development"
  | "scholarships"
  | "jobs"
  | "career_fairs";

export type LocalZone = "Nagpur" | "MIHAN" | "Hingna" | "Butibori" | "All Locations";

export interface StudentOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  localZone: "Nagpur" | "MIHAN" | "Hingna" | "Butibori";
  category: OpportunityCategory;
  categoryLabel: string;
  categoryEmoji: string;
  eligibility: string;
  requiredSkills: string[];
  deadline: string;
  daysRemaining: number;
  matchPercentage: number;
  stipendOrBenefit: string;
  description: string;
  whyYouMatch: string;
  documentsRequired: string[];
  commuteTransitInfo: string;
  isDemo: true; // Strictly flagged as demo
  applicationUrl?: string;
}

export interface StudentCareerProfile {
  studentName: string;
  currentClass: string;
  stream: string;
  attendanceRate: number; // e.g. 87
  academicReadiness: {
    subject: string;
    score: number;
  }[];
  interests: string[];
  skills: string[];
  learningProgress: string;
  location: string;
}

export interface CareerRecommendation {
  rank: number;
  pathwayTitle: string;
  categoryBadge: string;
  badgeVariant: "cyber" | "amber" | "emerald" | "violet";
  recommendedBecause: string;
  curriculumHighlights: string[];
  matchingInstitutesOrHubs: string[];
  averageEntryStipendOrCost: string;
  suggestedNextStep: string;
  fitScore: number;
}

// Default Student Profile used for explainable recommendation matching (Class 12 student)
export const DEFAULT_STUDENT_PROFILE: StudentCareerProfile = {
  studentName: "Amit Kumar",
  currentClass: "Class 12",
  stream: "Science & Vocational Tech",
  attendanceRate: 87,
  academicReadiness: [
    { subject: "Electric Circuits & Physics", score: 80 },
    { subject: "Algebra & Applied Math", score: 82 },
    { subject: "Geometry", score: 61 },
    { subject: "Trigonometry", score: 75 }, // Remediated
    { subject: "Mechanics & Motion", score: 80 },
  ],
  interests: [
    "Electrical Systems",
    "Hands-on Machine Wiring",
    "Industrial Automation",
    "Computer Programming Basics",
  ],
  skills: [
    "Circuit Analysis",
    "Multimeter Diagnostics",
    "Mathematical Reasoning",
    "Workshop Safety",
  ],
  learningProgress: "Remediated Trigonometry gap (+37%); consistent 87% attendance",
  location: "Nagpur / Hingna Corridor",
};

// Responsible AI Non-Guarantee Disclaimer
export const AI_RECOMMENDATION_DISCLAIMER =
  "Skillora AI recommendations are diagnostic career exploration guidance based on your academic performance, demonstrated skills, and regional training density. Recommendations do not guarantee admission, selection, or statutory employment outcomes.";

// Seeded explainable career recommendations
export const DEMO_CAREER_RECOMMENDATIONS: CareerRecommendation[] = [
  {
    rank: 1,
    pathwayTitle: "ITI — Electrician Trade (2-Year CTS)",
    categoryBadge: "Vocational Technical",
    badgeVariant: "cyber",
    recommendedBecause:
      "You scored 80% in Electric Circuits & Physics, excel at hands-on physical workshop diagnostics, and live within 12 km of the Hingna & Butibori industrial electrical equipment manufacturing clusters.",
    curriculumHighlights: [
      "AC/DC Motor Controls",
      "Industrial Power Wiring",
      "Transformer Testing & Solar Rooftop Inverters",
    ],
    matchingInstitutesOrHubs: [
      "Govt ITI Hingna (MIDC Campus)",
      "Govt ITI Shraddhanandpeth Nagpur",
    ],
    averageEntryStipendOrCost: "₹0 tuition (Govt scholarship) • ₹10,500/mo apprentice stipend",
    suggestedNextStep: "Apply for Centralized ITI Maharashtra Online Admission (DVET)",
    fitScore: 94,
  },
  {
    rank: 2,
    pathwayTitle: "Diploma — Computer Engineering (3-Year Polytechnic)",
    categoryBadge: "State Technical Board",
    badgeVariant: "emerald",
    recommendedBecause:
      "Your strong mathematics foundation (Algebra 82%, verified Trigonometry 75%) and analytical logic match MSBTE polytechnic entrance benchmarks with high transition into MIHAN IT SEZ roles.",
    curriculumHighlights: [
      "Data Structures & C++/Java",
      "Microcontroller Systems & IoT",
      "Computer Networks & Cyber Safety",
    ],
    matchingInstitutesOrHubs: [
      "Government Polytechnic Sadar, Nagpur",
      "Anjuman Polytechnic Sadar",
    ],
    averageEntryStipendOrCost: "MahaDBT 100% Freeship eligible • ₹18,000–₹24,000 starting role",
    suggestedNextStep: "Register for DTE Maharashtra Post-SSC/HSC Polytechnic CAP Rounds",
    fitScore: 91,
  },
  {
    rank: 3,
    pathwayTitle: "Apprenticeship — Industrial & Plant Operations (NAPS)",
    categoryBadge: "Dual Training (Earn while Learn)",
    badgeVariant: "amber",
    recommendedBecause:
      "Your statutory attendance reliability (87%) and solid Mechanics & Motion score (80%) satisfy National Apprenticeship Promotion Scheme (NAPS) criteria at nearby heavy automotive manufacturing units.",
    curriculumHighlights: [
      "Automated Assembly Line Inspection",
      "CNC Lathe & Milling Operation",
      "Industrial Quality Assurance Standards (ISO)",
    ],
    matchingInstitutesOrHubs: [
      "Mahindra & Mahindra Farm Equipment (Hingna MIDC)",
      "Indorama Synthetics Manufacturing (Butibori MIDC)",
    ],
    averageEntryStipendOrCost: "₹12,000 / month direct bank stipend + canteen transport",
    suggestedNextStep: "Create candidate profile on NAPS Apprenticeship Portal (apprenticeshipindia.gov.in)",
    fitScore: 88,
  },
];

// Seeded Opportunities across 8 categories and 4 local demo zones
export const DEMO_STUDENT_OPPORTUNITIES: StudentOpportunity[] = [
  // =========================================================================
  // 1. 🎓 HIGHER EDUCATION
  // =========================================================================
  {
    id: "opp-he-01",
    title: "Diploma in Computer Engineering (Autonomous)",
    organization: "Government Polytechnic Nagpur (Established 1914)",
    location: "Mangalwari Bazar Road, Sadar, Nagpur, Maharashtra",
    localZone: "Nagpur",
    category: "higher_education",
    categoryLabel: "Higher Education",
    categoryEmoji: "🎓",
    eligibility: "Class 10 Pass with min 35% marks in Mathematics & Science (CAP Round)",
    requiredSkills: ["Algebra", "Basic Physics", "Logical Reasoning"],
    deadline: "2026-07-20",
    daysRemaining: 118,
    matchPercentage: 92,
    stipendOrBenefit: "MahaDBT 100% Fee Reimbursement for SC/ST/OBC/EWS",
    description: "Maharashtra's oldest premier autonomous government polytechnic offering 3-year technical diploma with direct second year BE/B.Tech admission pathways.",
    whyYouMatch: "Your Algebra score (82%) and Class 10/12 track put you in the top merit percentile for DTE CAP rounds.",
    documentsRequired: ["SSC Marksheet", "Leaving Certificate", "Domicile / Caste Certificate", "Income Certificate"],
    commuteTransitInfo: "5 mins from Sitabuldi Metro Station (Orange & Aqua Line Junction)",
    isDemo: true,
    applicationUrl: "https://dte.maharashtra.gov.in",
  },
  {
    id: "opp-he-02",
    title: "B.Tech in Civil & Infrastructure Engineering",
    organization: "Government College of Engineering Nagpur (GCOEN)",
    location: "Sector 27, MIHAN SEZ, Nagpur, Maharashtra",
    localZone: "MIHAN",
    category: "higher_education",
    categoryLabel: "Higher Education",
    categoryEmoji: "🎓",
    eligibility: "Class 12 Science with Physics, Chemistry & Mathematics (MHT-CET / JEE Main)",
    requiredSkills: ["Mechanics", "Trigonometry", "Calculus"],
    deadline: "2026-08-05",
    daysRemaining: 134,
    matchPercentage: 86,
    stipendOrBenefit: "AICTE Pragati / Saksham & MahaDBT EBC Freeship",
    description: "State-of-the-art government engineering campus situated inside the MIHAN aerospace and smart industrial corridor.",
    whyYouMatch: "Your Mechanics & Motion readiness (80%) aligns with foundational structural engineering coursework.",
    documentsRequired: ["HSC Marksheet", "MHT-CET Scorecard", "Aadhaar Card", "Nationalized Bank Passbook"],
    commuteTransitInfo: "Direct Metro connectivity to Khapri & Airport South Station",
    isDemo: true,
  },
  {
    id: "opp-he-03",
    title: "Diploma in Chemical & Plastic Processing Technology",
    organization: "Laxminarayan Innovation Technological University (LIT)",
    location: "Amravati Road, Ram Nagar, Nagpur, Maharashtra",
    localZone: "Nagpur",
    category: "higher_education",
    categoryLabel: "Higher Education",
    categoryEmoji: "🎓",
    eligibility: "Class 10 or 12 Pass with Science Stream (Min 45% aggregate)",
    requiredSkills: ["Basic Chemistry", "Measurement Ratios", "Lab Safety"],
    deadline: "2026-07-15",
    daysRemaining: 113,
    matchPercentage: 81,
    stipendOrBenefit: "State Govt Merit Scholarship + Industry Sponsored Lab Access",
    description: "Pioneering technical university offering specialized chemical, polymer, and petrochemical processing diplomas with high industrial tie-ups at Butibori MIDC.",
    whyYouMatch: "High analytical readiness and interest in applied materials science.",
    documentsRequired: ["SSC/HSC Marksheet", "School Leaving Certificate", "Income Certificate"],
    commuteTransitInfo: "City Bus Route 14 from Sitabuldi to LIT Amravati Bypass",
    isDemo: true,
  },

  // =========================================================================
  // 2. 🔧 ITI COURSES
  // =========================================================================
  {
    id: "opp-iti-01",
    title: "Electrician Trade — 2-Year Craftsman Training Scheme (CTS)",
    organization: "Government ITI Hingna (MIDC Campus)",
    location: "MIDC Hingna Industrial Area, Nagpur, Maharashtra",
    localZone: "Hingna",
    category: "iti_courses",
    categoryLabel: "ITI Courses",
    categoryEmoji: "🔧",
    eligibility: "Class 10 Pass with Science & Mathematics under 10+2 system",
    requiredSkills: ["Circuit Diagrams", "Wiring Safety", "Ohm's Law", "Hand Tools"],
    deadline: "2026-06-30",
    daysRemaining: 98,
    matchPercentage: 96,
    stipendOrBenefit: "Free Tool Kit + Direct NCVT National Trade Certificate (NTC)",
    description: "Hands-on dual vocational course located in the heart of Hingna MIDC, with mandatory factory workshop rotations in automotive harness and motor assembly.",
    whyYouMatch: "Your 80% score in Electric Circuits and high spatial problem solving make Electrician your highest-fit trade.",
    documentsRequired: ["10th Marksheet", "Leaving Certificate", "Domicile Certificate", "Aadhaar Card"],
    commuteTransitInfo: "ST Bus every 15 mins from Hingna Naka directly to MIDC ITI Gate",
    isDemo: true,
  },
  {
    id: "opp-iti-02",
    title: "Fitter & Mechanical Assembler Trade (2 Years)",
    organization: "Government ITI Nagpur (Shraddhanandpeth)",
    location: "Shraddhanandpeth, South Ambazari Road, Nagpur, Maharashtra",
    localZone: "Nagpur",
    category: "iti_courses",
    categoryLabel: "ITI Courses",
    categoryEmoji: "🔧",
    eligibility: "Class 10 Pass (Regular/Open School recognized)",
    requiredSkills: ["Blueprint Reading", "Vernier Caliper Measurement", "Lathe Turning"],
    deadline: "2026-06-25",
    daysRemaining: 93,
    matchPercentage: 89,
    stipendOrBenefit: "Govt Hostel Facility + Free Uniform & Technical Manuals",
    description: "Largest government industrial training institute in Vidarbha with modern CNC labs, turning workshops, and direct railway apprentice tie-ups (SECR).",
    whyYouMatch: "Strong Mechanics readiness (80%) and high regular attendance (87%).",
    documentsRequired: ["SSC Marksheet", "Caste Certificate (if applicable)", "Passport Photos (4)"],
    commuteTransitInfo: "Adjacent to Subhash Nagar Metro Station (Aqua Line)",
    isDemo: true,
  },
  {
    id: "opp-iti-03",
    title: "Industrial Automation & Mechatronics Technician (2 Years)",
    organization: "Model Industrial Training Institute Butibori",
    location: "Phase II, MIDC Butibori Industrial Zone, Nagpur, Maharashtra",
    localZone: "Butibori",
    category: "iti_courses",
    categoryLabel: "ITI Courses",
    categoryEmoji: "🔧",
    eligibility: "Class 10 Pass with min 40% in Science and Math",
    requiredSkills: ["Pneumatics", "Sensor Wiring", "PLC Basics", "Relay Logic"],
    deadline: "2026-07-05",
    daysRemaining: 103,
    matchPercentage: 91,
    stipendOrBenefit: "Co-sponsored by Butibori Manufacturers Association (BMA)",
    description: "Specialized model ITI equipped with German dual-system automation trainers, preparing students for automated textile and packaging plants in Butibori.",
    whyYouMatch: "Intersection of your high circuit diagnostics and math readiness.",
    documentsRequired: ["Class 10 Marksheet", "Domicile of Maharashtra", "Bank Account Details"],
    commuteTransitInfo: "Free company bus connectivity from Wardha Road Butibori junction",
    isDemo: true,
  },
  {
    id: "opp-iti-04",
    title: "Computer Operator & Programming Assistant (COPA — 1 Year)",
    organization: "Government Women's ITI Nagpur",
    location: "Civil Lines, Near High Court, Nagpur, Maharashtra",
    localZone: "Nagpur",
    category: "iti_courses",
    categoryLabel: "ITI Courses",
    categoryEmoji: "🔧",
    eligibility: "Class 10 Pass in any stream",
    requiredSkills: ["Computer Typing", "MS Office / LibreOffice", "Basic Python", "Database Entry"],
    deadline: "2026-06-28",
    daysRemaining: 96,
    matchPercentage: 85,
    stipendOrBenefit: "Full tuition waiver for female candidates under Beti Bachao Scheme",
    description: "Intensive 1-year trade covering digital office workflows, web fundamentals, Python scripting, and administrative data processing.",
    whyYouMatch: "Strong Algebra and logical structuring skills.",
    documentsRequired: ["10th Marksheet", "Aadhaar Card", "2 Passport Photos"],
    commuteTransitInfo: "Walking distance from Kasturchand Park Metro Station",
    isDemo: true,
  },

  // =========================================================================
  // 3. 💼 INTERNSHIPS
  // =========================================================================
  {
    id: "opp-int-01",
    title: "Rural Agricultural Mechanization Trainee Intern",
    organization: "Mahindra Heavy Farm Equipment Division",
    location: "Plot K-12, Hingna MIDC, Nagpur, Maharashtra",
    localZone: "Hingna",
    category: "internships",
    categoryLabel: "Internships",
    categoryEmoji: "💼",
    eligibility: "ITI / Polytechnic Students or Class 12 Vocational Passouts",
    requiredSkills: ["Hydraulic Pumps", "Diesel Engine Assembly", "Preventive Maintenance"],
    deadline: "2026-05-15",
    daysRemaining: 52,
    matchPercentage: 94,
    stipendOrBenefit: "₹11,500 / month + Subsidized Plant Canteen & Safety Gear",
    description: "4-month paid hands-on internship assisting senior manufacturing technicians on modern tractor assembly lines and tractor hydraulic testing rigs.",
    whyYouMatch: "High mechanics readiness and proximity to Hingna industrial zone.",
    documentsRequired: ["College NOC / Marksheet", "Police Verification / Aadhaar", "Bank Passbook"],
    commuteTransitInfo: "Company shuttle picks up from Wadi Naka and Hingna T-Point",
    isDemo: true,
  },
  {
    id: "opp-int-02",
    title: "Embedded Instrumentation & Industrial Sensor Intern",
    organization: "Solar Industries India Limited",
    location: "11 Zade Layout, Bharat Nagar / Butibori Facility, Nagpur",
    localZone: "Butibori",
    category: "internships",
    categoryLabel: "Internships",
    categoryEmoji: "💼",
    eligibility: "Diploma / Science Students with interest in electronics & sensors",
    requiredSkills: ["Sensor Calibration", "Electrical Schematics", "Quality Documentation"],
    deadline: "2026-05-25",
    daysRemaining: 62,
    matchPercentage: 88,
    stipendOrBenefit: "₹14,000 / month + Bus Transit from Zero Mile Nagpur",
    description: "Work with industrial process engineers on automated weighing systems, pressure sensors, and hazardous environment electronic telemetry.",
    whyYouMatch: "Circuit analysis skills and high attention-to-detail telemetry.",
    documentsRequired: ["Resume / Bio-data", "Marksheets", "Govt ID Proof"],
    commuteTransitInfo: "Solar Industries dedicated AC staff bus from Nagpur City Centre",
    isDemo: true,
  },
  {
    id: "opp-int-03",
    title: "Junior Cloud Infrastructure & Network Operations Intern",
    organization: "Persistent Systems MIHAN Development Centre",
    location: "Plot No. 1, IT Park, MIHAN SEZ, Nagpur, Maharashtra",
    localZone: "MIHAN",
    category: "internships",
    categoryLabel: "Internships",
    categoryEmoji: "💼",
    eligibility: "Diploma Computer / IT or BCA / B.Sc Computer Science",
    requiredSkills: ["Linux CLI", "TCP/IP Basics", "Python Scripting", "Hardware Troubleshooting"],
    deadline: "2026-06-10",
    daysRemaining: 78,
    matchPercentage: 87,
    stipendOrBenefit: "₹16,000 / month + Skill Certification on Completion",
    description: "6-month technology immersion supporting enterprise data center networks, virtualization servers, and security monitoring in MIHAN SEZ.",
    whyYouMatch: "Strong mathematics readiness and verified problem-solving speed.",
    documentsRequired: ["Resume", "Latest Semester Marksheet", "College ID Card"],
    commuteTransitInfo: "Direct MIHAN shuttle from Khapri Metro Station",
    isDemo: true,
  },

  // =========================================================================
  // 4. 🏭 APPRENTICESHIPS
  // =========================================================================
  {
    id: "opp-app-01",
    title: "NAPS Automotive Electrical & Assembly Apprentice",
    organization: "Mahindra & Mahindra Auto Manufacturing Unit",
    location: "Sector 3, Hingna Industrial Area, Nagpur, Maharashtra",
    localZone: "Hingna",
    category: "apprenticeships",
    categoryLabel: "Apprenticeships",
    categoryEmoji: "🏭",
    eligibility: "Passed Class 10/12 or ITI (Age 18–24 years, NAPS registered)",
    requiredSkills: ["Battery Connections", "Fuse Box Assembly", "Torque Tool Operation"],
    deadline: "2026-05-30",
    daysRemaining: 67,
    matchPercentage: 95,
    stipendOrBenefit: "₹12,200 / month (Govt NAPS Direct Benefit Transfer)",
    description: "Official National Apprenticeship Promotion Scheme (NAPS) 1-year contract. Successful apprentices receive National Apprenticeship Certificate (NAC).",
    whyYouMatch: "Your 87% attendance record matches high factory discipline prerequisites.",
    documentsRequired: ["NAPS Registration No.", "10th/12th/ITI Marksheet", "Aadhaar Card", "Bank Account (DBT active)"],
    commuteTransitInfo: "Direct drop at Gate 3 from Hingna Local City Buses",
    isDemo: true,
  },
  {
    id: "opp-app-02",
    title: "Industrial Plant Maintenance Apprentice (NATS/NAPS)",
    organization: "Indo Rama Synthetics (India) Limited",
    location: "A-1, MIDC Industrial Area, Butibori, Nagpur, Maharashtra",
    localZone: "Butibori",
    category: "apprenticeships",
    categoryLabel: "Apprenticeships",
    categoryEmoji: "🏭",
    eligibility: "ITI / Diploma in Electrical or Mechanical Stream",
    requiredSkills: ["Electric Motors", "Pneumatic Valves", "Greasing & Lubrication"],
    deadline: "2026-06-15",
    daysRemaining: 83,
    matchPercentage: 90,
    stipendOrBenefit: "₹11,800 / month + Free Uniform & Plant Mediclaim",
    description: "Comprehensive 12-month dual shop-floor training covering continuous chemical spinning machinery, high-voltage transformers, and steam turbines.",
    whyYouMatch: "Matches your strong circuit analysis and mechanical fundamentals.",
    documentsRequired: ["Apprentice Portal ID", "Caste Certificate (if applicable)", "Fitness Certificate"],
    commuteTransitInfo: "Pickups from Butibori Railway Station & NH-44 Toll Plaza",
    isDemo: true,
  },
  {
    id: "opp-app-03",
    title: "Aircraft Maintenance Engineering (AME) Apprentice",
    organization: "Air India Engineering Services Limited (AIESL MRO)",
    location: "MRO Facility, Boeing Hangar, MIHAN SEZ, Nagpur",
    localZone: "MIHAN",
    category: "apprenticeships",
    categoryLabel: "Apprenticeships",
    categoryEmoji: "🏭",
    eligibility: "Class 12 with Physics & Math or AME Diploma / ITI Fitter",
    requiredSkills: ["Aviation Tool Handling", "Safety Protocol Compliance", "Technical English"],
    deadline: "2026-06-20",
    daysRemaining: 88,
    matchPercentage: 86,
    stipendOrBenefit: "₹13,500 / month + DGCA Recognized Aircraft Logbook Hours",
    description: "Prestigious opportunity inside India's premier commercial aircraft maintenance, repair, and overhaul (MRO) hangar at MIHAN Nagpur.",
    whyYouMatch: "Strong foundation in Mechanics & Physics with zero disciplinary alerts.",
    documentsRequired: ["Passport / Police Character Certificate", "Marksheets", "Medical Certificate"],
    commuteTransitInfo: "MIHAN Security Gate passes provided for SEZ transit",
    isDemo: true,
  },

  // =========================================================================
  // 5. 📚 SKILL DEVELOPMENT PROGRAMS
  // =========================================================================
  {
    id: "opp-sk-01",
    title: "Rooftop Solar PV Installation & Grid Technician (Suryamitra)",
    organization: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)",
    location: "MSME Skill Development Centre, Dharampeth, Nagpur",
    localZone: "Nagpur",
    category: "skill_development",
    categoryLabel: "Skill Development",
    categoryEmoji: "📚",
    eligibility: "Class 10 or 12 Pass (No age bar, priority for rural youth)",
    requiredSkills: ["Solar Inverters", "DC Cabling", "Rooftop Structure Mounting"],
    deadline: "2026-05-10",
    daysRemaining: 47,
    matchPercentage: 93,
    stipendOrBenefit: "100% Free Govt Training + Skill India Card + ₹2,500 conveyance",
    description: "National Skill Development Corporation (NSDC) certified 300-hour vocational boot camp creating certified solar technicians under the PM Surya Ghar Muft Bijli Yojana.",
    whyYouMatch: "High circuit knowledge (80%) enables fast-track certification.",
    documentsRequired: ["Aadhaar Card", "10th Marksheet", "Passport Photo"],
    commuteTransitInfo: "Walking distance from Dharampeth Science College Bus Stop",
    isDemo: true,
  },
  {
    id: "opp-sk-02",
    title: "Electric Vehicle (EV) Battery Servicing & Diagnostic Cohort",
    organization: "Maharashtra State Skill University (MSSU) Centre",
    location: "Govt Technical High School Complex, Hingna Road, Nagpur",
    localZone: "Hingna",
    category: "skill_development",
    categoryLabel: "Skill Development",
    categoryEmoji: "📚",
    eligibility: "Class 10/12 or ITI candidates seeking modern EV specialization",
    requiredSkills: ["Lithium-ion Battery Safety", "BMS Testing", "Multimeter Diagnostics"],
    deadline: "2026-05-28",
    daysRemaining: 65,
    matchPercentage: 91,
    stipendOrBenefit: "Industry Recognized MSSU Certification + Placement Assistance",
    description: "Modern 8-week intensive hands-on lab training on electric 2-wheeler and 3-wheeler battery packs, motor controllers, and charging infrastructure.",
    whyYouMatch: "Electrical theory proficiency and practical focus.",
    documentsRequired: ["ID Proof", "Educational Qualification Proof"],
    commuteTransitInfo: "City Bus Route 12 directly stops in front of Technical Complex",
    isDemo: true,
  },
  {
    id: "opp-sk-03",
    title: "Precision Tool & Die Making 6-Month Certificate",
    organization: "MSME Technology Centre Butibori (Govt of India Society)",
    location: "Plot 30, Butibori Industrial Area, Nagpur, Maharashtra",
    localZone: "Butibori",
    category: "skill_development",
    categoryLabel: "Skill Development",
    categoryEmoji: "📚",
    eligibility: "Class 10 Pass with Science & Math",
    requiredSkills: ["Engineering Drawing", "Milling Operations", "Micrometer Precision"],
    deadline: "2026-06-05",
    daysRemaining: 73,
    matchPercentage: 88,
    stipendOrBenefit: "50% Fee Subsidy for Maharashtra Domicile + Guaranteed Job Interviews",
    description: "Premier Central Govt MSME toolroom equipped with CNC Wire EDM, spark erosion machines, and 3D CAD modeling software.",
    whyYouMatch: "Strong geometry reasoning and workshop precision aptitude.",
    documentsRequired: ["Class 10 Marksheet", "Aadhaar Card", "Caste Certificate (if applicable)"],
    commuteTransitInfo: "Located right off NH-44 near Butibori Fire Station",
    isDemo: true,
  },

  // =========================================================================
  // 6. 💰 SCHOLARSHIPS
  // =========================================================================
  {
    id: "opp-sch-01",
    title: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulk (EBC) Scholarship",
    organization: "Government of Maharashtra (MahaDBT Directorate)",
    location: "All Colleges & Polytechnics across Nagpur & Vidarbha",
    localZone: "Nagpur",
    category: "scholarships",
    categoryLabel: "Scholarships",
    categoryEmoji: "💰",
    eligibility: "Family Annual Income ≤ ₹8,00,000, min 50% in previous exam",
    requiredSkills: ["Academic Regularity", "Valid Bank Account Linking"],
    deadline: "2026-04-30",
    daysRemaining: 37,
    matchPercentage: 96,
    stipendOrBenefit: "50% to 100% Tuition & Exam Fee Reimbursement (Direct Transfer)",
    description: "Flagship Maharashtra state scheme ensuring economically backward class students pursue professional diploma and degree courses without fee burden.",
    whyYouMatch: "Your verified income profile and Class 10/12 attendance compliance (87%) make you fully eligible.",
    documentsRequired: ["Tehsildar Income Certificate", "Ration Card", "Domicile Certificate", "College Fee Receipt"],
    commuteTransitInfo: "Online portal application (MahaDBT Aaple Sarkar)",
    isDemo: true,
    applicationUrl: "/scholarships",
  },
  {
    id: "opp-sch-02",
    title: "MIHAN Industrial CSR Merit Scholarship for Rural & Municipal Youth",
    organization: "MIHAN Industries Association CSR Foundation",
    location: "Nagpur Rural, Hingna & MIHAN Catchment Area",
    localZone: "MIHAN",
    category: "scholarships",
    categoryLabel: "Scholarships",
    categoryEmoji: "💰",
    eligibility: "Rural / Municipal school students with ≥ 70% marks pursuing technical education",
    requiredSkills: ["Merit Standing", "Local Resident of Vidarbha"],
    deadline: "2026-05-20",
    daysRemaining: 57,
    matchPercentage: 92,
    stipendOrBenefit: "₹25,000 Annual Grant for Books, Laptop & Travel Stipend",
    description: "Corporate social responsibility initiative supported by multi-national companies operating in the MIHAN SEZ to support bright underprivileged youth.",
    whyYouMatch: "Academic performance above 75% and attendance score above 85%.",
    documentsRequired: ["School Bonafide", "Marksheet", "Electricity Bill / Gram Panchayat Proof"],
    commuteTransitInfo: "Apply online or via your school principal",
    isDemo: true,
  },
  {
    id: "opp-sch-03",
    title: "NSP National Merit-cum-Means Scholarship for Technical Streams",
    organization: "Ministry of Education, Government of India",
    location: "Central Scheme (Administered in Nagpur District)",
    localZone: "Nagpur",
    category: "scholarships",
    categoryLabel: "Scholarships",
    categoryEmoji: "💰",
    eligibility: "Annual Family Income ≤ ₹3,50,000, enrolled in recognized diploma/vocational courses",
    requiredSkills: ["NSP Portal Verification", "Aadhaar Seeding"],
    deadline: "2026-05-15",
    daysRemaining: 52,
    matchPercentage: 89,
    stipendOrBenefit: "₹12,000 / annum directly deposited into student savings account",
    description: "Central government scheme aimed at arresting dropout rates after Class 10/12 and motivating bright rural youth to complete technical studies.",
    whyYouMatch: "Matches your municipal school category and income ceiling.",
    documentsRequired: ["Aadhaar Linked Bank Account", "Parent Income Certificate", "Marksheet"],
    commuteTransitInfo: "Online application via scholarships.gov.in",
    isDemo: true,
    applicationUrl: "/scholarships",
  },

  // =========================================================================
  // 7. 💻 JOBS
  // =========================================================================
  {
    id: "opp-job-01",
    title: "IT Infrastructure Support Associate (Shift Operations)",
    organization: "Tata Consultancy Services (TCS MIHAN)",
    location: "TCS SEZ Campus, Multi-Modal Hub, MIHAN, Nagpur",
    localZone: "MIHAN",
    category: "jobs",
    categoryLabel: "Jobs",
    categoryEmoji: "💻",
    eligibility: "Diploma in CS/IT/Electronics or B.Sc IT / BCA (2025/2026 Batch)",
    requiredSkills: ["Windows/Linux Troubleshooting", "Networking Basics", "Ticketing Tools"],
    deadline: "2026-06-15",
    daysRemaining: 83,
    matchPercentage: 88,
    stipendOrBenefit: "₹2,80,000 – ₹3,20,000 / annum + Medical Insurance + Company Cab",
    description: "Entry-level technical operations role monitoring client network infrastructure, server alerts, and enterprise helpdesk requests in modern MIHAN campus.",
    whyYouMatch: "Analytical math readiness and steady problem-solving aptitude.",
    documentsRequired: ["Updated Resume", "Diploma/Degree Certificate", "Valid Photo ID"],
    commuteTransitInfo: "TCS company cab network covers all sectors of Nagpur & Hingna",
    isDemo: true,
  },
  {
    id: "opp-job-02",
    title: "Junior Electronic Quality & Assembly Inspector",
    organization: "Reliance Defence & Aerospace Manufacturing",
    location: "Aerospace Park, Sector 18, MIHAN SEZ, Nagpur",
    localZone: "MIHAN",
    category: "jobs",
    categoryLabel: "Jobs",
    categoryEmoji: "💻",
    eligibility: "ITI Electrician / Electronic Mechanic or Diploma in Electronics",
    requiredSkills: ["Soldering Standards (IPC)", "Multimeter Inspection", "Circuit Testing"],
    deadline: "2026-06-30",
    daysRemaining: 98,
    matchPercentage: 92,
    stipendOrBenefit: "₹2,40,000 / annum + PF + Gratuity + Subsidized Housing Allowance",
    description: "Inspect printed circuit boards (PCBs), aerospace wire harnesses, and avionics test sub-assemblies inside ESD-protected cleanroom facilities.",
    whyYouMatch: "Your 80% circuit analysis diagnostic score is a direct fit for electronics inspection.",
    documentsRequired: ["Trade Certificate / Diploma", "PAN Card", "Aadhaar Card", "4 Photos"],
    commuteTransitInfo: "Direct bus from Butibori & Nagpur to MIHAN Aerospace Gate",
    isDemo: true,
  },
  {
    id: "opp-job-03",
    title: "Electrical Substation Maintenance Technician",
    organization: "Butibori Power & Transformer Corporation",
    location: "MIDC Industrial Estate, Butibori, Nagpur, Maharashtra",
    localZone: "Butibori",
    category: "jobs",
    categoryLabel: "Jobs",
    categoryEmoji: "💻",
    eligibility: "ITI Electrician / Wireman Certificate with Maharashtra PWD License",
    requiredSkills: ["HT/LT Switchgear", "Oil Testing", "Transformer Maintenance"],
    deadline: "2026-05-30",
    daysRemaining: 67,
    matchPercentage: 90,
    stipendOrBenefit: "₹2,20,000 – ₹2,60,000 / annum + Overtime Allowances",
    description: "Maintain 33kV/11kV industrial power distribution substations supporting pharmaceutical and chemical manufacturing plants across Butibori.",
    whyYouMatch: "High technical readiness in electric circuits and safety fundamentals.",
    documentsRequired: ["ITI NCVT Certificate", "Wireman License (if available)", "Aadhaar"],
    commuteTransitInfo: "Located 1.5 km from Butibori Bus Stand",
    isDemo: true,
  },

  // =========================================================================
  // 8. 🎪 CAREER FAIRS
  // =========================================================================
  {
    id: "opp-cf-01",
    title: "Vidarbha Mega Rozgar Melava 2026 (50+ Industrial Employers)",
    organization: "District Skill Development, Employment & Entrepreneurship Guidance Centre",
    location: "Reshimbagh Ground, Near Suresh Bhat Auditorium, Nagpur",
    localZone: "Nagpur",
    category: "career_fairs",
    categoryLabel: "Career Fairs",
    categoryEmoji: "🎪",
    eligibility: "Open to all Class 10, 12, ITI, Diploma, and Graduate job seekers",
    requiredSkills: ["Ready Resume (5 copies)", "Communication", "Technical Basics"],
    deadline: "2026-04-25",
    daysRemaining: 32,
    matchPercentage: 95,
    stipendOrBenefit: "Free On-the-spot Interviews + Spot Offer Letters & Apprenticeships",
    description: "Official government mega job fair hosting over 50 leading employers from Hingna MIDC, Butibori MIDC, and MIHAN SEZ looking for fresh local talent.",
    whyYouMatch: "Diverse vocational and diploma recruiters matching your exact profile.",
    documentsRequired: ["5 Printed Resumes", "All Marksheets Originals + Photocopies", "Photo IDs"],
    commuteTransitInfo: "5 mins walk from Reshimbagh Metro Station",
    isDemo: true,
  },
  {
    id: "opp-cf-02",
    title: "MIDC Hingna Annual Apprentice & Vocational Recruitment Drive",
    organization: "Hingna Industrial Manufacturers Association (HIA)",
    location: "HIA Recreation & Training Centre, Sector 2, Hingna MIDC, Nagpur",
    localZone: "Hingna",
    category: "career_fairs",
    categoryLabel: "Career Fairs",
    categoryEmoji: "🎪",
    eligibility: "Students who have completed or are in final semester of ITI / Diploma / 12th Voc",
    requiredSkills: ["Technical Trade Knowledge", "Workshop Enthusiasm"],
    deadline: "2026-05-05",
    daysRemaining: 42,
    matchPercentage: 94,
    stipendOrBenefit: "Direct NAPS & NATS Apprentice Contract Signings on Day 1",
    description: "Dedicated campus hiring drive by 30+ engineering, plastic moulding, casting, and auto component manufacturing units located across Hingna MIDC.",
    whyYouMatch: "High Electric Circuits readiness and Hingna location match.",
    documentsRequired: ["Trade Certificate / College Bonafide", "NAPS Portal ID", "Aadhaar"],
    commuteTransitInfo: "Special city feeder buses arranged from Sitabuldi & Wadi",
    isDemo: true,
  },
  {
    id: "opp-cf-03",
    title: "Butibori Industrial Zone Campus Recruitment Fair",
    organization: "Butibori Manufacturers Association (BMA)",
    location: "BMA Conference Hall, Phase 1, Butibori Industrial Area, Nagpur",
    localZone: "Butibori",
    category: "career_fairs",
    categoryLabel: "Career Fairs",
    categoryEmoji: "🎪",
    eligibility: "Class 12 Science / Vocational, ITI passouts, and Diploma holders",
    requiredSkills: ["Industrial Discipline", "Basic Technical Skills"],
    deadline: "2026-05-18",
    daysRemaining: 55,
    matchPercentage: 89,
    stipendOrBenefit: "Stipend offers starting from ₹11,000 to ₹18,000 / month",
    description: "Annual regional recruitment camp covering textile, pharmaceutical, paper processing, and steel fabrication industries operating in Butibori.",
    whyYouMatch: "Matches your technical mechanics readiness and industrial operations aptitude.",
    documentsRequired: ["Resume", "Educational Marksheets", "Passport Size Photos"],
    commuteTransitInfo: "Direct bus from Wardha and Nagpur stopping at BMA Gate",
    isDemo: true,
  },
];

// Helper to filter opportunities by category, local zone, and search query
export function filterStudentOpportunities(
  opportunities: StudentOpportunity[],
  options: {
    category?: OpportunityCategory | "all";
    localZone?: LocalZone;
    searchQuery?: string;
    minMatch?: number;
  }
): StudentOpportunity[] {
  const { category = "all", localZone = "All Locations", searchQuery = "", minMatch = 0 } = options;

  return opportunities.filter((opp) => {
    // 1. Category Filter
    if (category !== "all" && opp.category !== category) {
      return false;
    }

    // 2. Local Zone Filter
    if (localZone !== "All Locations" && opp.localZone !== localZone) {
      return false;
    }

    // 3. Minimum Match Score Filter
    if (minMatch > 0 && opp.matchPercentage < minMatch) {
      return false;
    }

    // 4. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = opp.title.toLowerCase().includes(q);
      const matchOrg = opp.organization.toLowerCase().includes(q);
      const matchLoc = opp.location.toLowerCase().includes(q);
      const matchSkills = opp.requiredSkills.some((s) => s.toLowerCase().includes(q));
      const matchDesc = opp.description.toLowerCase().includes(q);

      if (!matchTitle && !matchOrg && !matchLoc && !matchSkills && !matchDesc) {
        return false;
      }
    }

    return true;
  });
}

