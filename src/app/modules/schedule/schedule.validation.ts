import { z } from 'zod';
export const dayEnum = z.enum([
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
]);

const objectIdValidator = z
  .string({ required_error: 'ID is required' })
  .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId' });

const scheduleValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    day: dayEnum,
    date: z.preprocess(
      (arg) =>
        typeof arg === 'string' || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date({ required_error: 'Date is required' }),
    ),
    duration: z
      .number({ required_error: 'Duration is required' })
      .min(60, 'Minimum 60 Minutes required')
      .max(120, 'Maximum 120 Minutes allowed')
      .optional(),
    startTime: z.string({ required_error: 'Start time is required' }),
    endTime: z.string({ required_error: 'End time is required' }),
    trainerId: objectIdValidator,
    maxTrainees: z.number().max(10).optional(),
    bookedTrainees: z
      .array(objectIdValidator)
      .max(10, 'Cannot book more than 10 trainees'),
    createdBy: objectIdValidator,
  }),
});

const scheduleValidationSchemaUpdate = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    day: dayEnum.optional(),
    date: z
      .preprocess(
        (arg) =>
          typeof arg === 'string' || arg instanceof Date
            ? new Date(arg)
            : undefined,
        z.date({ required_error: 'Date is required' }),
      )
      .optional(),
    duration: z
      .number({ required_error: 'Duration is required' })
      .min(60, 'Minimum 60 Minutes required')
      .max(120, 'Maximum 120 Minutes allowed')
      .optional(),
    startTime: z
      .string({ required_error: 'Start time is required' })
      .optional(),
    endTime: z.string({ required_error: 'End time is required' }).optional(),
    trainerId: objectIdValidator.optional(),
    maxTrainees: z.number().max(10).default(10).optional(),
    bookedTrainees: z
      .array(objectIdValidator)
      .max(10, 'Cannot book more than 10 trainees')
      .optional(),
    createdBy: objectIdValidator.optional(),
  }),
});

export const scheduleValidation = {
  scheduleValidationSchema,
  scheduleValidationSchemaUpdate,
};
