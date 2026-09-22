export type AttendanceStatus = "present" | "absent" | "late" | "unmarked";

export type RiskLevel = "high_risk" | "declining" | "regular";

export type InterventionType =
  | "contact_parent"
  | "schedule_counselling"
  | "teacher_followup"
  | "monitor_progress";

export interface WeeklyAttendance {
  weekLabel: string; // e.g. "Week 1", "Week 2", "Week 3", "Week 4"
  percentage: number;
  presentDays: number;
  totalDays: number;
}

export interface InterventionLog {
  id: string;
  studentId: string;
  type: InterventionType;
  title: string;
  notes: string;
  date: string; // e.g. "Sep 20" or "2026-09-20"
  performedBy: string;
  status: "Completed" | "Scheduled" | "In Progress";
}

export interface MissedAssignmentItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "Overdue" | "Pending Review";
}

export interface ScholarshipStatusInfo {
  schemeName: string;
  matchPercentage: number;
  deadline: string;
  status: "Eligible - Action Required" | "Documents Pending" | "Applied" | "Not Started";
  actionRequired: string;
}

export interface StudentAlertItem {
  id: string;
  date: string;
  title: string;
  type: "high" | "medium" | "info";
  description: string;
}

export interface LearningProgressSummary {
  overallCompletion: number; // e.g. 58%
  activeDaysStreak: number;
  practiceQuestionsSolved: number;
  hoursSpentThisMonth: number;
  strongTopic: string;
  weakTopic: string;
}

export interface EarlyWarningSignals {
  riskLevel: RiskLevel;
  score: number; // 0-100 Early Warning Index
  trendSummary: string; // e.g. "Attendance declining for 3 consecutive weeks."
  consecutiveAbsences: number; // e.g. 5
  attendanceDropPercent: number; // e.g. 22
  academicDecline: string; // e.g. "Math performance dropped from 74% to 52%"
  missedAssignments: number; // e.g. 3
  learningInactivityDays: number; // e.g. 10
  reasons: string[]; // Transparent reasons explaining WHY flagged
  recommendedInterventions: {
    type: InterventionType;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }[];
}

export interface StudentAttendanceRecord {
  id: string;
  rollNumber: string;
  name: string;
  avatar: string;
  gender: "Male" | "Female" | "Other";
  className: string;
  section: string;
  currentStatus: AttendanceStatus;
  overallAttendance: number; // e.g. 63%
  weeklyTrend: WeeklyAttendance[]; // [W1, W2, W3, W4]
  consecutiveAbsences: number;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  earlyWarning: EarlyWarningSignals;
  parentInfo: {
    name: string;
    relation: string;
    phone: string;
    preferredLanguage: string;
  };
  interventionHistory: InterventionLog[];
  academicSubjectMastery: {
    subject: string;
    score: number;
  }[];
  // Extended fields for Student Detail View
  missedAssignmentsList?: MissedAssignmentItem[];
  scholarshipInfo?: ScholarshipStatusInfo;
  recentAlertsList?: StudentAlertItem[];
  learningProgressDetails?: LearningProgressSummary;
}

export interface ClassCohort {
  id: string;
  name: string; // "Class 12-A"
  grade: string; // "12"
  section: string; // "A"
  stream?: string; // "Science"
  totalEnrolled: number; // e.g. 180 Students
  classTeacher: string;
  subjects: string[];
}

export interface DailyAttendanceSession {
  classId: string;
  date: string; // YYYY-MM-DD
  subject: string;
  recordedBy: string;
  lastUpdated: string;
}

