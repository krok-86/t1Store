import { describe, it, expect } from 'vitest';
import { makeDiscountedPrice } from './index';

describe('makeDiscountedPrice', () => {
  it('should apply a discount correctly and format to two decimal places', () => {
    expect(makeDiscountedPrice(100, 20)).toBe('80.00');
    expect(makeDiscountedPrice(150, 50)).toBe('75.00');
    expect(makeDiscountedPrice(200, 0)).toBe('200.00');
    expect(makeDiscountedPrice(200, 100)).toBe('0.00');
  });

  it('should handle negative discount percentages by returning the original price', () => {
    expect(makeDiscountedPrice(100, -10)).toBe('110.00');
  });

  it('should handle discount percentages over 100 as resulting in a negative price', () => {
    expect(makeDiscountedPrice(100, 150)).toBe('-50.00');
  });
});