import { z } from 'zod';

const choreSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  choreValue: z.number(),
  userId: z.string(),
});

export type ChoresType = z.infer<typeof choreSchema>;
