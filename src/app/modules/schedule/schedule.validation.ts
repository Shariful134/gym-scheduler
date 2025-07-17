import { z } from 'zod';

const objectIdValidator = z
  .string({ required_error: 'ID is required' })
  .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId' });

const scheduleValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    date: z.preprocess(
      (arg) =>
        typeof arg === 'string' || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date({ required_error: 'Date is required' }),
    ),
    duration: z.number().min(1).optional(),
    trainerId: objectIdValidator,
    maxTrainees: z.number().max(50).optional(),
    bookedTrainees: z
      .array(objectIdValidator)
      .max(10, 'Cannot book more than 10 trainees')
      .optional(),
  }),
});

export const scheduleValidation = {
  scheduleValidationSchema,
};
