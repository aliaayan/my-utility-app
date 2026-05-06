'use server';
/**
 * @fileOverview A Genkit flow for explaining dashboard features based on voice input.
 *
 * - explainFeature - A function that handles the feature explanation process.
 * - VoiceFeatureExplanationInput - The input type for the explainFeature function.
 * - VoiceFeatureExplanationOutput - The return type for the explainFeature function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceFeatureExplanationInputSchema = z.object({
  query: z.string().describe('The user\'s voice query about a dashboard feature.'),
});
export type VoiceFeatureExplanationInput = z.infer<typeof VoiceFeatureExplanationInputSchema>;

const VoiceFeatureExplanationOutputSchema = z.object({
  explanation: z.string().describe('A clear and concise explanation of the requested dashboard feature.'),
});
export type VoiceFeatureExplanationOutput = z.infer<typeof VoiceFeatureExplanationOutputSchema>;

export async function explainFeature(input: VoiceFeatureExplanationInput): Promise<VoiceFeatureExplanationOutput> {
  return voiceFeatureExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceFeatureExplanationPrompt',
  input: {schema: VoiceFeatureExplanationInputSchema},
  output: {schema: VoiceFeatureExplanationOutputSchema},
  prompt: `You are an AI assistant for a Universal Utility Dashboard. Your task is to explain the purpose and functionality of the different utility components within the dashboard.

Here are the descriptions of the available tools:

1.  **Voice Assistant**: Interactive Voice Assistant. Provides voice-to-text transcription from the browser's native Web Speech API with a visual microphone pulse. The transcribed voice input will be processed as a tool to interpret commands or assist with navigation.
2.  **Mortgage Calculator**: Comprehensive Mortgage Calculator. Allows users to input principal, interest rate, and loan term, calculates mortgage details, and visualizes the breakdown using a Chart.js doughnut chart.
3.  **Scientific Calculator**: Advanced Scientific Calculator. Offers a comprehensive suite of mathematical functions and operations powered by math.js for complex scientific calculations.

The user has asked the following question: "{{{query}}}"

Please identify which feature the user is asking about and provide a clear, concise, and helpful explanation of its purpose and functionality. If the query does not relate to one of these specific dashboard features, politely state that you can only provide information about the dashboard's utility components.

Ensure your explanation is direct and easy to understand.
`,
});

const voiceFeatureExplanationFlow = ai.defineFlow(
  {
    name: 'voiceFeatureExplanationFlow',
    inputSchema: VoiceFeatureExplanationInputSchema,
    outputSchema: VoiceFeatureExplanationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
