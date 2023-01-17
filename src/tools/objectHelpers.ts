import _ from "lodash";
import { arrayReorder } from "./arrayHelpers";

export const setObjectKey = (oldKey:any, newKey:any) => (obj:any) => {
  return _.reduce(
    obj,
    (result:any, value, key) => {
      result[key === oldKey ? newKey : key] = value;
      return result;
    },
    {}
  );
};

export const objectReorder = (direction:any, key:string) => (object:any) => {
  const keys = Object.keys(object);
  const oldIndex = keys.indexOf(key);
  const newKeys = arrayReorder(direction, oldIndex)(keys);
  return newKeys.reduce((result:any, key:string) => {
    result[key] = object[key];
    return result;
  }, {});
};
