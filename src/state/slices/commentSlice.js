import { createSlice } from "@reduxjs/toolkit";
import { addNewCommentToPost, deleteComment, getCommentsOfPost } from "../../utils/commentHandler";

const initialState = {
    comments: [],
    commentStatus: "idle",
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch comments for a post
            .addCase(getCommentsOfPost.pending, (state) => {
                state.commentStatus = "loading";
            })
            .addCase(getCommentsOfPost.fulfilled, (state, action) => {
                // Assuming action.payload contains `comments` array
                // console.log("action");
                // console.log(action);
                // console.log("action.payload");
                // console.log(action.payload);
                const comments = [...action.payload];
                state.comments = comments;
                state.commentStatus = "success";
            })
            .addCase(getCommentsOfPost.rejected, (state) => {
                state.commentStatus = "failed";
            })

            // Add a new comment to a post
            .addCase(addNewCommentToPost.pending, (state) => {
                state.commentStatus = "loading";
            })
            .addCase(addNewCommentToPost.fulfilled, (state, action) => {
                // action.payload contains the new comment returned from the API

                const newComment = action.payload; // This is the full comment object
                // console.log("action.payload");
                // console.log(action.payload);
                // Append the new comment to the comments array
                state.comments = [...state.comments, newComment]; // OR state.comments.push(newComment);
                // console.log("state.comments");
                // console.log(state.comments);
                state.commentStatus = "success";
            })
            .addCase(addNewCommentToPost.rejected, (state) => {
                state.commentStatus = "failed";
            })

            // Delete a comment from a post
            .addCase(deleteComment.pending, (state) => {
                state.commentStatus = "loading";
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                // Assuming action.payload contains the ID of the deleted comment
                const deletedCommentId = action.payload.comment_id;
                state.comments = state.comments.filter(comment => comment._id !== deletedCommentId);
                state.commentStatus = "success";
            })
            .addCase(deleteComment.rejected, (state) => {
                state.commentStatus = "failed";
            });
    },
});

export const commentReducer = commentSlice.reducer;
