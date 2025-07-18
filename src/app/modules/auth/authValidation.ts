import { z } from 'zod';

export const userRoleEnum = z.enum(['Admin', 'Trainer', 'Trainee']);

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .nonempty('Name is required')
      .trim(),

    email: z
      .string({ required_error: 'Email is Required' })
      .nonempty('Email is required')
      .email('Invalid email format')
      .trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim(),
    role: userRoleEnum.default('Admin'),
  }),
});

const updatedTrainerValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .nonempty('Name is required')
      .trim()
      .optional(),

    email: z
      .string({ required_error: 'Email is Required' })
      .nonempty('Email is required')
      .email('Invalid email format')
      .trim()
      .optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .trim()
      .optional(),
    role: userRoleEnum.default('Trainer').optional(),
  }),
});

const loginValidationschema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const authValidation = {
  registerUserValidationSchema,
  loginValidationschema,
  updatedTrainerValidationSchema,
};
