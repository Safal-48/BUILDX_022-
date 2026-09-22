export type UrgencyLevel = "urgent" | "approaching" | "open";

export type ApplicationStatus =
  | "not_started"
  | "documents_pending"
  | "applied"
  | "under_review"
  | "approved"
  | "rejected";

export type ReservationCategory =
  | "General"
  | "OBC"
  | "SC"
  | "ST"
  | "VJNT"
  | "SBC"
  | "EWS";

export type Gender = "Female" | "Male" | "Other" | "All";

export type EducationLevel =
  | "Class 9"
  | "Class 10"
  | "Class 11"
  | "Class 12"
  | "ITI Trade"
  | "Polytechnic Diploma"
  | "Undergraduate"
  | "Postgraduate";

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  authority?: string;
  sampleTips?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  officialSchemeCode?: string;
  provider: string;
  portalName: "MahaDBT" | "National Scholarship Portal (NSP)" | "AICTE Portal" | "State Welfare Portal";
  portalUrl: string;
  level: "Pre-Matric" | "Post-Matric" | "Higher Education" | "Vocational / ITI" | "Technical Diploma";
  state: "Maharashtra" | "All-India";
  benefitAmount: string;
  annualGrantRupees: number;
  deadline: string; // ISO date string e.g. "2026-09-27"
  daysRemaining: number;
  urgency: UrgencyLevel;
  description: string;
  isGovernmentScheme: boolean;
  eligibility: {
    minMarks: number;
    maxFamilyIncome: number;
    targetClasses: string[];
    categories: ReservationCategory[];
    gender: Gender;
    disabilityOnly?: boolean;
    location: string;
    streams: string[];
  };
  requiredDocuments: DocumentItem[];
  applicationSteps: string[];
  tags: string[];
}

export interface ScholarshipProfile {
  fullName: string;
  classLevel: EducationLevel;
  marks: number;
  familyIncome: number;
  category: ReservationCategory;
  gender: "Female" | "Male" | "Other";
  disabilityStatus: "None" | "PwD (40%+)" | "Hearing Impaired" | "Visually Impaired";
  state: string;
  district: string;
  stream: "Science" | "Commerce" | "Arts" | "Vocational / ITI" | "Polytechnic Diploma" | "General";
  documentsOnHand: Record<string, boolean>;
}

export interface EligibilityMatchResult {
  scholarshipId: string;
  matchScore: number; // 0 - 100%
  isEligible: boolean;
  matchReasons: string[];
  gapReasons: string[];
}

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarshipTitle: string;
  provider: string;
  portalName: string;
  portalUrl: string;
  status: ApplicationStatus;
  applicationId?: string;
  appliedDate?: string;
  benefitAmount: string;
  notes?: string;
  lastUpdated: string;
}
