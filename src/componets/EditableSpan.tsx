import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [EditMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setValue(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(value)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (EditMode
            ? <input value={value} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>

    );
};

