import isLeet from './isLeet';

describe('isLeet', () => {
  beforeAll(() => {});

  it('Detects LEET at 13:37:000', () => {
    const leet = new Date(new Date().setHours(13, 37, 0, 0));
    expect(isLeet(leet)).toEqual(true);
  });
});
