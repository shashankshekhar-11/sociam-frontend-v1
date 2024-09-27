import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './slices/authSlice';
import {postReducer} from "./slices/postSlice";
import {userReducer} from './slices/userSlice';
import { modalReducer } from "./slices/modalSlice";
import {commentReducer} from './slices/commentSlice';

export const store = configureStore({
//redux store with persisted reducer and middleware
    reducer: {
        auth: authReducer,
        posts: postReducer,
        users: userReducer,
        modal: modalReducer,
        comments: commentReducer
    }
});