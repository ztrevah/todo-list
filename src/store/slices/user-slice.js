import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as taskService from "../../services/task";
import * as authService from "../../services/auth";

const initialUserState = {
    data: null,
    status: 'idle',
}

export const fetchUser = createAsyncThunk("user/fetchUser",
    async () => {
        const user = await authService.getCurrentUser();
        if(!user) {
            return null;
        }

        const tasks = await taskService.getAllTasks();
        return {
            ...user,
            tasks,
        };
    },
    {
        condition(arg, thunkApi) {
            const status = thunkApi.getState().user.status;
            if (status !== 'idle') return false;
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        addTaskState: (state, action) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    tasks: (state?.data?.tasks) ? state?.data?.tasks?.concat(action.payload.task) : [action.payload.task],
                }
            }
        },
        updateTaskState: (state, action) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    tasks: state?.data?.tasks?.map(task => {
                        if(task.id === action.payload.task.id) return action.payload.task;
                        return task;
                    }),
                }
            }
        },
        deleteTaskState: (state, action) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    tasks: state?.data?.tasks?.filter(task => task.id !== action.payload.task.id),
                },
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                return {
                    ...state,
                    status: 'pending',
                };
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                return {
                    data: action.payload,
                    status: 'succeeded',
                };
            })
            .addCase(fetchUser.rejected, (state, action) => {
                return {
                    data: null,
                    status: 'failed',
                };
            })
    }
});

export default userSlice.reducer;

export const { setUser, addTaskState, updateTaskState, deleteTaskState } = userSlice.actions;
