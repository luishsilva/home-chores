import { z } from 'zod';

const choreSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  choreValue: z.number(),
  userId: z.string(),
  typeId: z.string(),
});

export type ChoreType = z.infer<typeof choreSchema>;

const choreMembersSchema = z.object({
  id: z.string(),
  choreId: z.string(),
  choreStatus: z.string(),
  memberId: z.string(),
  groupOwnerId: z.string(),
});

export type ChoreMemberType = z.infer<typeof choreMembersSchema>;

const choreStatusSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export type ChoreStatus = z.infer<typeof choreStatusSchema>;
