import React from "react";
import { useEditorDispatch } from "./editorContext";
import { JSONArray, JSONPath, JSONPropertyValue } from "../hooks/editorTypes";

interface IArrayEditorProps {
  path: JSONPath
  content:JSONArray
}

export default function EditorList({path,content}:IArrayEditorProps) {
    const editorDispatch = useEditorDispatch();
    return (
      <ul>
        {content.map((element,index) => (
          <li key={`array-${index}`}>

          </li>
        ))}
      </ul>
    );
  }