import { isDataNotFound } from './data';

describe('isDataNotFound()', () => {
  it('Should throw an error if an empty array is passed as a argument', () => {
    const emptyArray = [];
    const dataLenghtFn = () => {
      isDataNotFound(emptyArray);
    };
    expect(dataLenghtFn).toThrow();
  });
  it('Should not throw an error if the given argument is not empty', () => {
    const notEmptyArray = ['test'];
    const dataLenghtFn = () => {
      isDataNotFound(notEmptyArray);
    };
    expect(dataLenghtFn).not.toThrow();
  });
});
