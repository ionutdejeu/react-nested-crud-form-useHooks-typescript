
import React from "react";
import { DropdownButton, Dropdown,DropdownProps } from "react-bootstrap";

const convertTypeToShortForm = (type:string)=>{
  if (type === 'number') {
    return "#"
  }
  if (type === 'string') {
    return "str"
  }
  if (type === 'boolean') {
    return "bool"
  }
  if (type === 'null') {
    return null;
  }
  if (type === 'object') {
    return "obj"
  }
  if (type === 'array') {
    return "arr";
  }
}
const JsonFieldFieldTypeItem = ({ type, onChange }:any) => {
  return <Dropdown.Item onClick={() => onChange(type)}>{convertTypeToShortForm(type)}</Dropdown.Item>;
};

export const JsonFieldType = ({ type, onChange }:any) => {
  return (
    <div className="EditorFieldType__container">
      <DropdownButton title={convertTypeToShortForm(type)}>
        <JsonFieldFieldTypeItem type="string" onChange={onChange} />
        <JsonFieldFieldTypeItem type="number" onChange={onChange} />
        <JsonFieldFieldTypeItem type="boolean" onChange={onChange} />
        <JsonFieldFieldTypeItem type="null" onChange={onChange} />
        <JsonFieldFieldTypeItem type="object" onChange={onChange} />
        <JsonFieldFieldTypeItem type="array" onChange={onChange} />
      </DropdownButton>
    </div>
  );
};