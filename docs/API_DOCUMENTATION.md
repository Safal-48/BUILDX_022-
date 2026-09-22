# 📡 Skillora Platform API Specifications

## Base URL
All endpoints are accessible via:
```http
POST/GET http://localhost:3000/api/*
```

---

## Endpoints

### 1. Opportunities & Career Matching
- **`GET /api/opportunities`**
  - **Query Params:** `category` (higher_ed, iti, internship, etc.), `location` (Nagpur, MIHAN, Hingna, Butibori), `query`
  - **Response:** List of categorized opportunities with matching scores, eligibility, and deadline dates.

- **`POST /api/opportunities/apply`**
  - **Body:** `{ opportunityId: string, studentId: string, profileSummary: object }`
  - **Response:** `{ success: true, applicationReference: string, timestamp: string }`

### 2. Diagnostic Assessment
- **`GET /api/assessment/questions`**
  - **Query Params:** `subject` (web_dev, math, science, etc.), `gradeLevel`
  - **Response:** Diagnostic questions designed to surface topic comprehension gaps.

- **`POST /api/assessment/submit`**
  - **Body:** `{ sessionId: string, answers: Record<string, string> }`
  - **Response:** Gap remediation roadmap, topic mastery score, recommended study notes.

### 3. Attendance & Dropout Radar
- **`GET /api/teacher/attendance`**
  - **Query Params:** `classId`, `weeks` (default: 4)
  - **Response:** Multi-week attendance telemetry with `atRisk` flag and recommended intervention protocols.

### 4. Low-Data Offline Synchronizer
- **`GET /api/offline/manifest`**
  - **Response:** Hash-verified cache manifest for offline notes, diagrams, and questions.

