import React, { useEffect, useRef, useState, useCallback, MutableRefObject, PropsWithChildren, ReactNode } from "react";
import { JsonFieldOptions } from "./fieldOptions";

import _ from 'lodash';
import SeparatorViewer from "./fieldSpacer";
import { FieldBracketWrapper, JsonFieldWrapperClose, JsonFieldWrapperOpen } from './fieldBracketsWrapper'
import { EditableKey } from "./editableKey";

interface JsonFieldProps extends PropsWithChildren {
  index: string,
  expanded: boolean,
  type: string
  path: any[]
  level: number,
  onChange: Function,
  onRemove: Function,
  onAdd: Function
  onIndexChange: Function
  onMove: Function,
  children: ReactNode[]
}

export const JsonField = (
  {
    index,
    expanded,
    type,
    path,
    onChange,
    onRemove,
    onAdd,
    onIndexChange,
    onMove,
    children
  }: JsonFieldProps) => {
  const handleTypeChange = (type: any) => {
    console.log("Need to update the method for changing types")
  };

  const handleRemove = () => {
    onRemove(path);
  }
  const handleAdd = () => onAdd(path);
  const handleChangeIndex = (newIndex: number) => onIndexChange(path, newIndex);
  const handleMoveUp = () => onMove(path, -1);
  const handleMoveDown = () => onMove(path, 1);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const classname = `${type}-viewer ${isExpanded ? "expanded" : ""}`;
  const childrenClassname = `${type}-viewer__children ${type}-viewer-${isExpanded ? "expanded" : "collapsed"}__children`;
  const labelClassName = `${type}-viewer__label`
  useEffect(() => setIsExpanded(expanded), [expanded]);
  return (
    <>
      <div className={classname}>
        <SeparatorViewer level={path.length} />
        <div className={labelClassName}>
          <span className="object-viewer_exapnder" onClick={() => setIsExpanded(!isExpanded)}></span>
          <span className="primitive-viewer__label">
            <EditableKey
              parentValueType={"object"}
              index={index}
              onChange={handleChangeIndex}
            /> 
          </span>
          <span onClick={() => setIsExpanded(!isExpanded)}>
            <JsonFieldWrapperOpen type={type} isLastElement={false}/>
            {!isExpanded && ( <JsonFieldWrapperClose type={type} isLastElement={false}/>)}
          </span>
        </div>
        <JsonFieldOptions
          canAddChild={true}
          canRemoveElement={true}
          valueType={type}
          handleTypeChange={handleTypeChange}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown} />
      </div>
      {isExpanded && (<div className={childrenClassname}>
        {children}
      </div>)}
      
      <div className="primitive-viewer">
        <SeparatorViewer level={path.length} />
        <JsonFieldWrapperClose type={type} isLastElement={false}/>
      </div>
    </>
  );
}