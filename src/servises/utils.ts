export const range = (min: number, max: number): number[] => [...Array(max).keys()].map((el) => el + min);
