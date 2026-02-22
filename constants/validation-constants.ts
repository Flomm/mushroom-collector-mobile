export const ValidationConstants = {
  passwordMinLength: 8,
  numericRegexp: new RegExp('.*[0-9].*'),
  specialCharRegexp: new RegExp('[^\\w\\s]'),
  lowerAndUpperCaseRegexp: new RegExp('^(?=.*[a-z])(?=.*[A-Z]).+$')
} as const;
