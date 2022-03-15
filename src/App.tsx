import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./componets/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type  TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksObjectType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksObjectType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todolistID: string) {
        // let currentTaskArray = tasks[todolistID]
        // tasks[todolistID] = currentTaskArray.filter(t => t.id !== id);
        // setTasks({...tasks});
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    }

    function addTasks(title: string, todolistID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    function addTodoList(title: string) {
        let newTodoId = v1()
        let newTodo: TodoListsType = {id: newTodoId, title: title, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodoId]: []})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }

    function changeTitle(taskId: string, newTitle: string, todolistID: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        // setFilter(value);
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    function changeTodoTitle(newTitle: string, todolistID: string) {
        // setFilter(value);
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>

            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTitle}
                        changeTodoTitle={changeTodoTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
