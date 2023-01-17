import React, { useEffect, useRef, useState, useCallback, MutableRefObject } from "react";
import { castType, getTypeByContentString, getValueType } from "../tools/helpers";

export const useEditIndex = (originalValue: string, onChange: any): [
    string,
    (e: any) => void,
    () => void,
    (e: any) => void,
    MutableRefObject<null>,
    number | null,
    string
] => {
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

    return [
        editing ? localValue : originalValue,
        handleChange,
        handleBlur,
        handleKeyPress,
        fakeInputRef,
        width,
        determinedType
    ];
};
