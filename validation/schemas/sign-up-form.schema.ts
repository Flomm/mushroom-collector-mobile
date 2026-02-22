import { ValidationConstants } from '@/constants/validation-constants';
import * as z from 'zod/mini';

export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .check(z.minLength(1, { message: 'required' }))
      .check(z.email({ message: 'email' })),
    password: z
      .string()
      .check(
        z.minLength(ValidationConstants.passwordMinLength, { message: 'min_length' }),
        z.regex(ValidationConstants.numericRegexp, { message: 'numeric_needed' }),
        z.regex(ValidationConstants.specialCharRegexp, { message: 'special_needed' }),
        z.regex(ValidationConstants.lowerAndUpperCaseRegexp, { message: 'lower_and_upper_case' })
      ),
    passwordConfirm: z.string().check(z.minLength(1, { message: 'required' }))
  })
  .check(z.custom(v => v.password === v.passwordConfirm, { message: 'password_mismatch', path: ['passwordConfirm'] }));
