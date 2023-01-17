import { splice } from "perfect-immutable";

export const move = (from:any, to:any) => (array:any[]) =>
  splice(splice(array, from, 1), to, 0, array[from]);

const getIndex = (index:number, array:any[]) => {
  if (index < 0) {
    return 0;
  }
  if (index > array.length - 1) {
    return array.length - 1;
  }

  return index;
};
export const arrayReorder = (direction:number, index:number) => (array:any[]) => {
  const from = index;
  const to = getIndex(from + direction, array);
  return move(from, to)(array);
};
