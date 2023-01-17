import _ from 'lodash'
export const getType = (value:any) => (Array.isArray(value) ? "array" : typeof value);
export const buildPath = (path:string, name:string, type:string) => {
  if (path.length === 0) return `[${name}]`;

  switch (type) {
    case "array":
      return `${path}[${name}]`;
    default:
      return `${path}.[${name}]`;
  }
};

export const getValueType = (value:any) => {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (_.isPlainObject(value)) {
    return 'object';
  }
  if (value === null) {
    return 'null';
  }
  return typeof value;
};

export const getTypeByContentString = (value:string) => {
  if (value === null){
    return "null";
  }
  if (value.startsWith('[')) {
    return 'array';
  }
  if (value.startsWith('{')) {
    return 'object';
  }
  if (value == "null") {
    return 'null';
  }
  if (value == "true" || value == "false") {
    return 'boolean';
  }
  return "string"
};


 
export const isComplexObject = (type:string)=>{
  return type === 'object' || type === 'array';
}

export const getOpenCharacterForType = (type:string):string => { 
  if (type === 'object') {
    return "{"
  }
  if (type === 'array') {
    return "["
  }
  return ""
}

export const getClosingCharacterForType  = (type:string,isLastElement:boolean):string => { 
  if (type === 'object') {
    return "}"
  }
  if (type === 'array') {
    return "]"
  }
  return ''
}

export const castType = (value:any, type:string) => {
  if (type === 'number') {
    return (
      Number(value && value.replace ? value.replace(',', '.') : value) || 0
    );
  }
  if (type === 'string') {
    return `${value}`;
  }
  if (type === 'boolean') {
    return !!value;
  }
  if (type === 'null') {
    return null;
  }
  if (type === 'object') {
    return { oldValue: value };
  }
  if (type === 'array') {
    return [value];
  }

  return value;
};

// Returns color based on value's type of either string, number, or boolean
const getColorForValue = (value: any) => {
  const type = inferTypeFromString(value)
  let color = '#ce824a'
  switch (type) {
    case 'string':
      break
    case 'number':
      color = '#b5cea8'
      break
    case 'boolean':
      color = '#358cd6'
      break
    default:
      break
  }
  return color
}

// Returns typeof given value based on its type or inferred type from if string
const inferTypeFromString = (value: any) => {
  if (value === 'true' || value === 'false' || typeof value === 'boolean')
    return 'boolean'
  else if (!isNaN(value) || typeof value === 'number') return 'number'
  else return 'string'
}