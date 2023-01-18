import _ from 'lodash';
import { Container, FormControl, FormCheck } from "react-bootstrap";
import { useEditHook } from "../hooks/useEdit";

export interface EditableValueProps {
    value: string,
    onChange: Function
}
export const EditableValue = ({ value, onChange }: EditableValueProps) => {
    const {
        currentValue,
        handleFieldValueChanged,
        handleFieldBlur,
        handleKeyPress,
        fakeInputElementRef,
        elementWidth,
        determinedContentType
    } = useEditHook(value, onChange);
    let inputClass = "EditorField__input EditorField__value EditorField__fakeInput"
    inputClass = inputClass + " .EditorField_" + determinedContentType
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
    )
}