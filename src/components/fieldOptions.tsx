import React, { useCallback } from "react";
import "./copy-json-viewer.css";
import _ from 'lodash';
import {
  MdClear,
  MdAdd,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdArrowRight
} from 'react-icons/md';
import './field-details-component.css'
import { JsonFieldType } from "./fieldType";


const EditorRemove = ({ onClick }:any) => {
  return (
    <div className="EditorRemove__container" onClick={onClick}>
      <MdClear className="EditorRemove__icon" />
    </div>
  );
};

const EditorAdd = ({ onClick }:any) => {
  return (
    <div className="EditorAdd__container" onClick={onClick}>
      <MdAdd className="EditorAdd__icon" />
    </div>
  );
};

const EditorArrows = ({ onMoveUp, onMoveDown }:any) => {
  return (
    <div className="EditorArrows__container">
      <MdKeyboardArrowUp className="EditorArrows__arrow" onClick={onMoveUp} />
      <MdKeyboardArrowDown
        className="EditorArrows__arrow"
        onClick={onMoveDown}
      />
    </div>
  );
};

interface FieldOptionsProperties {
  canAddChild:boolean
  canRemoveElement:boolean
  valueType:string
  handleTypeChange:Function
  handleAdd:Function
  handleRemove:Function
  handleMoveUp:Function
  handleMoveDown:Function
}
export const JsonFieldOptions = ({
  canAddChild,
  canRemoveElement,
  valueType,
  handleTypeChange,
  handleAdd,
  handleRemove,
  handleMoveUp,
  handleMoveDown
}:FieldOptionsProperties) => {
 

  return (
    <div className="copy-json-viewer">
      {canRemoveElement && <EditorRemove onClick={handleRemove} />}
        <EditorArrows onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} />
        <JsonFieldType type={valueType} onChange={handleTypeChange} />
        {canAddChild && <EditorAdd onClick={handleAdd} />}
    </div>
  );
};

