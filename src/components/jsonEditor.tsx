import React, { useEffect, useState } from 'react';
import { Editor } from './editor';


export default function JsonEditorWrapper({ json }: any) {
  const [value, setValue] = useState<any>();
  useEffect(() => {
    console.log('useEffect', json)
    setValue(json)
  }, [])
  return (
    <div>
      <Editor jsonContent={{ ...value }} onChange={setValue} />
    </div>
  );
}