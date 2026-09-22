import { Scholarship, ScholarshipProfile, EligibilityMatchResult } from "./types";

export function calculateScholarshipMatch(
  scholarship: Scholarship,
  profile: ScholarshipProfile
): EligibilityMatchResult {
  let score = 0;
  const matchReasons: string[] = [];
  const gapReasons: string[] = [];

  let incomePass = false;
  let marksPass = false;
  let classPass = false;
  let categoryPass = false;
  let genderPass = false;
  let locationPass = false;

  // 1. Family Income Check (25 pts)
  if (profile.familyIncome <= scholarship.eligibility.maxFamilyIncome) {
    incomePass = true;
    score += 25;
    matchReasons.push(
      `Family income (₹${profile.familyIncome.toLocaleString("en-IN")}) is within the ₹${scholarship.eligibility.maxFamilyIncome.toLocaleString("en-IN")} ceiling`
    );
  } else {
    gapReasons.push(
      `Family income (₹${profile.familyIncome.toLocaleString("en-IN")}) exceeds the ₹${scholarship.eligibility.maxFamilyIncome.toLocaleString("en-IN")} maximum limit`
    );
  }

  // 2. Academic Marks Check (25 pts)
  if (profile.marks >= scholarship.eligibility.minMarks) {
    marksPass = true;
    score += 25;
    matchReasons.push(
      `Academic marks (${profile.marks}%) comfortably meet the ${scholarship.eligibility.minMarks}% minimum requirement`
    );
  } else {
    gapReasons.push(
      `Academic score (${profile.marks}%) is below the required ${scholarship.eligibility.minMarks}% minimum`
    );
  }

  // 3. Class / Education Level Check (20 pts)
  const targetClasses = scholarship.eligibility.targetClasses;
  if (
    targetClasses.includes("All") ||
    targetClasses.includes(profile.classLevel) ||
    (profile.classLevel === "Class 12" && targetClasses.includes("Post-Matric")) ||
    (profile.classLevel === "Class 10" && targetClasses.includes("Pre-Matric"))
  ) {
    classPass = true;
    score += 20;
    matchReasons.push(`Open to current education level (${profile.classLevel})`);
  } else {
    gapReasons.push(
      `Restricted to: ${targetClasses.join(", ")} (current: ${profile.classLevel})`
    );
  }

  // 4. Reservation Category Check (15 pts)
  if (
    scholarship.eligibility.categories.includes(profile.category) ||
    scholarship.eligibility.categories.includes("General")
  ) {
    categoryPass = true;
    score += 15;
    matchReasons.push(`Eligible under category quota (${profile.category})`);
  } else {
    gapReasons.push(
      `Reserved for: ${scholarship.eligibility.categories.join(", ")} (your profile: ${profile.category})`
    );
  }

  // 5. Gender Check (10 pts)
  if (
    scholarship.eligibility.gender === "All" ||
    scholarship.eligibility.gender === profile.gender
  ) {
    genderPass = true;
    score += 10;
    if (scholarship.eligibility.gender === "Female" && profile.gender === "Female") {
      matchReasons.push(`Dedicated girl student affirmative action & priority grant`);
    } else {
      matchReasons.push(`Gender eligibility verified (${profile.gender})`);
    }
  } else {
    gapReasons.push(`Reserved exclusively for ${scholarship.eligibility.gender} students`);
  }

  // 6. Location / State Domicile Check (5 pts)
  if (
    scholarship.state === "All-India" ||
    scholarship.state.toLowerCase() === profile.state.toLowerCase()
  ) {
    locationPass = true;
    score += 5;
    matchReasons.push(`Eligible for ${scholarship.state} residents`);
  } else {
    gapReasons.push(`Requires state domicile of ${scholarship.state}`);
  }

  // Hard eligibility requires passing primary criteria
  const isEligible = incomePass && marksPass && classPass && categoryPass && genderPass && locationPass;

  // Normalize score
  const finalScore = Math.min(Math.max(score, 10), 98);

  return {
    scholarshipId: scholarship.id,
    matchScore: finalScore,
    isEligible,
    matchReasons,
    gapReasons,
  };
}
