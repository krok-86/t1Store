import { describe, it, expect } from 'vitest';
import { formRatingArray } from './index';

describe('formRatingArray', () => {
  it('should return all yellow stars for a perfect rating of 5', () => {
    const result = formRatingArray(5);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
    ]);
  });

  it('should return four yellow stars and one gray star for a rating of 4.5', () => {
    const result = formRatingArray(4.5);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
    ]);
  });

  it('should return four yellow stars and one gray star for a rating of 4', () => {
    const result = formRatingArray(4);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });

  it('should return three yellow stars and two gray stars for a rating of 3.5', () => {
    const result = formRatingArray(3.5);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });

  it('should return three yellow stars and two gray stars for a rating of 3', () => {
    const result = formRatingArray(3);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });

  it('should return two yellow stars and three gray stars for a rating of 2.5', () => {
    const result = formRatingArray(2.5);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });

  it('should return two yellow stars and three gray stars for a rating of 2', () => {
    const result = formRatingArray(2);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });

  it('should return one yellow star and four gray stars for a rating of 1.5', () => {
    const result = formRatingArray(1.5);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/yellowStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });

  it('should return one yellow star and four gray stars for a rating of 1', () => {
    const result = formRatingArray(1);
    expect(result).toEqual([
      '/pictures/yellowStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });

  it('should return no yellow stars for a rating of 0', () => {
    const result = formRatingArray(0);
    expect(result).toEqual([
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
      '/pictures/grayStar.svg',
    ]);
  });
});