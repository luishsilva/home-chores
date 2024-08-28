import { z } from 'zod';

const userMemberSchema = z.object({
  userId: z.string(),
  groupOwnerId: z.string(),
});

export type UserMemberType = z.infer<typeof userMemberSchema>;
