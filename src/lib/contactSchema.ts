import { z } from 'zod';

export const PROJECT_TYPES = ['Landing page', 'Business website', 'Web portal / dashboard', 'Portfolio', 'Real estate website', 'Restaurant / hospitality website', 'E-commerce store', 'Something else'] as const;
// SWAP: adjust budget ranges to match your pricing.
export const BUDGETS = ['Under ₦150k', '₦150k – ₦400k', '₦400k – ₦1M', '₦1M+', 'Not sure yet'] as const;
export const TIMELINES = ['As soon as possible', '2 – 4 weeks', '1 – 2 months', 'Flexible'] as const;

// Shared by the client form (inline validation) and the API route (server validation).
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Enter a valid email address').max(120),
  projectType: z.enum(PROJECT_TYPES, { errorMap: () => ({ message: 'Pick a project type' }) }),
  budget: z.enum(BUDGETS, { errorMap: () => ({ message: 'Pick a budget range' }) }),
  timeline: z.enum(TIMELINES, { errorMap: () => ({ message: 'Pick a timeline' }) }),
  message: z.string().trim().min(10, 'Tell us a little more (10+ characters)').max(3000),
  company: z.string().max(0).optional(), // honeypot: real users leave this empty
});
export type ContactInput = z.infer<typeof contactSchema>;
