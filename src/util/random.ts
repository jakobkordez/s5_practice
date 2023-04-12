const m: number = Math.pow(2, 32);
const a: number = 214013;
const c: number = 2531011;

/**
 * Linear congruential generator
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 *
 * @param {number} seed seed value
 */
export default class Random {
  _seed: number;

  constructor(seed: number) {
    this._seed = seed;
  }

  /**
   * @returns {number} random number [0, 2^32 - 1]
   */
  nextInt(): number {
    this._seed = (this._seed * a + c) % m;
    return this._seed;
  }
}
