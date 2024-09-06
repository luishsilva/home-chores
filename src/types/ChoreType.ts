import { z } from 'zod';

const choreSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  choreValue: z.number(),
  userId: z.string(),
  choresTypeId: z.string(),
  choresStatusId: z.string(),
});

export type ChoreType = z.infer<typeof choreSchema>;
