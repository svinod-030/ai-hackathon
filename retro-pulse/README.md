# 🌪️ RetroPulse: The AI Team Therapist

**RetroPulse** is a powerful AI engine that turns messy team feedback into actionable project insights. It uses Local LLMs (via Ollama) to anonymize vitriol and correlate developer sentiment with hard data from Jira and GitHub.

---

## ✨ Why RetroPulse?
- **Psychological Safety**: Automatically anonymizes feedback and removes personal attacks.
- **Data-Driven Insights**: Cross-references "how the team feels" with "what the data says."
- **Actionable**: Suggests specific Jira tickets to fix process bottlenecks.

## 🚀 Quick Start
1. **Pull the Model**: `ollama run llama3.2`
2. **Install**: `npm install`
3. **Test**: `npm test`

## 📖 Documentation
For a deep dive into the architecture, configuration, and analysis scenarios, see:
👉 **[Full Documentation](DOCUMENTATION.md)**

---

## 🛠️ Example
```javascript
import { runAIJudge } from './index.mjs';

const insight = await runAIJudge(
    ["The 4pm standup is killing my focus"], 
    { scheduledMeetingHours: "20h/week" }
);

// Result: { problem: "Meeting Fatigue", stressLevel: 8, ... }
```

---
License: ISC
