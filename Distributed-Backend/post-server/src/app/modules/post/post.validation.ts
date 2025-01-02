import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    headLine: z.string(),
    content: z.string(),
    userEmail: z.string(),
    userId: z.string(),
    userName: z.string(),
    // status: z.enum(['processing', 'finished']).optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
};
