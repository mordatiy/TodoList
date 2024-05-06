import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>("")

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        editMode
            ? <TextField value={title}
                         size="small"
                     onBlur={activateViewMode}
                     onChange={onChangeTitleHandler}
                     autoFocus={true} />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}