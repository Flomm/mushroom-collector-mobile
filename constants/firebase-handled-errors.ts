const handledFireBaseErrors = [
  'auth/invalid-email',
  'auth/invalid-credential',
  'auth/email-already-in-use',
  'email_not_verified'
] as const;

export default handledFireBaseErrors;
