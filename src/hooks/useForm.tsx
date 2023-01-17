import { useState } from 'react';
import { JSONArray, JSONObject } from './editorTypes';

export const useObjectForm = (initialValue:JSONObject) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setValue((values:any) => ({
      ...values,
      [name]: value
    }));
  };

  const reset = () => {
    setValue({});
  };

  return [value, handleChange, reset];
};
export const useArrayForm = (initialValue:JSONArray) => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setValue((values:any) => ({
        ...values,
        [name]: value
      }));
    };
  
    const reset = () => {
      setValue([]);
    };
  
    return [value, handleChange, reset];
  };