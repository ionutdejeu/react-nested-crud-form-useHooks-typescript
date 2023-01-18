
import _ from 'lodash';
import { castType, getValueType } from '../tools/helpers';
import FieldSpacer from './fieldSpacer';
import { EditableValue } from './editableValue';
import { EditableKey } from './editableKey';
import { JsonFieldOptions } from './fieldOptions';

interface EditableKeyValueProps {
    index:string
    value:any
    path:any[]
    parentType:string|null
    onChange:Function
    onRemove:Function
    onAdd:Function
    onIndexChange:Function
    onMove:Function
  } 
export const EditableKeyValueField = ({ 
    index,
    value, 
    path,
    parentType,
    onChange,
    onRemove,
    onAdd,
    onIndexChange,
    onMove }:EditableKeyValueProps) => {
    
    const objectType = getValueType(value)
    const handleTypeChange = (newObjectType:any) => {
      onChange(path, castType(value, newObjectType));
    };
    const handlerValueChange = (newInputValue:string) => {
      console.log("Debounce edit")
      onChange(path, castType(newInputValue, objectType));
    };
    const handleRemove = () => {
      onRemove(path);
    }
    const handleAdd = () => onAdd(path);
    const handleChangeIndex = (newIndex:number) => onIndexChange(path, newIndex);
    const handleMoveUp = () => onMove(path, -1);
    const handleMoveDown = () => onMove(path, 1);
  
    return (
      <div className="primitive-viewer">
        <FieldSpacer level={path.length} />
        <span className="primitive-viewer__label">
          <EditableKey
            parentValueType={parentType}
            index={index}
            onChange={handleChangeIndex}
          /> 
        </span>
        <span className="primitive-viewer__value">
          <EditableValue
            value={value}
            onChange={handlerValueChange}
          />
        </span>
        <JsonFieldOptions 
            canAddChild={true}
            canRemoveElement={true}
            valueType={objectType}
            handleTypeChange = {handleTypeChange}
            handleAdd = {handleAdd}
            handleRemove = {handleRemove}
            handleMoveUp = {handleMoveUp}
            handleMoveDown = {handleMoveDown}/>
      </div>
    )
  };