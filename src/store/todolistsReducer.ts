import {FilterValuesType, TodoListsType} from "../App"
import {v1} from "uuid";

export type removeTodo = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type addTodo = {
    type: 'ADD-TODOLIST'
    title: string
}
export type changeTodo = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type changeTodoFilter = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionType = removeTodo | addTodo | changeTodo | changeTodoFilter


export const todolistsReducer = (state: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoId = v1()
            let newTodo: TodoListsType = {id: newTodoId, title: action.title, filter: 'all'}
            return [...state, newTodo]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)

        default:
            throw new Error("I dont understand")
    }
}

export const removeTodoAC = (id: string): removeTodo => {
    return {type: "REMOVE-TODOLIST", id: id}
}
export const addTodoAC = (title: string): addTodo => {
    return {type: "ADD-TODOLIST", title: title}
}
export const changeTodoAC = (id: string, title: string): changeTodo => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeTodoFilterAC = (id: string, filter: FilterValuesType): changeTodoFilter => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}