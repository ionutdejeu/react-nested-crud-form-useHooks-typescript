import { useEffect, useRef, useState, useCallback, MutableRefObject } from "react";
import { getTypeByContentString } from "../tools/helpers";

export interface useEdit {
    currentValue:string,
    handleFieldValueChanged:(e:any)=>void,
    handleFieldBlur:()=>void,
    handleKeyPress: (e: any) => void,
    fakeInputElementRef: MutableRefObject<null>,
    elementWidth:number | null,
    determinedContentType:string
}
export const useEditHook = (originalValue: string,onChange: Function): useEdit => {
    const fakeInputRef = useRef(null);
    const [width, setWidth] = useState<number | null>(null);
    const [localValue, setLocalValue] = useState<string|null>("");
    const editing = localValue && localValue !== originalValue;
    const determinedType = getTypeByContentString(localValue||"")

    const handleChange = useCallback((e: any) => {
        const newValue = e.target.value;
        console.log("handleChange", newValue)
        setLocalValue(newValue);
    }, []);

    const handleBlur = useCallback(() => {
        if (editing) {
            onChange(localValue);
            console.log("blur", localValue)
            setLocalValue(null);
        }
    }, [onChange, editing, localValue]);


    const handleKeyPress = useCallback(
        (e: any) => {
            console.log("handleKeyPress", localValue, onChange)
            if (e.key === 'Enter' && editing) {
                onChange(localValue);
                setLocalValue(null);
            }
        },
        [onChange, editing, localValue],
    );


    useEffect(() => {
        if (fakeInputRef != null && fakeInputRef.current) {
            let fakeInputObj = fakeInputRef.current as HTMLDivElement;
            setWidth(fakeInputObj.offsetWidth);
        }
    }, [localValue, fakeInputRef]);

    return {
        currentValue:editing ? localValue : originalValue,
        handleFieldValueChanged: handleChange,
        handleFieldBlur: handleBlur,
        handleKeyPress,
        fakeInputElementRef: fakeInputRef,
        elementWidth: width,
        determinedContentType:determinedType
    };
};
