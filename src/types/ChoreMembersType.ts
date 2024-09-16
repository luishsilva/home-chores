import { z } from 'zod';

const choreMembersSchema = z.object({
  id: z.string(),
  choreId: z.string(),
  choreStatus: z.string(),
  memberId: z.string(),
});

export type ChoreMemberType = z.infer<typeof choreMembersSchema>;
