import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import toastStyle from "./toastStyle";

const getAllPosts = createAsyncThunk("posts/getAllPosts",
async ()=>{
    try{
        const res = await axios.get('http://localhost:8000/api/v1/posts/');
        // console.log(res.data);
        return res.data;
    }catch(err){
        console.log(err);
    }
});

const getCurrentPost = createAsyncThunk('posts/getSinglePost',
async(postId, {rejectWithValue})=>{
    try{
        const res = await axios.get(`http://localhost:8000/api/v1/posts/${postId}`);
        return res.data;
    }catch(err){
        console.log(err);
        return rejectWithValue(err);
    }
})

const addNewPost = createAsyncThunk("posts/addNewPost",
async(postData, {getState, rejectWithValue})=>{
    try{
        const {authToken} = getState().auth;
        // console.log(authToken);
        const res = await axios.post('http://localhost:8000/api/v1/posts/create',postData,{headers: 
        // {authorization: authToken}
        {
            Authorization: `Bearer ${authToken}`
        }   
    });
        // console.log(res.data);
        return res.data;
    }catch(err){
        console.log(err);
        // return rejectWithValue(err);
        return rejectWithValue({
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
        });
    }
})

const likeOrDislikePost = createAsyncThunk(
    "posts/likeOrDislikePost",
    async (postData, { getState, rejectWithValue }) => {
      try {
        const { authToken } = getState().auth;
        const res = await axios.get(
          `http://localhost:8000/api/v1/likes/toggle/?id=${postData._id}&type=Post`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        return res.data;
      } catch (err) {
        console.log("Error in likeOrDislikePost:", err.response ? err.response.data : err.message);
        return rejectWithValue(err);
      }
    }
);

const bookmarkHandler = createAsyncThunk(
    "post/bookmarkHandler",
    async (postData, { getState, rejectWithValue }) => {
      try {
        const { authToken } = getState().auth;
        const res = await axios.post(
          "http://localhost:8000/api/v1/bookmarks/toggle-bookmark",
          { postId: postData._id },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("Bookmark Handler Response:", res.data);
        // console.log(res.data);
        return res.data;
      } catch (err) {
        console.log("Error in bookmarkHandler:", err.response ? err.response.data : err.message);
        return rejectWithValue(err);
      }
    }
);

const editPost = createAsyncThunk("post/editPost",
async(postData, {getState, rejectWithValue})=>{
    try{
        const {authToken} = getState().auth;
        const res = await axios.post("http://localhost:8000/api/v1/posts/edit",
          postData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
        toast.success("Post updated successfully", { style: toastStyle });
        return res.data;
    } catch(err){
        console.log(err);
        return rejectWithValue(err);
    }
})

const deletePost = createAsyncThunk("post/deletePost",
async(postData, {getState, rejectWithValue})=>{
    try{
        // console.log(postData);
        const {authToken} = getState().auth;
        // console.log(authToken);
        const res = await axios.delete(`http://localhost:8000/api/v1/posts/destroy/${postData._id}`, {headers: {authorization:`Bearer ${authToken}`}});
        // console.log(res.data);
        return res.data;
    }catch(err){
        console.log(err);
        return rejectWithValue(err);
    }
})


export {
    getAllPosts,
    getCurrentPost,
    addNewPost,
    likeOrDislikePost,
    bookmarkHandler,
    deletePost,
    editPost,
}