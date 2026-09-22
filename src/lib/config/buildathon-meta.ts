/**
 * Skillora Buildathon 2.0 Project Metadata & Feature Manifest
 */

export interface BuildathonMetadata {
  projectName: string;
  version: string;
  releaseDate: string;
  initiative: string;
  targetRegions: string[];
  corePathwaysCount: number;
  capabilities: {
    offlinePwaMode: boolean;
    adaptiveDiagnosticEngine: boolean;
    multiFactorDropoutDetection: boolean;
    proactiveScholarshipEngine: boolean;
    localIndustryPipelines: boolean;
  };
}

export const BUILDATHON_MANIFEST: BuildathonMetadata = {
  projectName: "Skillora — Digital Education Support Platform",
  version: "2.4.0-buildathon",
  releaseDate: "2026-09-22",
  initiative: "National Education & Community Support Initiative",
  targetRegions: ["Nagpur", "MIHAN", "Hingna", "Butibori", "Vidarbha Cluster"],
  corePathwaysCount: 8,
  capabilities: {
    offlinePwaMode: true,
    adaptiveDiagnosticEngine: true,
    multiFactorDropoutDetection: true,
    proactiveScholarshipEngine: true,
    localIndustryPipelines: true,
  },
};

