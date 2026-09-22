# 📐 Skillora System Architecture & Design Specification

## Overview
Skillora is architected around a decentralized, fault-tolerant educational support model designed to bridge socioeconomic, linguistic, and connectivity gaps across rural and semi-urban learning ecosystems.

---

## 1. Topological Structure
The platform operates as a 5-node distributed interactive topology:
1. **Student Core:** Diagnostic skill testing, adaptive Socratic feedback, portfolio generation.
2. **Industry Interface:** Verified local internship pipelines, apprenticeship matches (NAPS/NATS), and job postings.
3. **Academia Bridge:** Curriculum-aligned topic notes, faculty guidance, and career counsel.
4. **Institutional Command:** Multi-tier attendance analytics, dropout mitigation alerts, and grant oversight.
5. **Opportunity Engine:** Geo-tagged regional opportunities (Nagpur, MIHAN, Hingna, Butibori) categorized into 8 distinct pathways.

---

## 2. Low-Data & Accessibility Architecture
Students in tier-2 and tier-3 regions face erratic cellular signals and shared hardware constraints. Skillora's accessibility subsystem implements:
- **`LowDataContext` Provider:** Global reactive state managing bandwidth profile (`standard` vs `low-data`).
- **Dynamic Asset Throttling:** Non-essential background animations, heavy canvases, and uncompressed media are automatically bypassed.
- **Offline Cache Engine:** Client-side local persistence (`IndexedDB` + `LocalStorage`) storing structured markdown study notes and diagnostic questions.
- **Telemetry Tracker:** Real-time computation of saved bandwidth (MB saved indicator).

---

## 3. Career Recommendation Pipeline
```
[Student Profile] ──> (Class + Performance + Diagnostic Gaps)
                             │
                             ▼
              [Opportunity Matching Matrix]
                             │
       ┌─────────────────────┼─────────────────────┐
       ▼                     ▼                     ▼
[Eligibility Check]   [Location Radius]    [Skill Overlap %]
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             │
                             ▼
              [Ranked Career Recommendations]
              • Match percentage indicator
              • Verified deadline alert
              • 1-Click application modal
```

---

## 4. Security & Privacy
- **Role-Based Access Control (RBAC):** Strict partition between Student, Teacher, Parent, and Administrator sessions.
- **Child Privacy Protection:** Parental consent triggers for student contact and external job applications.
- **No False Outcome Claims:** Socratic guidance strictly distinguishes between AI diagnostic assistance and certified credentials.

