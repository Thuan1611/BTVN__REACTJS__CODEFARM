import { configureStore, Tuple } from '@reduxjs/toolkit';
import { todosReducer } from './features/todosSlice';
const store = configureStore({
    reducer: { todos: todosReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
