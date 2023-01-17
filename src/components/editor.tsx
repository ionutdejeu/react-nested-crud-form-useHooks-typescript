import { JSONObject, JSONPropertyKey } from "../hooks/editorTypes";
import { useDispatch, useSelector } from "react-redux";
import { addNew, JsonActionType, moveKey, removeKey, selectJsonObjectContent, setContent, setValue, updateKey } from "../state/jsonObjectSlice";
import { useCallback, useEffect, useState } from "react";
import { editorTreeBuilder } from "./editorTreeBlock";

export interface EditorProps {
    jsonContent: JSONObject,
    onChange: Function
}
export const Editor = ({ jsonContent, onChange }: EditorProps) => {

    const stateContentValue = useSelector(selectJsonObjectContent)
    const [display, setDisplay] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('state changed',jsonContent)
        let changeActionPayload: JsonActionType = {
            path: [],
            value: jsonContent
        }
        dispatch(setContent(changeActionPayload))
        console.log('jsonObjectContentSlice',stateContentValue)
    }, [jsonContent])
    const handleChange = useCallback(
        (path: JSONPropertyKey[], value: any) => {
            let changeActionPayload: JsonActionType = {
                path: path,
                value
            }
            console.log('setValue', changeActionPayload)
            dispatch(setValue(changeActionPayload))
            onChange(stateContentValue)

        },
        [dispatch],
    );
    const handleRemove = useCallback((path: any) => {
        let removeKeyActionPayload: JsonActionType = {
            path: path
        }
        console.log('handleRemove', removeKeyActionPayload)

        dispatch(removeKey(removeKeyActionPayload))
        onChange(stateContentValue)

    }, [dispatch]);
    const handleAdd = useCallback((path: any) => {
        let addNewActionPayload: JsonActionType = {
            path: path
        }
        console.log(addNewActionPayload)
        dispatch(addNew(addNewActionPayload))
    }, [dispatch]);
    const handleMove = useCallback(
        (path: any, direction: any) => {
            let moveKeyAction: JsonActionType = {
                path: path,
                direction: direction
            }
            console.log(moveKeyAction)
            dispatch(moveKey(moveKeyAction))
            onChange(stateContentValue)

        },
        [dispatch],
    );
    const handleIndexChange = useCallback(
        (path: any, newKey: any) => {
            let indexChangeActionPayload: JsonActionType = {
                path: path,
                newKey: newKey
            }
            console.log('handleIndexChange',indexChangeActionPayload)
            dispatch(updateKey(indexChangeActionPayload))
            onChange(stateContentValue)
        },
        [dispatch],
    );
    return (
        <>
            <div className="json-viewer">
                {
                    editorTreeBuilder(
                        stateContentValue,
                        display,
                        handleChange,
                        handleRemove,
                        handleAdd,
                        handleIndexChange,
                        handleMove)
                }
            </div>
        </>
    );
};
