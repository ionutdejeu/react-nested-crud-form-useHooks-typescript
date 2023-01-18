import _ from 'lodash';
import { Container, FormControl, FormCheck } from "react-bootstrap";
import { useEditHook } from "../hooks/useEdit";
 
export interface EditableKeyProps { 
  index?:string,
  parentValueType:string|null,
  onChange:Function
}
export const EditableKey = ({ index, parentValueType, onChange }:EditableKeyProps) => {
  const {
    currentValue,
    handleFieldValueChanged,
    handleFieldBlur,
    handleKeyPress,
    fakeInputElementRef,
    elementWidth,
    determinedContentType
   } = useEditHook(index||"", onChange);

  if (_.isNil(index)) {
    return null;
  }
  
  if (parentValueType === 'array') {
    return <div className="EditorField__index"></div>;
  }
   
  return (
    <div>
      <div
        ref={fakeInputElementRef}
        className="EditorField__input EditorField__index EditorField__fakeInput">
        {currentValue}
      </div>
      <FormControl
        style={{ width: elementWidth || 'auto' }}
        className="EditorField__input EditorField__index"
        value={currentValue}
        onChange={handleFieldValueChanged}
        onBlur={handleFieldBlur}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
