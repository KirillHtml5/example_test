import React, {useState} from 'react';
import './App.css';
import {ObjectTypeArray, TodoList} from "./TodoList";
import {v1} from "uuid";

export type filteredTasksType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: filteredTasksType
}
type TasksType = {
    [key: string]: Array<ObjectTypeArray>
}

function App() {
    let todolist_1 = v1()
    let todolist_2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolist_1, title: "What to learn", filter: 'all'},
        {id: todolist_2, title: "What to buy", filter: 'active'}

    ])
    let [tasks, setTasks] = useState<TasksType>({
            [todolist_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Hello world", isDone: true},
                {id: v1(), title: "I am Happy", isDone: false},
                {id: v1(), title: "Yo", isDone: false}
            ],
            [todolist_2]: [
                {id: v1(), title: "Sugar", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Sweets", isDone: false}

            ]
        }
    )
    const removeTask = (todoId: string, tId: string) => {
        let todolistTasks = tasks[todoId]                       // достаём нужный массив по todoID
        tasks[todoId] = todolistTasks.filter(t => t.id != tId)   // перезапишем в этом объекте массив для нужного тудулиста отфильтр массивом
        setTasks({...tasks})                            // засетем в стейт копию объекта, что реакт отреагировал перерисовкой

    }


    const chancheFilter = (todoId: string, value: filteredTasksType) => {
        let todolist = todolists.find(t => t.id === todoId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }


    }
    const addTask = (todoId: string, title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todoId]
        tasks[todoId] = [task, ...todolistTasks]
        setTasks({...tasks})

    }
    const changeStatus = (todoId: string, id: string, isDone: boolean) => {
        let todolistTasks = tasks[todoId]
        console.log(todolistTasks)
        let task = todolistTasks.find(t => t.id === id)
        console.log(task)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const removeTodoList = (id: string) => {
        setTodolists(todolists.filter(t => t.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let allTodoTasks = tasks[el.id]
                let filteredTasks = allTodoTasks

                if (el.filter === 'active') {
                    filteredTasks = allTodoTasks.filter(t => t.isDone === false)
                }
                if (el.filter === 'completed') {
                    filteredTasks = allTodoTasks.filter(t => t.isDone === true)
                }
                return (
                    <TodoList
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        chancheFilter={chancheFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}


        </div>
    );
}

export default App;
