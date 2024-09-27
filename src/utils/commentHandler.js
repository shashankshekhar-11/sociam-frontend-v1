import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getCommentsOfPost = createAsyncThunk('comment/getCommentOfPost',
    async (postId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`https://sociam-backend-v1.onrender.com/api/v1/posts/${postId}`);
            // console.log("res.data");
            // console.log(res.data);
            // console.log("res.data");
            // console.log(res.data);
            // console.log("res.data.post.comments");
            // console.log(res.data.post.comments);
            return res.data.post.comments;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);
        }
})

const addNewCommentToPost = createAsyncThunk("comment/addNewComment",
    async (commentMetaData, { getState, rejectWithValue }) => {
        try {
            const { postId, comment } = commentMetaData;
            const { authToken } = getState().auth;
            const res = await axios.post(`https://sociam-backend-v1.onrender.com/api/v1/comments/create/${postId}`, {commentData: comment}, { headers: { Authorization: `Bearer ${authToken}` ,'Content-Type': 'application/json' } });
            return res.data.data.comment;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);
        }
    })

const deleteComment = createAsyncThunk('comment/deleteComment',
    async (commentMetaData, { getState, rejectWithValue }) => {
        try {
            const { postId, commentId } = commentMetaData;
            const { authToken } = getState().auth;
            const res = await axios.post(`https://sociam-backend-v1.onrender.com/api/v1/comments/destroy/${postId}/${commentId}`, {}, { headers: { Authorization: `Bearer ${authToken}` } });
            return res.data
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);
        }
    })

export {
    addNewCommentToPost,
    getCommentsOfPost,
    deleteComment
}