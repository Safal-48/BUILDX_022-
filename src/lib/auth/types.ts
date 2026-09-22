export type UserRole = "student" | "teacher" | "parent" | "academician" | "industry" | "institution" | "admin";

export type PublicRole = "student" | "teacher" | "parent" | "academician" | "industry" | "institution";

export interface StudentProfileData {
  fullName: string;
  education: string;
  institution: string;
  academicYear: string;
  skills: string[];
  interests: string[];
  careerGoal: string;
  primaryLearningGoal?: string;
  currentLevel?: "Beginner" | "Intermediate" | "Advanced";
  academicLevel?: string;
  branch?: string;
  semester?: string;
  availableLearningTime?: "15 min" | "30 min" | "1 hour" | "2 hours" | "3+ hours" | string;
  preferredLearningStyle?: string[];
  difficultyPreference?: "Easy Start" | "Balanced" | "Challenge Me";
  preferredLearningTime?: "Morning" | "Afternoon" | "Evening" | "Night" | "Flexible" | string;
  motivation?: string[];
  preferredLanguage?: "English" | "Hindi" | "Hinglish" | "English + Hindi";
  experience?: string;
  projects?: Array<{
    title?: string;
    description?: string;
    link?: string;
  }>;
  certifications?: string[];
  readinessScore?: number;
  resumeUrl?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  studyPlannerEnabled?: boolean;
  targetSubjects?: string[];
  upcomingExamTitle?: string;
  upcomingExamSubject?: string;
  upcomingExamDate?: string;
  upcomingExamPriority?: "Critical" | "High" | "Medium";
  upcomingExamDifficulty?: "Standard" | "Scaffold Mode" | "Advanced Edge-Cases";
  deadlineType?: "exam" | "assignment" | "project";
}

export interface IndustryProfileData {
  organizationName: string;
  industryDomain: string;
  organizationSize: string;
  organizationDescription: string;
  website: string;
  recruiterName: string;
  recruiterDesignation: string;
  recruiterEmail: string;
  hiringInterests: string[];
}

export interface AcademicianProfileData {
  institution: string;
  department: string;
  designation: string;
  expertise: string[];
  experienceYears: number;
  researchInterests: string[];
  scholarProfile?: string;
}

export interface InstitutionProfileData {
  institutionName: string;
  institutionType: "university" | "autonomous_college" | "affiliated_college" | "research_institute" | "other";
  registrationCode: string;
  address: string;
  city: string;
  state: string;
  representativeName: string;
  representativeDesignation: string;
  representativeEmail: string;
}

export interface TeacherProfileData {
  schoolOrCollege: string;
  departmentOrSubject: string;
  designation: string;
  assignedClasses: string[];
  experienceYears?: number;
  phone?: string;
  monitorAtRiskStudents?: boolean;
}

export interface ParentProfileData {
  studentWardName: string;
  studentWardId?: string;
  schoolOrCollegeName: string;
  currentClassOrYear: string;
  contactNumber: string;
  preferredAlertChannel?: "WhatsApp" | "SMS" | "Email" | "In-App";
  languagePreference?: "Hindi" | "English" | "Marathi" | "Bilingual";
}

export type RoleOnboardingData =
  | { role: "student"; data: StudentProfileData }
  | { role: "teacher"; data: TeacherProfileData }
  | { role: "parent"; data: ParentProfileData }
  | { role: "academician"; data: AcademicianProfileData }
  | { role: "industry"; data: IndustryProfileData }
  | { role: "institution"; data: InstitutionProfileData }
  | { role: "admin"; data: Record<string, unknown> };

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isOnboarded: boolean;
  location?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  studentProfile?: StudentProfileData;
  teacherProfile?: TeacherProfileData;
  parentProfile?: ParentProfileData;
  industryProfile?: IndustryProfileData;
  academicianProfile?: AcademicianProfileData;
  institutionProfile?: InstitutionProfileData;
}

export interface AuthResponse {
  user: UserProfile;
  token?: string;
  message?: string;
}

