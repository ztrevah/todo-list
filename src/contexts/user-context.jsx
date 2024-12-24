import { createContext, useEffect, useReducer, useState } from "react";
import * as taskService from "../services/task";
import * as authService from "../services/auth";

const initialUserState = null;

const userReducer = (state, action) => {
    switch(action.type) {
        case "setUser": 
            return action.payload;
        case "addTask":
            return {
                ...state,
                tasks: (state?.tasks) ? state.tasks.concat([action.payload.task]) : [].concat([action.payload.task]),
            };
        case "updateTask":
            return {
                ...state,
                tasks: (state?.tasks?.map(task => {
                    if(task.id === action.payload.task.id) return action.payload.task;
                    return task;
                })),
            };
        case "deleteTask":
            return {
                ...state,
                tasks: (state?.tasks?.filter(task => {
                    return (task.id !== action.payload.task.id)
                })),
            };
        default:
            return state;
    }
}

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [currentUser, dispatch] = useReducer(userReducer, initialUserState);
    const [isFetching, setIsFetching] = useState(true);
    const setUser = (user) => {
        return dispatch({ type: "setUser", payload: user });
    }
    const addTask = (task) => {
        return dispatch({ type: "addTask", payload: { task }});
    }
    const updateTask = (task) => {
        return dispatch({ type: "updateTask", payload: { task }});
    }
    const deleteTask = (task) => {
        return dispatch({ type: "deleteTask", payload: { task }});
    }
    useEffect(() => {
        const init = async () => {
            const user = await authService.getCurrentUser();
            if(!user) {
                setUser(null);
            }
            else {
                const tasks = await taskService.getAllTasks();
                setUser({...user, tasks});
            }
            setIsFetching(false);
        }
        init();
    }, []);
    

    return (
        <UserContext.Provider 
            value={{ 
                currentUser, 
                setUser,
                setTasks: {
                    addTask, 
                    updateTask, 
                    deleteTask
                },
                isFetching,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}