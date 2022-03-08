import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filteredTasksType} from "./App";

type TodoListType = {
    title: string,
    tasks: Array<ObjectTypeArray>
    removeTask: (tId: string) => void
    chancheFilter: (value: filteredTasksType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: filteredTasksType
}

type ObjectTypeArray = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onClickHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('ERROR')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onClickHandler()
        }
    }
    const onClickHandlerAll = () => {
        props.chancheFilter('all')
    }
    const onClickHandlerActive = () => {
        props.chancheFilter('active')
    }
    const onClickHandlerCompleted = () => {
        props.chancheFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={title} onChange={onChangeHandler} onKeyPress={onEnter}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickButton = () => {
                        props.removeTask(t.id)
                    }
                    const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDone)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <button onClick={onClickButton}>X</button>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeCheckbox}
                            />
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={onClickHandlerAll}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={onClickHandlerActive}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={onClickHandlerCompleted}>Completed
                </button>
            </div>
        </div>
    )
}