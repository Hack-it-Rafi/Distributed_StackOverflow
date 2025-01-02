import { z } from 'zod';

// const seenUserValidationSchema = z.object({
//   userId: z.string(),
// });

const createNotificationValidationSchema = z.object({
  body: z.object({
    headLine: z.string(),
    postId: z.string(),
  }),
});

const updateNotificationValidationSchema = z.object({
  body: z.object({
    // headLine: z.string(),
    // postId: z.string(),
    // seenUser: z.array(seenUserValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const NotificationValidations = {
  createNotificationValidationSchema,
  updateNotificationValidationSchema
};
