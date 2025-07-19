import { z } from 'zod';
const statusEnum = z.enum(['confirmed', 'cancelled']);
const objectIdValidator = z
  .string({ required_error: 'ID is required' })
  .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId' });

const bookingValidationSchema = z.object({
  body: z.object({
    trainerId: objectIdValidator,
    traineeId: objectIdValidator,
    scheduleId: objectIdValidator,
    status: statusEnum.optional(),
  }),
});
const bookingValidationSchemaUpdate = z.object({
  body: z.object({
    trainerId: objectIdValidator.optional(),
    traineeId: objectIdValidator.optional(),
    scheduleId: objectIdValidator.optional(),
    status: statusEnum.optional(),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
  bookingValidationSchemaUpdate,
};
