
import React, { useState, Fragment, useCallback, PropsWithChildren, ReactElement, useEffect, ReactNode } from "react";
import { getType } from "../tools/helpers";
import { JSONArray, JSONObject, JSONPath, JSONPropertyValue } from "../hooks/editorTypes";
import { JsonField } from "./jsonField";
import { EditableKeyValueField } from "./editableKeyValue";


export const editorTreeBuilder = (
  value: any,
  display: any,
  onChange: Function,
  onRemove: Function,
  onAdd: Function,
  onIndexChange: Function,
  onMove: Function,
) => {
  //highlight component used for higlighting searched text
  const buildJsonTree = (
    value: JSONPropertyValue,
    name: string | undefined,
    path: JSONPath,
    level: number,
    onChange: Function,
    onRemove: Function,
    onAdd: Function,
    onIndexChange: Function,
    onMove: Function,
    parentValueType: string | null
  ) => {
    const type = getType(value);
    switch (type) {
      case "object":
        return (
          <JsonField
            index={name || ""}
            type={type}
            level={level}
            path={[...path]}
            expanded={display}
            onAdd={onAdd}
            onChange={onChange}
            onIndexChange={onIndexChange}
            onMove={onMove}
            onRemove={onRemove}
          >
            {Object.entries(value as JSONObject).map(([key, value]) => (
              <Fragment key={`${name}.${key}`}>
                {buildJsonTree(value,
                  key,
                  [...path, key],
                  level + 1,
                  onChange,
                  onRemove,
                  onAdd,
                  onIndexChange,
                  onMove,
                  type)}
              </Fragment>
            ))}
          </JsonField>
        );
      case "array":
        return (
          <JsonField
            index={name || ""}
            type={type}
            level={level}
            path={[...path]}
            expanded={display}

            onAdd={onAdd}
            onChange={onChange}
            onIndexChange={onIndexChange}
            onMove={onMove}
            onRemove={onRemove}
          >
            {(value as JSONArray).map((childValue, index) => (
              <Fragment key={`${name}.${index}`}>
                {buildJsonTree(childValue,
                  undefined,
                  [...path, index],
                  level + 1,
                  onChange,
                  onRemove,
                  onAdd,
                  onIndexChange,
                  onMove,
                  type)}
              </Fragment>
            ))}
          </JsonField>
        );
      default:
        return (
          <EditableKeyValueField
            index={name || ""}
            path={[...path]}
            onChange={onChange}
            parentType={parentValueType}
            onAdd={onAdd}
            onIndexChange={onIndexChange}
            onMove={onMove}
            onRemove={onRemove}
            value={value} />
        );

    }
  }
  return buildJsonTree(value, "", [], 0, onChange, onRemove, onAdd, onIndexChange, onMove, null);
}