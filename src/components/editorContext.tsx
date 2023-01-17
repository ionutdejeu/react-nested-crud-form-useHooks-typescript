import { createContext, Dispatch, useContext, useMemo, useReducer } from 'react';
import { JSONPath, JSONPropertyValue } from '../hooks/editorTypes';

export const EditorContext = createContext<JSONPropertyValue>(null);
export const EditorDispatchContext = createContext<Dispatch<IEditorAction>>(() => null);

interface IEditorPriderProps {
    children?: JSX.Element
}
export function EditorProvider({ children }: IEditorPriderProps) {
    const [tasks, dispatch] = useReducer(jsonReducer, initialTasks);

    return (
        <EditorContext.Provider value={tasks}>
            <EditorDispatchContext.Provider value={dispatch}>
                {children}
            </EditorDispatchContext.Provider>
        </EditorContext.Provider>
    );
}
interface IEditorAction {
    type: string,
    path: JSONPath
    payload: JSONPropertyValue
}
function jsonReducer(jsonContent: JSONPropertyValue, action: IEditorAction) {
    switch (action.type) {
        case 'added': {
            console.log('add')
            return jsonContent
        }
        case 'changed': {
            console.log('change', action)
            return jsonContent
        }
        case 'deleted': {
            console.log('delete')
            return jsonContent
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
];

export function useEditorContent() {
    return useContext(EditorContext);
}

export function useEditorDispatch() {
    return useContext(EditorDispatchContext);
}