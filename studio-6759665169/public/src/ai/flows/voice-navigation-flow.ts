'use server';
/**
 * @fileOverview A Genkit flow for interpreting voice commands to navigate the dashboard.
 *
 * - navigateByVoice - A function that processes a voice command and returns the target component name.
 * - VoiceNavigationInput - The input type for the navigateByVoice function.
 * - VoiceNavigationOutput - The return type for the navigateByVoice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VoiceNavigationInputSchema = z.object({
  voiceCommand: z.string().describe('The transcribed voice command from the user.'),
});
export type VoiceNavigationInput = z.infer<typeof VoiceNavigationInputSchema>;

const VoiceNavigationOutputSchema = z.object({
  componentName: z
    .string()
    .describe(
      'The name of the component to navigate to. Can be "MortgageCalc", "ScientificCalc", or an empty string if no specific navigation command is detected.'
    ),
});
export type VoiceNavigationOutput = z.infer<typeof VoiceNavigationOutputSchema>;

export async function navigateByVoice(
  input: VoiceNavigationInput
): Promise<VoiceNavigationOutput> {
  return voiceNavigationFlow(input);
}

const voiceNavigationPrompt = ai.definePrompt({
  name: 'voiceNavigationPrompt',
  input: { schema: VoiceNavigationInputSchema },
  output: { schema: VoiceNavigationOutputSchema },
  prompt: `The user has spoken a command: '{{{voiceCommand}}}'.
Based on this command, identify if the user wants to navigate to a specific utility component in the dashboard.

Here are the valid component names and example commands:
- To go to the Mortgage Calculator: "MortgageCalc" (e.g., "open mortgage calculator", "show me the mortgage tool", "go to the loan calculator")
- To go to the Scientific Calculator: "ScientificCalc" (e.g., "open scientific calculator", "go to the science calculator", "I need to calculate something scientific")

If the command indicates a desire to go to the Mortgage Calculator, set 'componentName' to 'MortgageCalc'.
If the command indicates a desire to go to the Scientific Calculator, set 'componentName' to 'ScientificCalc'.
If no clear navigation command for these specific tools is present, or if the command is for the voice assistant itself, set 'componentName' to an empty string.

Only output the component name in the JSON format as defined by the output schema, and nothing else.`,
});

const voiceNavigationFlow = ai.defineFlow(
  {
    name: 'voiceNavigationFlow',
    inputSchema: VoiceNavigationInputSchema,
    outputSchema: VoiceNavigationOutputSchema,
  },
  async (input) => {
    const { output } = await voiceNavigationPrompt(input);
    return output!;
  }
);
