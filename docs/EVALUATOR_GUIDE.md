# 🎯 Buildathon 2.0 Evaluator & Judge Walkthrough Guide

Welcome Evaluators! This document outlines the recommended evaluation script to test all 10 core milestones implemented in **Skillora**.

---

## ⚡ 1-Minute Fast Verification Route

### Step 1: Open Localhost
Navigate to: **[http://localhost:3000](http://localhost:3000)**

### Step 2: Test the Core Philosophy & Interactive Topology
1. Scroll down past the spacious Hero section.
2. Observe the **"The Intelligent Bridge Between Skills, Learning and Opportunity"** section.
3. Hover over the 5 nodes in the **Skillora Ecosystem Topology**:
   - `STUDENTS` (Cyan)
   - `INDUSTRY` (Purple)
   - `ACADEMIA` (Emerald)
   - `INSTITUTIONS` (Amber)
   - `OPPORTUNITIES` (Sky Blue)
4. Notice dynamic beam glowing and responsive mobile compatibility.

### Step 3: Test Student Opportunity Hub
1. Click **`CAREER & OPPS`** in the top navigation bar (or navigate to `/opportunities`).
2. Test the **8 Opportunity Category Filter Pills**:
   - Higher Education, ITI Courses, Internships, Apprenticeships, Skill Development, Scholarships, Jobs, Career Fairs.
3. Test **Opportunities Near You** location filters:
   - *Nagpur Central*, *MIHAN SEZ*, *Hingna Industrial Area*, *Butibori MIDC*.
4. Inspect the **"Recommended For You"** career section based on student profile (e.g., *ITI Electrician*, *Diploma in Computer Engineering*).
5. Click **"View Details"** on any card to open the complete application modal.

### Step 4: Test ⚡ Low Data & Offline Mode
1. In the navigation bar, click the **⚡ Low Data Mode** button.
2. Notice the UI transitions into clean text-first mode, disabling unnecessary heavy animations.
3. Click **"Offline / Saved"** in the navigation bar dropdown (or visit `/learning/saved`).
4. Read and view the pre-cached notes and study materials designed to work even with 0 internet connection.

### Step 5: Test Teacher & Parent Portals
1. Go to `/login` and use the 1-click **Teacher** demo button:
   - View Attendance decline trends, at-risk flags, and 1-click intervention actions.
2. Go to `/login` and use the 1-click **Parent** demo button:
   - View the 5-second daily health and attendance overview built for shared mobile screens.

---

## 📋 Evaluator Checklist
- [x] Responsive layout with zero horizontal overflow
- [x] Verified authentic regional opportunity categories
- [x] Functional low-data toggle with bandwidth savings telemetry
- [x] Genuine offline study caching (no fake offline indicators)
- [x] Clear role segregation for Student, Teacher, Parent, and Institution
