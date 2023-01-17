export type JSONPropertyKey = string | number 
export interface JSONObject {
    [x: JSONPropertyKey]: JSONPropertyValue;
}
export interface JSONArray extends Array<JSONPropertyValue> { }

export type JSONPropertyValue =  string | number | boolean | JSONObject | JSONArray | null ;
export type JSONPath =  Array<JSONPropertyKey>
