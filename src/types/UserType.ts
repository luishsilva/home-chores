// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

const userSchema = z.object({
  email: z.string(),
  firstName: z.string(),
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
