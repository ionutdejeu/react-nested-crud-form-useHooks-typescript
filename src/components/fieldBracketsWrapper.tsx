import React, { memo } from "react";
import styled from "styled-components"
import { getClosingCharacterForType, getOpenCharacterForType } from "../tools/helpers";

export const FieldBracketWrapper = ({ value }: any) => {
  const summaryViewerClass = `counter-viewer`
  return (
    <div className={summaryViewerClass}>{value}</div>
  )
};


export interface JsonFieldWrapperOpenProps {
  type: string,
  isLastElement: boolean
}
export const JsonFieldWrapperOpen = ({ type, isLastElement }: JsonFieldWrapperOpenProps) => {
  return (
    <div>{getOpenCharacterForType(type)}</div>
  )
};
export const JsonFieldWrapperClose = ({ type, isLastElement }: JsonFieldWrapperOpenProps) => {
  return (
    <div style={{display:"inline"}}>{getClosingCharacterForType(type, isLastElement)}</div>
  )
};