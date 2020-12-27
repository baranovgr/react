import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    key: string
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTasksStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    let [error, setError] = useState<string | null>(null)

    let [title, setTitle] = useState("")
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
            setTitle("")
            setError("")
        } else {
            setError("Title is required")
            setTitle("")
        }
    }
    const onAllClickHAndler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHAndler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return <div>

        <h3>{props.title}
        </h3>
        <button onClick={removeTodolist}>x</button>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {<div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        console.log(e.currentTarget.checked)
                        props.changeTasksStatus(t.id, newIsDoneValue, props.id)
                    }

                    return <li className={t.isDone === true ? "is-done" : ""} key={t.id}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHAndler}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHAndler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
