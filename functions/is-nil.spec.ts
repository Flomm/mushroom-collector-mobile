import { isNil } from './is-nil';

describe('isNil util function', () => {
  it('should return true if the input is null', () => {
    const result = isNil(null);
    expect(result).toBe(true);
  });

  it('should return true if the input is undefined', () => {
    const result = isNil(undefined);
    expect(result).toBe(true);
  });

  it('should return true if the input is truthy', () => {
    const result = isNil({});
    expect(result).toBe(false);
  });

  it('should return true if the input is false', () => {
    const result = isNil(false);
    expect(result).toBe(false);
  });

  it('should return true if the input is empty string', () => {
    const result = isNil('');
    expect(result).toBe(false);
  });
});
