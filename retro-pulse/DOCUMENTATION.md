# RetroPulse: The AI Team Therapist

RetroPulse is an intelligent analysis tool designed to bridge the gap between subjective team sentiment and objective project data. By processing raw feedback (from Slack, Discord, or retrospectives) and correlating it with Jira/GitHub metadata, RetroPulse identifies structural bottlenecks, morale risks, and process inefficiencies before they become critical failures.

## 🌟 Core Features

### 1. The Anonymizer
RetroPulse prioritizes psychological safety. Before any analysis occurs, raw feedback is passed through a "Professional HR Mediator" (LLM) that:
- Removes personal names and identifiers.
- Strips vitriol and personal attacks.
- Rewrites feedback to be objective and constructive.

### 2. The AI Judge
The core logic engine that performs cross-reference analysis between team sentiment and hard data.
- **Problem Identification**: Pinpoints the root cause (e.g., "Technical Debt", "Scope Creep").
- **Verdict**: Provides a high-level insight.
- **Stress Level**: Quantifies the team's distress on a scale of 1-10.
- **Suggested Action**: Generates a concrete, actionable Jira ticket title.

---

## 🚀 Getting Started

### Prerequisites
- [Ollama](https://ollama.com/) installed and running locally.
- Node.js (v18+ recommended).
- The `llama3.2` model pulled in Ollama:
  ```bash
  ollama run llama3.2
  ```

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
The entry point is `index.mjs`. You can use it as a module in your own tools:
```javascript
import { runAIJudge } from './index.mjs';

const feedback = ["I'm waiting 3 days for my PR!"];
const metadata = { averagePRIdleTime: "72 hours" };

const insight = await runAIJudge(feedback, metadata);
console.log(insight);
```

---

## 🛠️ Architecture

RetroPulse uses a layered LLM approach:
1. **Layer 1 (Anonymization)**: Uses `PromptTemplate` to sanitize input.
2. **Layer 2 (Analysis)**: Correlates the sanitized output with JSON metadata.
3. **Output Parsing**: Uses `Zod` and `StructuredOutputParser` to ensure the AI returns valid JSON for integration with other tools.

---

## 📊 Analysis Scenarios

RetroPulse is pre-configured to detect common "Anti-Patterns":

| Scenario | Indicator (Feedback) | Data Signal (Jira/GH) |
| :--- | :--- | :--- |
| **Code Review Bottleneck** | "PRs are stuck" | High PR Idle Time |
| **Meeting Fatigue** | "Too many syncs" | High Meeting vs. Coding hours |
| **Scope Creep** | "Where did this come from?" | Story Point growth during sprint |
| **Hidden Dependencies** | "Waiting on Team B" | Blocked tickets count |
| **Technical Debt** | "Scared to touch the code" | High Debt Ratio / Code Smells |

---

## 🧪 Testing

The project uses `Vitest` for behavioral testing. The tests simulate complex team scenarios to ensure the AI Judge accurately identifies the underlying issues.

Run tests:
```bash
npm test
```

---

## 📜 License
ISC License
