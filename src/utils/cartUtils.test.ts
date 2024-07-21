import { describe, it, expect } from 'vitest';
import { countInCart } from './index';
import { IProductCart } from '../types/types';
describe('countInCart', () => {
  const items: IProductCart[] = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 5 },
    { id: 3, quantity: 0 },
  ];

  it('should return the correct quantity for an existing item ID', () => {
    expect(countInCart(items, 1)).toBe(2);
    expect(countInCart(items, 2)).toBe(5);
    expect(countInCart(items, 3)).toBe(0);
  });

  it('should return 0 for a non-existing item ID', () => {
    expect(countInCart(items, 4)).toBe(0);
  });

  it('should return 0 for an empty items array', () => {
    expect(countInCart([], 1)).toBe(0);
  });
});