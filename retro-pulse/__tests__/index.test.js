// analysis.test.js
import { describe, it, expect } from 'vitest';
import { runAIJudge } from '../index.mjs';

describe('RetroPulse', () => {
    /*
    Scenario 1: The "Code Review" Bottleneck
    The Situation: Developers feel like the project is stalled, but they aren't sure why. They blame "requirements," but the data shows PRs are sitting idle.

    What the AI should find: The team thinks requirements are the issue, but the 52-hour idle time shows that Code Reviews are the real killer.
    */
    it('should identify the Code Review Bottleneck', async () => {
        const slackFeedback = [
            "I'm so frustrated. I've been waiting for my PR to be merged for 3 days. It's blocking the whole landing page update.",
            "Why is our velocity so low this week? It feels like we're just spinning our wheels.",
            "I think the requirements for ticket PROJ-101 were super confusing. I had to redo half the work."
        ];
        const jiraMetadata = {
            sprintName: "Sprint 24 - Alpha",
            averagePRIdleTime: "52 hours",
            totalTickets: 12,
            ticketsInReview: 5,
            velocityTrend: "-15%"
        };
        const verdict = await runAIJudge(slackFeedback, jiraMetadata);

        console.log(verdict);
        expect(verdict.verdict).not.toBeNull();
        expect(verdict.stressLevel).toBeGreaterThan(0);
        expect(verdict.stressLevel).toBeLessThan(10);
        expect(verdict.suggestedAction).not.toBeNull();
    }, 55000);

    /**
     * Scenario 2: The "Meeting Fatigue" Spike
        The Situation: The team is exhausted. They feel like they have "no time to code."

        What the AI should find: A clear correlation between high meeting density and low output. The "AI Judge" should suggest moving to async updates.
    */
    it('should identify the Meeting Fatigue Spike', async () => {
        const slackFeedback = [
            "Another 1-hour 'sync' that could have been an email. I literally haven't opened VS Code today.",
            "If I see one more Zoom invite I'm going to lose it.",
            "The afternoon standups are killing my flow. I just get into the zone and then—DING—meeting time."
        ];
        const jiraMetadata = {
            activeDeveloperHours: "22h/week",
            scheduledMeetingHours: "18h/week",
            ticketsMovedToDone: 4,
            contextSwitchingEvents: "High (detected via calendar clusters)"
        };
        const verdict = await runAIJudge(slackFeedback, jiraMetadata);

        console.log(verdict);
        expect(verdict.verdict).not.toBeNull();
        expect(verdict.stressLevel).toBeGreaterThan(0);
        expect(verdict.stressLevel).toBeLessThan(10);
        expect(verdict.suggestedAction).not.toBeNull();
    }, 55000);

    /**
     * Scenario 3: The "Scope Creep" Stealth Attack
        The Situation: The Product Manager is happy, but the Engineers are burnt out and "don't know where the time went."

        What the AI should find: Scope Creep. The team isn't slow; the goalposts moved 45% during the sprint.
     */
    it('should identify the Scope Creep Stealth Attack', async () => {
        const slackFeedback = [
            "Wait, when did we add 'Dark Mode' to this sprint? I don't remember that in planning.",
            "I'm working late again to finish these 'small tweaks' that keep appearing in Jira.",
            "The sprint board looks way bigger than it did on Monday."
        ];
        const jiraMetadata = {
            initialStoryPoints: 40,
            currentStoryPoints: 58,
            unplannedTicketsAdded: 7,
            bugsFound: 2
        };
        const verdict = await runAIJudge(slackFeedback, jiraMetadata);

        console.log(verdict);
        expect(verdict.verdict).not.toBeNull();
        expect(verdict.stressLevel).toBeGreaterThan(0);
        expect(verdict.stressLevel).toBeLessThan(10);
        expect(verdict.suggestedAction).not.toBeNull();
    }, 55000);

    /**
     * Scenario 4: The "Hidden Dependencies" Trap
        The Situation: The team is hitting mysterious "blockers" every few days, but they can't figure out the pattern. It feels like "bad luck."

        What the AI should find: A structural dependency issue. Team A is blocked by Team B, which is blocked by Team C. The fix is cross-team alignment, not just "working harder."
     */
    it('should identify the Hidden Dependencies Trap', async () => {
        const slackFeedback = [
            "I can't start the auth service until the API team finishes their contract. We've been waiting 5 days.",
            "Another dependency delay. Why does the payments service always break ours?",
            "I feel like I spend more time tracking other teams than actually coding."
        ];
        const jiraMetadata = {
            teamA_ticketsBlocked: 3,
            teamB_ticketsBlocked: 2,
            teamC_ticketsBlocked: 1,
            dependenciesOnOtherTeams: "High (detected via inter-service ticket linking)"
        };
        const verdict = await runAIJudge(slackFeedback, jiraMetadata);

        console.log(verdict);
        expect(verdict.verdict).not.toBeNull();
        expect(verdict.stressLevel).toBeGreaterThan(0);
        expect(verdict.stressLevel).toBeLessThan(10);
        expect(verdict.suggestedAction).not.toBeNull();
    }, 55000);

    /**
     * Scenario 5: The "Technical Debt" Avalanche
        The Situation: The team keeps pushing "refactoring" to the next sprint, but now the codebase is becoming unstable, and morale is crashing.

        What the AI should find: A critical Debt Spiral. The team is in a death spiral of bugs and patches. The AI should flag this as an emergency.
     */
    it('should identify the Technical Debt Avalanche', async () => {
        const slackFeedback = [
            "I spent 4 hours debugging a legacy function that should have taken 10 minutes. We need to refactor this NOW.",
            "Every time I fix one bug, two more appear in the old code. It's a nightmare.",
            "I'm scared to touch the codebase. It feels like a house of cards."
        ];
        const jiraMetadata = {
            technicalDebtRatio: "65%",
            refactoringTicketsCount: 0,
            codeSmellsDetected: 120
        };
        const verdict = await runAIJudge(slackFeedback, jiraMetadata);

        console.log(verdict);
        expect(verdict.verdict).not.toBeNull();
        expect(verdict.stressLevel).toBeGreaterThan(0);
        expect(verdict.stressLevel).toBeLessThan(10);
        expect(verdict.suggestedAction).not.toBeNull();
    }, 55000);

});