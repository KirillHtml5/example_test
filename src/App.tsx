import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type filteredTasksType = 'all' | 'active' | 'completed'

function App() {
    let [tasks1, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Hello world", isDone: true},
        {id: v1(), title: "I am Happy", isDone: false},
        {id: v1(), title: "Yo", isDone: false}
    ])
    const removeTask = (tId: string) => {
        tasks1 = tasks1.filter(t => t.id !== tId)
        setTasks(tasks1)

    }
    const [filter, setFilter] = useState<filteredTasksType>('all')
    let filteredTasks = tasks1
    if (filter === 'active') {
        filteredTasks = tasks1.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        filteredTasks = tasks1.filter(t => t.isDone === true)
    }
    const chancheFilter = (value: filteredTasksType) => {
        setFilter(value)
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks1]
        setTasks(newTask)
    }
    const changeStatus = (id: string, isDone: boolean) => {
        let newTask = tasks1.find(t => t.id === id)
        if (newTask) {
            newTask.isDone = isDone
            setTasks([...tasks1])
        }

    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn-123456'}
                tasks={filteredTasks}
                removeTask={removeTask}
                chancheFilter={chancheFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />

        </div>
    );
}

export default App;
