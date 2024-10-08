import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  isLogged: z.boolean(),
  lastName: z.string(),
  password: z.string(),
  thumbnail: z.string(),
});

export type UserType = z.infer<typeof userSchema>;

const userSignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserSignInType = z.infer<typeof userSignInSchema>;

const userMemberSchema = z.object({
  userId: z.string(),
  groupOwnerId: z.string(),
});

export type UserMemberType = z.infer<typeof userMemberSchema>;
