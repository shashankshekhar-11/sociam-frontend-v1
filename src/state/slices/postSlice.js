import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, addNewPost, getCurrentPost, likeOrDislikePost, deletePost, editPost } from "../../utils/postHandler";

const initialState = {
    postList: [],
    singlePost: null,
    postStatus: "idle",
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            // state.postList = action.payload;
            state.postList.push(action.payload.post);    
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getAllPosts.pending, (state) => {
            state.postStatus = "loading";
        })

        .addCase(getAllPosts.fulfilled, (state, action) => {
            const { posts } = action?.payload;
            state.postList = posts;
            state.postStatus = "success";
        })

        .addCase(getAllPosts.rejected, (state) => {
            state.postStatus = "failed";
        })

        .addCase(getCurrentPost.pending, (state) => {
            state.postStatus = "loading";
        })
        .addCase(getCurrentPost.fulfilled, (state, action) => {
            const { post } = action.payload;
            state.singlePost = post;
            state.postStatus = "success";
        })

        .addCase(getCurrentPost.rejected, (state) => {
            state.postStatus = "failed";
        })


        .addCase(addNewPost.fulfilled, (state, action) => {
            // const { posts } = action.payload;
            // state.postList = posts;
            state.postList.push(action.payload.post)
            state.postStatus = "success";
        })

        .addCase(addNewPost.rejected, (state) => {
            state.postStatus = "failed";
        })
        .addCase(likeOrDislikePost.pending, (state) => {
            state.postStatus = "loading";
        })

        .addCase(likeOrDislikePost.fulfilled, (state, action) => {
            const { _id: postId, user_id: userId, deleted } = action.payload.data;
        
            state.postList = state.postList.map(post => {
                if (post._id === postId) {
                    // If the post matches the one that was liked/disliked
                    const updatedLikes = deleted
                        ? post.likes.filter(id => id !== userId) // Remove like
                        : [...post.likes, userId]; // Add like
        
                    // Return a new post object to ensure immutability
                    return {
                        ...post,
                        likes: updatedLikes,
                    };
                }
                return post; // Unaffected posts remain unchanged
            });
        
            state.postStatus = "success";
        })

        .addCase(likeOrDislikePost.rejected, (state) => {
            state.postStatus = "failed";
        })

        .addCase(deletePost.pending, (state) => {
            state.postStatus = "loading";
        })

        .addCase(deletePost.fulfilled, (state, action) => {
            // console.log("actionPayload",action.payload);
            // const { posts } = action.payload;
            const deletedPostId = action.payload.data.post_id;
            state.postList = state.postList.filter(post => post._id !== deletedPostId);
            // console.log(state.postList);
            // state.postList = posts;
            state.postStatus = "success";
        })

        .addCase(deletePost.rejected, (state) => {
            state.postStatus = "failed";
        })
        .addCase(editPost.pending, (state) => {
            state.postStatus = "loading";
        })
        
        .addCase(editPost.fulfilled, (state, action) => {
            // Extract the updated post from the action payload
            const updatedPost = action.payload.post;
        
            // Update the specific post in the postList without affecting the rest
            state.postList = state.postList.map(post =>
                post._id === updatedPost._id ? updatedPost : post
            );
        
            state.postStatus = "success";
        })
        
        .addCase(editPost.rejected, (state) => {
            state.postStatus = "failed";
        })
    }
});

export const postReducer = postSlice.reducer;
