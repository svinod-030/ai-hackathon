import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

// 1. Initialize the AI (The "Therapist")
const model = new ChatOpenAI({

    // Local model from Ollama
    configuration: {
        baseURL: "http://localhost:11434/v1",
    },
    apiKey: "ollama", // Just a placeholder, Ollama doesn't need a real key
    modelName: "llama3.2",
    temperature: 0.2
});

/**
 * THE ANONYMIZER
 * Strips vitriol and personal identifiers
 */
async function anonymizeFeedback(rawComment) {
    const anonymizePrompt = PromptTemplate.fromTemplate(`
    You are a professional HR mediator. 
    Rewrite the following team feedback to be objective, constructive, and anonymous.
    Remove all names and personal attacks.
    
    RAW FEEDBACK: "{feedback}"
    ANONYMIZED FEEDBACK:
  `);

    const chain = anonymizePrompt.pipe(model);
    const result = await chain.invoke({ feedback: rawComment });
    return result.content;
}

/**
 * THE AI JUDGE
 * Correlates sentiment with hard metadata
 */
export async function runAIJudge(rawInput, jiraMetadata) {
    // Step 1: Clean the tone
    const cleanComment = await anonymizeFeedback(rawInput);
    console.log("✅ Anonymized:", cleanComment);

    const parser = StructuredOutputParser.fromZodSchema(
        z.object({
            problem: z.string().describe("The problem found"),
            verdict: z.string().describe("The core insight found"),
            stressLevel: z.number().describe("Scale 1-10"),
            suggestedAction: z.string().describe("The Jira ticket title to create")
        })
    );

    const judgePrompt = PromptTemplate.fromTemplate(`
    You are the RetroPulse AI Judge. 
    Compare the team's subjective sentiment against the objective project data.
    
    TEAM FEEDBACK: {comments}
    JIRA/GITHUB DATA: {metadata}
    
    return response as plain JSON object without any markdown formatting with the keys: problem, verdict, stressLevel and suggestedAction
  `);

    const input = await judgePrompt.format({
        comments: cleanComment,
        metadata: JSON.stringify(jiraMetadata)
    });

    const response = await model.invoke(input);
    // console.info("✅ Response from model:", response.content);

    return parser.parse(response.content);
}