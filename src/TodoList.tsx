import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./componets/AddItemForm";
import {EditableSpan} from "./componets/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTasks: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistID: string) => void
    changeTodoTitle: ( newTitleTodo: string, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void

}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.todolistID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistID);
    const RemoveTodo = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTask = (title: string) => {
        props.addTasks(title, props.todolistID)
    }
    const onChangeTodoTitleHandler=(newValue: string)=>{
        props.changeTodoTitle(newValue,props.todolistID)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTodoTitleHandler}/>
            <button onClick={RemoveTodo}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.todolistID)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
