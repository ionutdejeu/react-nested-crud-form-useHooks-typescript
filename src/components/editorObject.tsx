import React from "react";
import { useEditorDispatch } from "./editorContext";
import { JSONArray, JSONObject, JSONPath, JSONPropertyValue } from "../hooks/editorTypes";

interface IObjectEditorProps {
  path: JSONPath
  content:JSONObject
}

export default function EditorObject({path,content}:IObjectEditorProps) {
    return (
      <ul>
        {Object.entries(Object).map((element,index) => (
          <li key={`array-${index}`}>
            <div>
                {element}
            </div>
          </li>
        ))}
      </ul>
    );
  }