import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodos } from '../../types/ITodos';
import { handleCompleted } from '../../ultils/handlePriority';
import { act } from 'react';
export type StateTodos = {
    todos: ITodos[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    statistics: {
        totalTodos: number;
        overdue: number;
        completedTodos: number;
        noCompletedTodos: number;
    };
    todo: ITodos | null;
};
const initialState: StateTodos = {
    todos: [],
    meta: {
        total: 0,
        page: 0,
        limit: 0,
        totalPages: 0,
    },
    statistics: {
        totalTodos: 0,
        overdue: 0,
        completedTodos: 0,
        noCompletedTodos: 0,
    },
    todo: null,
};
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getAllTodos: (state, action: PayloadAction<ITodos[]>) => {
            state.todos = action.payload;
        },
        addTodos: (state, action: PayloadAction<ITodos>) => {
            state.todos.push(action.payload);
        },
        detailTodo: (state, action: PayloadAction<ITodos>) => {
            console.log(action.payload);
            state.todo = action.payload;
        },
        updateTodos(state, action: PayloadAction<ITodos>) {
            state.todos = state.todos.map((todos) => (todos._id === action.payload._id ? action.payload : todos));
        },
        removeTodos(state, action: PayloadAction<ITodos>) {
            state.todos = state.todos.filter((todos) => todos._id !== action.payload._id);
        },

        getPagiNation: (state, action) => {
            state.meta = action.payload;
        },
        getStatistics: (state) => {
            
            const completedTodos = state.todos.filter((item) => handleCompleted(item) === 'Hoàn thành').length;

            const noCompletedTodos = state.todos.filter((item) => handleCompleted(item) === 'Chưa hoàn thành ').length;

            const overdue = state.todos.filter((item) => handleCompleted(item) === 'Quá Hạn').length;

            state.statistics = {
                totalTodos: state.todos.length,
                completedTodos,
                noCompletedTodos,
                overdue,
            };
        },
    },
});
export const { getAllTodos, getPagiNation, addTodos, detailTodo, updateTodos, removeTodos, getStatistics } =
    todosSlice.actions;
export const todosReducer = todosSlice.reducer;
