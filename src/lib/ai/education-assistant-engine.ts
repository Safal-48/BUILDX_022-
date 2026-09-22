export interface AssistantActionRecommendation {
  label: string;
  actionType: "link" | "sandbox" | "interview" | "scholarship" | "assessment";
  targetUrl: string;
  metaBadge?: string;
}

export interface EducationAssistantResponse {
  replyText: string;
  groundedContextTags: string[];
  recommendedActions: AssistantActionRecommendation[];
  suggestedFollowUps: string[];
}

export function generateEducationAssistantResponse(
  userQuery: string
): EducationAssistantResponse {
  const q = userQuery.toLowerCase().trim();

  // 1. PHOTOSYNTHESIS (Prompt Example: "Bhai mujhe photosynthesis samajh nahi aa raha.")
  if (
    q.includes("photosynthesis") ||
    q.includes("प्रकाश संश्लेषण") ||
    q.includes("photo synthesis")
  ) {
    return {
      replyText: `Arre simple hai bhai! **Photosynthesis (प्रकाश संश्लेषण)** ka basic matlab hai **पौधों का अपना खाना खुद बनाना**। 🌿☀️

Jaise tumhare ghar mein kitchen mein khana banta hai, waise hi plant ki kitchen hoti hai uski **Leaves (पत्तियां)**! Dekho 4 cheezein chahiye hoti hain:

1. ☀️ **Dhoop (Sunlight):** Suraj se energy milti hai.
2. 🍃 **Chlorophyll (क्लोरोफिल):** Leaves ka green pigment jo dhoop ko absorb karta hai.
3. 💧 **Paani (H₂O):** Roots (जड़ों) se mitti se sokha jata hai.
4. 💨 **Hawa (CO₂):** Patti ke niche chhote-chhote chhed (**Stomata**) hote hain, jahan se Carbon Dioxide andar aati hai.

---

### 🍳 Ban kya raha hai? (Output)
- **Glucose (C₆H₁₂O₆):** Plant ka khana, jo usko bada hone mein madad karta hai.
- **Oxygen (O₂):** Ye gas plant bahar nikalta hai, jisse hum aur tum saans lete hain! 🫁

### 📝 Exam Equation (Zaroor yaad rakhna):
$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Sunlight} \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$

Samajh aaya bhai? Ab ek chhota sa sawal: **Pedh humein kaunsi gas dete hain photosynthesis ke baad?**`,
      groundedContextTags: ["Biology", "Class 10 Life Processes", "Hinglish Support"],
      recommendedActions: [
        {
          label: "15-Min Photosynthesis Practice",
          actionType: "sandbox",
          targetUrl: "/learning/intervention?topic=photosynthesis",
          metaBadge: "15 Mins",
        },
        {
          label: "Practice Biology Questions",
          actionType: "assessment",
          targetUrl: "/practice",
          metaBadge: "Class 10/12",
        },
      ],
      suggestedFollowUps: [
        "Stomata ka kaam kya hota hai?",
        "Chlorophyll kahan present hota hai?",
        "Start 15-min Practice on Photosynthesis",
      ],
    };
  }

  // 2. TRIGONOMETRY (Priority Learning Gap)
  if (
    q.includes("trig") ||
    q.includes("sin") ||
    q.includes("cos") ||
    q.includes("tan") ||
    q.includes("त्रिकोणमिति")
  ) {
    return {
      replyText: `### 📐 Trigonometry ko bilkul aasaan tareeqe se samjhein!

Trigonometry ka dar nikal do bhai, ye sirf ek **Right-Angled Triangle (समकोण त्रिभुज)** ke 3 sides ka relationship hai:

1. **Hypotenuse (H):** Sabse lambi side (90° ke saamne wali).
2. **Opposite (O / Perpendicular - P):** Jis angle (θ) ki hum baat kar rahe hain, uske saamne wali side.
3. **Adjacent (A / Base - B):** Angle (θ) ke bilkul bagal wali side.

#### 🧠 Ye Desi Mnemonic yaad rakhlo, kabhi nahi bhoologe:
> **"Some People Have, Curly Brown Hair, Turned Permanent Black"**

- **S**in θ = **P** / **H** (Opposite / Hypotenuse)
- **C**os θ = **B** / **H** (Adjacent / Hypotenuse)
- **T**an θ = **P** / **B** (Opposite / Adjacent)

#### ⚡ Super Tip for Exams:
$\\tan 45^\\circ = 1$ hota hai. Iska matlab jab suraj $45^\\circ$ pe hoga, toh **khambhe ki height = uski zameen par parchhai (shadow)**!

Skillora Dashboard par tumhara **Trigonometry score 38%** dikha raha hai jo tumhara priority gap hai. Chalo 15-minute ki quick practice se ise 75%+ tak lekar chalte hain!`,
      groundedContextTags: ["Mathematics", "Trigonometry", "Priority Learning Gap"],
      recommendedActions: [
        {
          label: "Start 15-min Trigonometry Practice",
          actionType: "sandbox",
          targetUrl: "/learning/intervention?topic=trigonometry",
          metaBadge: "Priority Gap",
        },
        {
          label: "View Subject Readiness",
          actionType: "link",
          targetUrl: "/learning",
          metaBadge: "Math 60%",
        },
      ],
      suggestedFollowUps: [
        "tan 45 aur sin 30 ki value kya hai?",
        "Pythagoras theorem se side kaise nikaalein?",
        "Start 15-min Practice",
      ],
    };
  }

  // 3. HOMEWORK GUIDANCE
  if (
    q.includes("homework") ||
    q.includes("गृहकार्य") ||
    q.includes("solve") ||
    q.includes("equation")
  ) {
    return {
      replyText: `### 📚 Homework Assistant: Step-by-Step Socratic Guidance

Bhai, main tumhe direct answer ratwaane ke bajaye **step-by-step samjhaunga** taaki exam mein tum khud solve kar sako!

Agar tum **Quadratic Equation** ($ax^2 + bx + c = 0$) solve kar rahe ho:
1. **Pehle standard form mein likho:** Saari terms ko ek taraf le aao taaki right side par zero ho.
2. **Method 1 - Middle Term Splitting (गुणनखंड):** Aise do numbers dhoondo jinka sum $b$ ho aur product $a \\times c$ ho.
3. **Method 2 - Quadratic Formula:** 
   $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Tumhara question kya hai? Question yahan type karo ya numbers batao, hum step-by-step solve karenge!`,
      groundedContextTags: ["Homework Help", "Socratic Method", "Mathematics"],
      recommendedActions: [
        {
          label: "Open Practice Arena",
          actionType: "assessment",
          targetUrl: "/practice",
          metaBadge: "Interactive",
        },
      ],
      suggestedFollowUps: [
        "Middle term split kaise karte hain?",
        "Discriminant (D) kya hota hai?",
      ],
    };
  }

  // 4. SCHOLARSHIP GUIDANCE
  if (
    q.includes("scholarship") ||
    q.includes("शिष्यवृत्ती") ||
    q.includes("स्कॉलरशिप") ||
    q.includes("mahadbt") ||
    q.includes("nsp")
  ) {
    return {
      replyText: `### 🎓 Skillora Scholarship Guidance

Aapke class aur profile ke anusaar sarkari scholarships ki jaankari:

1. **MahaDBT Post-Matric Scholarship (Maharashtra):**
   - **Benefit:** 100% Tuition Fee Waiver + Hostel Allowance (₹12,000 - ₹25,000/year).
   - **Eligibility:** Family income < ₹2.50 Lakh (SC/ST/OBC/VJNT/EBC).
   - **Deadline:** **30 September (Sirf 8 din bache hain!)**
   - **Documents:** Aadhaar Card, Previous Marksheet, Tehsildar Income Certificate, Domicile Certificate, Bank Passbook.

2. **National Means-cum-Merit Scholarship (NMMSS):**
   - **Benefit:** ₹12,000 per year direct into student's bank account.
   - **Deadline:** **26 September (4 din bache hain!)**

Aap Skillora ke **Scholarship Tracker** par jakar 1-click eligibility check kar sakte hain!`,
      groundedContextTags: ["Scholarships", "MahaDBT", "Financial Support"],
      recommendedActions: [
        {
          label: "Open Scholarship Portal",
          actionType: "scholarship",
          targetUrl: "/scholarships",
          metaBadge: "Urgent Deadlines",
        },
      ],
      suggestedFollowUps: [
        "Tehsildar income certificate kahan se banwayein?",
        "Bank account Aadhaar se seed kaise karein?",
      ],
    };
  }

  // 5. CAREER & VOCATIONAL GUIDANCE (ITI, Polytechnic, Diploma)
  if (
    q.includes("career") ||
    q.includes("iti") ||
    q.includes("polytechnic") ||
    q.includes("diploma") ||
    q.includes("10th ke baad") ||
    q.includes("12th ke baad")
  ) {
    return {
      replyText: `### 🚀 10th & 12th Ke Baad Career Pathways

Rural aur municipal students ke liye 3 strong practical options:

1. **ITI (Industrial Training Institute) — 1 se 2 Saal:**
   - **Trades:** Electrician, Fitter, Welder, COPA (Computer Operator).
   - **Fayda:** 18 ki umar mein direct Railway, State Electricity Board (MSEDCL) ya private factory mein technician job. Apprenticeship stipend ₹8,000 - ₹12,000/month.

2. **Polytechnic Diploma in Engineering — 3 Saal:**
   - **Branches:** Mechanical, Electrical, Civil, Computer.
   - **Fayda:** Diploma ke baad direct 2nd Year B.Tech (Lateral Entry) mein admission ya Junior Engineer (JE) ki government post.

3. **11th & 12th Science / Commerce + Skillora Certifications:**
   - Engineering (JEE / MHT-CET), Medical (NEET), Banking, ya IT skills.

Tumhara interest technical tools aur machine mein zyada hai ya computer / theory mein? Batao, main detail batata hoon!`,
      groundedContextTags: ["Career Pathways", "ITI & Polytechnic", "Local Opportunities"],
      recommendedActions: [
        {
          label: "Explore Local Opportunities",
          actionType: "link",
          targetUrl: "/opportunities",
          metaBadge: "Apprenticeships",
        },
      ],
      suggestedFollowUps: [
        "Electrician trade mein sarkari job kaise milti hai?",
        "Polytechnic ke liye admission process kya hai?",
      ],
    };
  }

  // 6. STUDY PLANNING & TIME MANAGEMENT
  if (
    q.includes("study plan") ||
    q.includes("time table") ||
    q.includes("padhai kaise karein") ||
    q.includes("planner")
  ) {
    return {
      replyText: `### ⏱️ 30-Minute Micro Study Plan (Daily Habit)

Agar tumhare paas din mein sirf 30 se 45 minute milte hain (ghar ke kaam ya kheti ke baad), tab bhi board exam mein 80%+ score kar sakte ho:

- **00:00 – 10:00 (10 mins) • Concept Recap:** Ek specific formula ya definition padho (e.g. Ohm's Law ya Trigonometry identities).
- **10:00 – 25:00 (15 mins) • Targeted Practice:** Skillora ke 15-minute practice sprint par 3 questions solve karo.
- **25:00 – 30:00 (5 mins) • Self Reassessment:** Galti kahan hui note karo.

Rozana 30 minute lagataar padhna exam ke ek hafte pehle raat bhar jagane se 10 guna behtar result deta hai!`,
      groundedContextTags: ["Study Planner", "Micro-Learning", "Exam Readiness"],
      recommendedActions: [
        {
          label: "Start Today's 15-Min Practice",
          actionType: "sandbox",
          targetUrl: "/learning/intervention?topic=trigonometry",
          metaBadge: "15 Mins",
        },
      ],
      suggestedFollowUps: [
        "Subah padhein ya raat ko?",
        "Formula sheet kaise banayein?",
      ],
    };
  }

  // DEFAULT / GENERAL ASSISTANT RESPONSE
  return {
    replyText: `Namaste! Main hoon aapka **AI Education Assistant** 🎓

Main aapki padhai aur school se judi har cheez mein madad kar sakta hoon:

1. 📖 **Subject Explanations:** Maths, Physics, Chemistry, Biology ke mushkil concepts simple bhasha mein.
2. ✍️ **Homework Guidance:** Step-by-step hints aur logic.
3. 🎯 **Practice Questions:** Exam ke liye mock questions.
4. 🚀 **Career & ITI Guidance:** 10th/12th ke baad sahi course ka chunav.
5. 🎓 **Scholarship Help:** MahaDBT aur NSP forms ki jaankari.
6. ⏱️ **Study Planning:** Rozana ka realistic timetable.

Aap mujhse **English**, **हिंदी**, ya **Hinglish** mein koi bhi sawal pooch sakte hain! Batao aaj kya seekhna chahte ho?`,
    groundedContextTags: ["AI Education Assistant", "Multilingual", "School Support"],
    recommendedActions: [
      {
        label: "Check Subject Learning Gaps",
        actionType: "link",
        targetUrl: "/learning",
        metaBadge: "Math 60%",
      },
      {
        label: "Start 15-Min Practice Sprint",
        actionType: "sandbox",
        targetUrl: "/learning/intervention?topic=trigonometry",
        metaBadge: "Trigonometry",
      },
      {
        label: "Scholarship Tracker",
        actionType: "scholarship",
        targetUrl: "/scholarships",
        metaBadge: "Deadlines",
      },
    ],
    suggestedFollowUps: [
      "Bhai mujhe photosynthesis samajh nahi aa raha.",
      "Trigonometry formulas yaad kaise karein?",
      "MahaDBT scholarship form ke documents batao.",
    ],
  };
}

