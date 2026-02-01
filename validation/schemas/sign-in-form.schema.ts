import * as z from 'zod/mini';

export const SignInFormSchema = z.object({
  email: z.string().check(z.minLength(1, { message: 'required' })),
  password: z.string().check(z.minLength(1, { message: 'required' }))
});
